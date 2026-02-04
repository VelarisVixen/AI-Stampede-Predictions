# 🚨 Drishti - AI-Powered Crowd Safety & Emergency Response System

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=flat&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=flat&logo=twilio&logoColor=white)](https://www.twilio.com/)

> A comprehensive emergency management ecosystem that combines AI-powered crowd monitoring, real-time SOS alerts, and multi-channel emergency notifications to prevent stampedes and manage crowd-related emergencies.

![SafeGuard System Architecture](https://via.placeholder.com/800x400/1e1e2e/00d4aa?text=SafeGuard+System+Architecture)

## 🎯 **Project Overview**

SafeGuard is a multi-component emergency management system designed to prevent and respond to crowd-related emergencies, particularly stampedes. The system combines consumer mobile applications, AI-powered monitoring, and professional emergency response tools.

### **🔧 System Components**

```
📱 Mobile App (SafeGuard)     →  Consumer safety application
🖥️  Admin Panel (StampedeGuard) →  Professional monitoring dashboard  
🤖 AI Detection Engine       →  Real-time crowd analysis
📡 Alert Distribution System →  Multi-channel emergency notifications
☁️  Cloud Infrastructure     →  Firebase + Twilio integration
```

---

## 🏗️ **Architecture Overview**

### **📱 Mobile Application (`mobile-app/`)**
**Consumer-facing React mobile app for personal safety**

- **Framework**: React 18.2 + Vite 4.4.5
- **Styling**: Tailwind CSS 3.3.3 + Custom animations
- **State Management**: React Context API
- **Backend**: Firebase Firestore + Storage
- **Key Features**:
  - 🚨 One-touch SOS panic button with video recording
  - 📍 Real-time GPS location tracking
  - 🔔 Push notifications for nearby emergencies
  - 🎥 Emergency video recording (15s automatic)
  - 📞 Emergency contact integration
  - 🗂️ SOS history and alert feed

### **🖥️ Admin Panel (`admin-panel/`)**
**Professional emergency management dashboard**

#### **Frontend (`stampede-frontend/`)**
- **Framework**: React 19.1 + Create React App
- **AI Engine**: TensorFlow.js 4.22 + COCO-SSD model
- **UI Framework**: Flowbite React + Tailwind CSS
- **Video Processing**: React Webcam integration
- **Key Features**:
  - 🤖 AI-powered crowd detection via webcam
  - 📊 Real-time crowd density analysis
  - 🎯 Automatic stampede risk alerts
  - 📋 SOS report review and approval system
  - 📹 Emergency video analysis
  - 🌍 Geographic alert distribution

#### **Backend (`stampede-backend/`)**
- **Runtime**: Node.js + Express 5.1
- **Messaging**: Twilio WhatsApp API integration
- **Database**: MongoDB with Mongoose ODM
- **Key Features**:
  - 📱 WhatsApp emergency notifications
  - 🔄 REST API for alert processing
  - 🗄️ Database management for SOS reports
  - 📡 Real-time communication with frontend

---

## 🚀 **Key Features**

### **🔒 Consumer Safety Features**
- **Emergency SOS Button**: One-touch emergency activation with automatic video recording
- **Smart Location Tracking**: High-accuracy GPS with address resolution
- **Real-time Alerts**: Receive notifications for emergencies within 1km radius
- **Emergency Contacts**: Quick access to police, ambulance, and fire services
- **Offline Capability**: Core features work without internet connection
- **Privacy Protection**: Data encrypted and location access controlled

### **🤖 AI-Powered Monitoring**
- **Crowd Detection**: Real-time person counting using TensorFlow.js COCO-SSD
- **Density Analysis**: Automatic crowd density thresholds and risk assessment
- **Stampede Prevention**: Proactive alerts when dangerous crowd levels detected
- **Video Analysis**: AI-powered analysis of emergency video footage
- **Predictive Alerts**: Early warning system for crowd-related risks

### **📡 Emergency Response System**
- **Multi-channel Alerts**: WhatsApp, Push notifications, SMS distribution
- **Geographic Targeting**: Location-based alert distribution (1km radius)
- **Admin Approval Workflow**: Professional review of emergency reports
- **Emergency Service Integration**: Direct routing to police, ambulance, fire brigade
- **Real-time Communication**: Live chat and status updates during emergencies

---

## 🛠️ **Technology Stack**

### **📱 Mobile App Dependencies**
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.16.0",
  "firebase": "^10.12.2",
  "framer-motion": "^10.16.4",
  "tailwindcss": "^3.3.3",
  "@radix-ui/react-*": "Various UI components",
  "lucide-react": "^0.285.0"
}
```

### **🖥️ Admin Panel Dependencies**
```json
{
  "react": "^19.1.0",
  "@tensorflow/tfjs": "^4.22.0",
  "@tensorflow-models/coco-ssd": "^2.2.3",
  "react-webcam": "^7.2.0",
  "flowbite-react": "^0.11.9",
  "firebase": "^12.0.0",
  "lucide-react": "^0.525.0"
}
```

### **⚡ Backend Dependencies**
```json
{
  "express": "^5.1.0",
  "twilio": "^5.7.3",
  "mongoose": "Latest",
  "cors": "^2.8.5",
  "dotenv": "^17.2.0"
}
```

---

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ and npm
- Firebase project with Firestore + Storage enabled
- Twilio account for WhatsApp messaging
- MongoDB database (Atlas recommended)

### **🔧 Quick Start**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/safeguard-crowd-safety.git
   cd safeguard-crowd-safety
   ```

2. **Setup Mobile App**
   ```bash
   cd mobile-app
   npm install
   # Configure Firebase in src/lib/firebase.js
   npm run dev
   ```

3. **Setup Admin Panel Frontend**
   ```bash
   cd admin-panel/stampede-frontend
   npm install
   # Configure Firebase in src/firebase/config.js
   npm start
   ```

4. **Setup Backend**
   ```bash
   cd admin-panel/stampede-backend
   npm install
   # Configure environment variables
   node index.js
   ```

### **🔑 Environment Configuration**

Create `.env` files in respective directories:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/safeguard
```



## 🗄️ **Database Schema**

### **SOS Reports Collection**
```javascript
{
  userId: ObjectId,
  userInfo: { name, phone, email },
  incident: {
    videoUrl: String,
    videoDuration: Number,
    message: String,
    location: { coordinates: [lng, lat], address },
    timestamp: Date,
    deviceInfo: { platform, version, model }
  },
  status: "pending" | "approved" | "rejected",
  adminReview: { reviewedBy, decision, adminNotes },
  metadata: { priority: "high"|"medium"|"low", category }
}
```

### **Users Collection**
```javascript
{
  name: String,
  email: String,
  phone: String,
  location: { coordinates: [lng, lat], lastUpdated },
  fcmToken: String,
  preferences: { enableSOSAlerts, alertRadius, enableWhatsApp },
  isActive: Boolean
}
```

---

## 📱 **API Endpoints**

### **Mobile App APIs**
```
POST /api/sos/report          # Submit SOS report
GET  /api/alerts/nearby       # Get nearby active alerts
POST /api/user/location       # Update user location
GET  /api/user/preferences    # Get user preferences
```

### **Admin Panel APIs**
```
GET  /api/admin/sos-reports   # Get pending SOS reports
POST /api/admin/review/:id    # Approve/reject SOS report
POST /api/admin/alert/send    # Send manual alert
GET  /api/admin/stats         # Get system statistics
```

---

## 🎮 **Usage Examples**

### **Emergency Scenario Workflow**

1. **User Emergency**: User presses SOS button → 15s video recorded → GPS location captured
2. **Admin Review**: Admin receives notification → Reviews video and location → Approves/rejects
3. **Alert Distribution**: System finds users within 1km → Sends WhatsApp + Push notifications
4. **Emergency Response**: Emergency services receive optimized routes → First responders dispatched

### **AI Crowd Monitoring**

1. **Setup Camera**: Admin enables webcam monitoring → AI model loads → Person detection starts
2. **Crowd Analysis**: System counts people in frame → Calculates density → Monitors thresholds
3. **Risk Detection**: High density detected → Automatic alert triggered → Notifications sent
4. **Intervention**: Crowd control teams notified → Safety measures implemented

---

## 🔧 **Development**

### **Project Structure**
```
📁 safeguard-crowd-safety/
├── 📱 mobile-app/                 # Consumer React app
│   ├── src/components/           # UI components
│   ├── src/contexts/            # State management
│   ├── src/pages/               # App screens
│   └── src/lib/                 # Utilities & Firebase
├── 🖥️ admin-panel/
│   ├── stampede-frontend/       # Admin React dashboard
│   ├── stampede-backend/        # Express.js API server
│   ├── database-schemas.js      # MongoDB schemas
│   └── FREE-AZURE-SETUP-GUIDE.md
└── 📄 README.md
```

### **Development Commands**
```bash
# Start mobile app development server
cd mobile-app && npm run dev

# Start admin frontend
cd admin-panel/stampede-frontend && npm start

# Start backend server
cd admin-panel/stampede-backend && npm start

# Build for production
npm run build
```

---

## 🚀 **Deployment**

### **Firebase Hosting (Recommended)**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Deploy mobile app
cd mobile-app
npm run build
firebase deploy --only hosting

# Deploy admin panel
cd admin-panel/stampede-frontend
npm run build
firebase deploy --only hosting:admin
```

### **Backend Deployment Options**
- **Heroku**: Simple Git-based deployment
- **Railway**: Modern platform with Git integration
- **DigitalOcean**: VPS with Docker support
- **Firebase Functions**: Serverless deployment

---

## 🔐 **Security Features**

- **🔒 End-to-End Encryption**: All communications encrypted in transit
- **🛡️ Data Privacy**: Location data encrypted and access controlled
- **👤 User Authentication**: Secure Firebase Authentication
- **🔑 Admin Access Control**: Role-based permissions system
- **📝 Audit Logging**: Complete audit trail for all admin actions
- **⚡ Rate Limiting**: API rate limiting to prevent abuse

---

## 📊 **System Monitoring**

### **Real-time Metrics**
- Active users count and locations
- SOS reports pending review
- Alert distribution success rates
- AI model performance statistics
- System uptime and health checks

### **Emergency Analytics**
- Response time metrics
- Geographic emergency patterns
- Crowd density trend analysis
- User engagement statistics

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Setup**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 **Support & Contact**

- **📧 Email**: support@safeguard-app.com
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/yourusername/safeguard-crowd-safety/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/yourusername/safeguard-crowd-safety/discussions)
- **📱 WhatsApp**: +1-XXX-XXX-XXXX (Emergency support)

---

## 🙏 **Acknowledgments**

- **TensorFlow.js** team for amazing browser-based AI capabilities
- **Firebase** for robust real-time infrastructure
- **Twilio** for reliable WhatsApp messaging API
- **React** community for excellent frontend ecosystem
- **Open Source Contributors** who make projects like this possible

---

## 📈 **Roadmap**

### **Phase 1: Core Features** ✅
- [x] Mobile SOS application
- [x] Admin monitoring dashboard
- [x] AI crowd detection
- [x] WhatsApp alerts

### **Phase 2: Enhanced Features** 🚧
- [ ] Machine learning crowd prediction
- [ ] Integration with city surveillance systems
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

### **Phase 3: Enterprise Features** 📋
- [ ] API for third-party integrations
- [ ] White-label solutions
- [ ] Enterprise SSO integration
- [ ] Advanced reporting and compliance

---

<div align="center">

**🚨 Built for saving lives and preventing emergencies 🚨**

Made with ❤️ by the SafeGuard Team

[![GitHub stars](https://img.shields.io/github/stars/yourusername/safeguard-crowd-safety.svg?style=social&label=Star)](https://github.com/yourusername/safeguard-crowd-safety)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/safeguard-crowd-safety.svg?style=social&label=Fork)](https://github.com/yourusername/safeguard-crowd-safety/fork)

</div>
