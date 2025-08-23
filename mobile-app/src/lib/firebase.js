import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from '@/components/ui/use-toast';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const recordStream = (stream, duration) => {
  return new Promise((resolve, reject) => {
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
    let timeout;

    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      clearTimeout(timeout);
      const blob = new Blob(chunks, { type: 'video/mp4' });
      resolve(blob);
    };
    mediaRecorder.onerror = (e) => {
      clearTimeout(timeout);
      reject(e);
    };

    mediaRecorder.start();
    timeout = setTimeout(() => {
      if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    }, duration);
  });
};

export const uploadVideoAndGetURL = async (stream, userId) => {
  if (!stream) {
    throw new Error("No video stream provided.");
  }
  
  if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.log("🔥 Firebase running in demo mode - video upload simulated");
    toast({
        title: "Demo Mode",
        description: "Video upload simulated successfully. In production, configure Firebase for real uploads.",
        duration: 5000
    });

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return mock data and continue flow
    return {
        videoUrl: `https://demo-storage.safeguard.app/sos-videos/demo_${userId}_${Date.now()}.mp4`,
        videoThumbnail: `https://demo-storage.safeguard.app/thumbnails/demo_${userId}_${Date.now()}.jpg`,
        videoDuration: 15,
    };
  }

  const videoDurationMs = 15000;
  const videoBlob = await recordStream(stream, videoDurationMs);
  
  const videoFileName = `sos-videos/sos_${userId}_${Date.now()}.mp4`;
  const videoRef = ref(storage, videoFileName);

  try {
    const snapshot = await uploadBytes(videoRef, videoBlob);
    const videoUrl = await getDownloadURL(snapshot.ref);

    // Thumbnail generation is complex on the client-side.
    // For now, we'll return a placeholder or null.
    // A robust solution would involve a backend function (e.g., Firebase Cloud Function)
    // to generate a thumbnail after the video is uploaded.
    
    return {
      videoUrl,
      videoThumbnail: null, 
      videoDuration: Math.round(videoDurationMs / 1000),
    };
  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Failed to upload emergency video.");
  }
};
