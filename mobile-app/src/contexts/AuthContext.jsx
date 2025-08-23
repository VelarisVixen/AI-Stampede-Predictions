import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { toast } from '@/components/ui/use-toast';
import { auth, db, createOrUpdateUser, getUser, COLLECTIONS } from '@/lib/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Set up Firebase auth listener for real-time authentication
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user profile from Firestore
          const userProfile = await getUser(firebaseUser.uid);
          if (userProfile) {
            setUser(firebaseUser);
            setUserProfile(userProfile);
            setIsAuthenticated(true);
            console.log('✅ User authenticated and profile loaded from Firestore');
          } else {
            // User exists in Auth but no profile in Firestore
            console.log('User authenticated but no profile found');
            setUser(firebaseUser);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        // Check for legacy localStorage session (migration)
        const savedUser = localStorage.getItem('safeguard_user_session');
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            // Migrate to Firebase Auth
            await login(parsedUser);
            localStorage.removeItem('safeguard_user_session'); // Clean up
          } catch (error) {
            console.error('Error migrating user:', error);
            localStorage.removeItem('safeguard_user_session');
          }
        }
        setUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (userData) => {
    setLoading(true);
    try {
      // Validate required fields
      if (!userData.name || !userData.email || !userData.phone) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate phone format
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(userData.phone.replace(/[\s\-\(\)]/g, ''))) {
        throw new Error('Please enter a valid phone number');
      }

      const processedUserData = {
        id: `user_${Date.now()}`,
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        phone: userData.phone.trim(),
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        safetyStatus: 'safe',
        locationPermission: 'pending'
      };

      // Authenticate with Firebase and save to Firestore
      const firebaseUser = await signInAnonymously(auth);
      const userId = firebaseUser.user.uid;

      const finalUserData = {
        ...processedUserData,
        id: userId,
        firebaseUid: userId
      };

      // Save user profile to Firestore
      await createOrUpdateUser(userId, finalUserData);
      
      setUser(firebaseUser.user);
      setUserProfile(finalUserData);
      setIsAuthenticated(true);

      toast({
        title: "Welcome to SafeGuard! 👋",
        description: `Hello ${finalUserData.name}! Your account is now connected to Firebase.`,
        duration: 4000
      });

      console.log('✅ User successfully created in Firebase Auth and Firestore');
      return finalUserData;
    } catch (error) {
      console.error('❌ Login error:', error);

      let errorMessage = error.message || "Please check your information and try again.";

      if (error.code === 'permission-denied') {
        errorMessage = "Firebase permissions need to be configured. Using local storage as fallback.";
        console.warn('⚠️ Firebase permission denied - check FIREBASE_SETUP.md for instructions');

        // Try to save user locally as fallback
        try {
          const fallbackUserData = {
            id: `user_${Date.now()}`,
            name: userData.name.trim(),
            email: userData.email.toLowerCase().trim(),
            phone: userData.phone.trim(),
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            safetyStatus: 'safe',
            locationPermission: 'pending'
          };

          localStorage.setItem('safeguard_user_session', JSON.stringify(fallbackUserData));
          setUser({ uid: fallbackUserData.id }); // Mock Firebase user
          setUserProfile(fallbackUserData);
          setIsAuthenticated(true);

          toast({
            title: "Welcome to SafeGuard! 👋",
            description: `Hello ${fallbackUserData.name}! Running in local mode - check console for Firebase setup instructions.`,
            duration: 6000
          });

          return fallbackUserData;
        } catch (localError) {
          console.error('❌ Local storage fallback failed:', localError);
        }
      }

      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
        duration: 5000
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Sign out from Firebase
      await auth.signOut();

      // Clear state (will be handled by auth listener)
      setUser(null);
      setUserProfile(null);
      setIsAuthenticated(false);

      // Clean up any remaining localStorage
      localStorage.removeItem('safeguard_user_session');

      toast({
        title: "Goodbye! 👋",
        description: "You have been safely logged out from Firebase.",
        duration: 3000
      });

      console.log('✅ User successfully logged out from Firebase');
    } catch (error) {
      console.error('❌ Logout error:', error);
      toast({
        title: "Logout Error",
        description: "There was an issue logging out. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  const updateUserProfile = async (updates) => {
    if (!user || !userProfile) return;

    try {
      const updatedProfile = {
        ...userProfile,
        ...updates,
        lastUpdated: new Date().toISOString()
      };

      // Update in Firestore
      await createOrUpdateUser(user.uid, updatedProfile);

      // Update local state
      setUserProfile(updatedProfile);

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        duration: 3000
      });

      console.log('✅ User profile updated in Firestore');
      return updatedProfile;
    } catch (error) {
      console.error('❌ Profile update error:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
        duration: 3000
      });
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUserProfile,
    firebaseUser: user,
    auth,
    db
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
