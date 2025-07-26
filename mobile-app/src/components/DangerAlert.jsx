
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, MapPin } from 'lucide-react';
import { useDangerAlert } from '@/contexts/DangerAlertContext';

const DangerAlert = () => {
  const { activeAlert, dismissAlert } = useDangerAlert();

  if (!activeAlert) return null;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'fire':
        return '🔥';
      case 'violence':
        return '⚠️';
      case 'medical':
        return '🚑';
      case 'evacuation':
        return '🚨';
      default:
        return '⚠️';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-500/20';
      case 'medium':
        return 'border-orange-500 bg-orange-500/20';
      case 'low':
        return 'border-yellow-500 bg-yellow-500/20';
      default:
        return 'border-red-500 bg-red-500/20';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-4 left-4 right-4 z-50"
      >
        <motion.div
          className={`glass-dark rounded-2xl p-4 border-2 ${getAlertColor(activeAlert.severity)} danger-alert`}
          animate={{ 
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 0 0 0 rgba(239, 68, 68, 0.7)',
              '0 0 0 10px rgba(239, 68, 68, 0)',
              '0 0 0 0 rgba(239, 68, 68, 0.7)'
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="text-2xl">
                {getAlertIcon(activeAlert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-white font-bold text-lg">
                    {activeAlert.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activeAlert.severity === 'high' ? 'bg-red-500 text-white' :
                    activeAlert.severity === 'medium' ? 'bg-orange-500 text-white' :
                    'bg-yellow-500 text-black'
                  }`}>
                    {activeAlert.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-white/90 text-sm mb-2">
                  {activeAlert.message}
                </p>
                <div className="flex items-center space-x-2 text-white/70 text-xs">
                  <MapPin size={12} />
                  <span>Nearby • {new Date(activeAlert.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <motion.button
              onClick={dismissAlert}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-white" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DangerAlert;
