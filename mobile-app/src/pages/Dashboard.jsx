import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  MapPin,
  Clock,
  User,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Bell,
  Settings,
  Eye,
  Navigation,
  Calendar,
  Zap,
  Activity
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from '@/contexts/LocationContext';
import { usePanic } from '@/contexts/PanicContext';
import { useDangerAlert } from '@/contexts/DangerAlertContext';
import PanicButton from '@/components/PanicButton';
import DangerAlert from '@/components/DangerAlert';

const Dashboard = () => {
  const { userProfile, logout } = useAuth();
  const { location, getCurrentLocation, isLoading: locationLoading } = useLocation();
  const { isActivated: panicActivated, panicHistory, isProcessing: panicProcessing } = usePanic();
  const { activeAlert } = useDangerAlert();
  const [lastChecked, setLastChecked] = useState(new Date());
  const [safetyStatus, setSafetyStatus] = useState('safe');

  useEffect(() => {
    // Update last checked time every minute
    const interval = setInterval(() => {
      setLastChecked(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatLastChecked = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60); // minutes
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  const handleLogout = async () => {
    await logout();
  };

  const getSafetyStatusConfig = () => {
    switch (safetyStatus) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          text: 'All Clear',
          description: 'Your safety status is secure'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          text: 'Caution',
          description: 'Stay alert in your area'
        };
      case 'danger':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          text: 'High Alert',
          description: 'Emergency situation detected'
        };
      default:
        return {
          icon: Shield,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          text: 'Unknown',
          description: 'Status checking...'
        };
    }
  };

  const statusConfig = getSafetyStatusConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-amber-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg border-b border-yellow-200/50 px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">SafeGuard</h1>
                <p className="text-sm text-gray-600">Welcome back, {userProfile?.name}</p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="px-6 py-8 space-y-8">
          {/* Safety Status Card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2 rounded-3xl p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Safety Status</h2>
              <statusConfig.icon className={`w-8 h-8 ${statusConfig.color}`} />
            </div>
            
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${statusConfig.color}`}>
                {statusConfig.text}
              </div>
              <p className="text-gray-600">{statusConfig.description}</p>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>Real-time monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>AI Protected</span>
              </div>
            </div>
          </motion.section>

          {/* SOS Emergency Status */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-yellow-200/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Emergency System</h2>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600" />
                <div className={`w-3 h-3 rounded-full ${panicActivated ? 'bg-red-400 animate-pulse' : 'bg-green-400'}`}></div>
              </div>
            </div>

            <div className="space-y-4">
              {/* SOS Status */}
              <div className={`p-4 rounded-2xl border-2 ${
                panicActivated
                  ? 'bg-red-50 border-red-200'
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-semibold ${panicActivated ? 'text-red-700' : 'text-green-700'}`}>
                      {panicActivated ? '🚨 SOS ACTIVE' : '✅ READY FOR EMERGENCY'}
                    </div>
                    <div className={`text-sm ${panicActivated ? 'text-red-600' : 'text-green-600'}`}>
                      {panicActivated
                        ? 'Emergency services have been notified'
                        : 'Emergency system is operational'
                      }
                    </div>
                  </div>
                  {panicProcessing && (
                    <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              </div>

              {/* Demo Mode Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Demo Mode Active</span>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  SOS features are simulated. In production, emergency services would be contacted immediately.
                </p>
              </div>

              {/* Recent SOS History */}
              {panicHistory && panicHistory.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Recent SOS Activity</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {panicHistory.slice(0, 3).map((alert, index) => (
                      <div key={alert.id} className="bg-gray-50 rounded-lg p-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            alert.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {alert.status}
                          </span>
                        </div>
                        {alert.message && (
                          <p className="text-gray-700 mt-1">{alert.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          {/* Location Card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-yellow-200/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Current Location</h2>
              <MapPin className="w-6 h-6 text-yellow-600" />
            </div>
            
            {locationLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">Getting your location...</span>
              </div>
            ) : location ? (
              <div className="space-y-3">
                <div className="text-gray-800">
                  <div className="font-medium">Coordinates</div>
                  <div className="text-sm text-gray-600 font-mono">
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Navigation className="w-4 h-4" />
                  <span>Accuracy: ±{Math.round(location.accuracy)}m</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600">Location not available</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={getCurrentLocation}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Get Location
                </motion.button>
              </div>
            )}
          </motion.section>

          {/* Last Checked Card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-yellow-200/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Last Checked</h2>
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-800">
                {formatLastChecked(lastChecked)}
              </div>
              <div className="text-sm text-gray-600">
                Last update: {lastChecked.toLocaleTimeString()}
              </div>
            </div>
          </motion.section>

          {/* Feature Placeholders Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Emergency Contacts */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-yellow-200/50 cursor-pointer"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="font-medium text-gray-800">Emergency</div>
                  <div className="text-xs text-gray-600">Quick dial contacts</div>
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-yellow-200/50 cursor-pointer"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="font-medium text-gray-800">Alerts</div>
                  <div className="text-xs text-gray-600">Safety notifications</div>
                </div>
              </motion.div>

              {/* Profile Settings */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-yellow-200/50 cursor-pointer"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="font-medium text-gray-800">Profile</div>
                  <div className="text-xs text-gray-600">Personal settings</div>
                </div>
              </motion.div>

              {/* App Settings */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-yellow-200/50 cursor-pointer"
              >
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="font-medium text-gray-800">Settings</div>
                  <div className="text-xs text-gray-600">App preferences</div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* User Info Card */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-yellow-400/10 to-amber-400/10 backdrop-blur-sm rounded-3xl p-6 border border-yellow-300/50"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="font-medium text-gray-800">{userProfile?.name}</div>
                  <div className="text-sm text-gray-600">Full Name</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="font-medium text-gray-800">{userProfile?.phone}</div>
                  <div className="text-sm text-gray-600">Phone Number</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="font-medium text-gray-800">
                    {new Date(userProfile?.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">Member Since</div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
