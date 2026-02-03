import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const { language, setLanguage } = useLanguage();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if language was already selected
    const savedLanguage = localStorage.getItem("language");
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    
    if (savedLanguage && hasSeenSplash) {
      // Skip splash if already configured
      setTimeout(() => onComplete(), 300);
    }
  }, [onComplete]);

  const selectLanguage = (lang: "de" | "bs") => {
    setLanguage(lang);
    localStorage.setItem("hasSeenSplash", "true");
    setIsExiting(true);
    setTimeout(() => onComplete(), 500);
  };

  // If already configured, show brief loading
  const hasSeenSplash = localStorage.getItem("hasSeenSplash");
  if (hasSeenSplash) {
    return (
      <motion.div 
        className="fixed inset-0 bg-gradient-to-b from-primary via-primary to-accent flex flex-col items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <img src={logo} alt="Et-Taqwa" className="w-24 h-24 rounded-2xl" />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-primary via-primary to-accent flex flex-col items-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="splash-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="20" fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="30" cy="30" r="10" fill="none" stroke="white" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#splash-pattern)"/>
        </svg>
      </div>

      {/* Safe area top */}
      <div className="safe-area-inset-top" />

      {/* Content centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 w-full max-w-sm">
        {/* Logo */}
        <motion.img 
          src={logo} 
          alt="Et-Taqwa" 
          className="w-28 h-28 rounded-[1.75rem] shadow-2xl shadow-black/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-5 text-center"
        >
          <h1 className="text-4xl font-bold text-white tracking-tight">ET-TAQWA</h1>
          <p className="text-white/50 text-sm mt-1.5 font-arabic">مسجد التقوى</p>
        </motion.div>

        {/* Language Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-14 w-full"
        >
          <p className="text-white/60 text-center text-sm mb-6">
            Wählen Sie Ihre Sprache / Izaberite jezik
          </p>

          <div className="space-y-3">
            <button
              onClick={() => selectLanguage("de")}
              className="w-full py-4 px-5 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center gap-4 active:scale-[0.98] active:bg-white/25 transition-all"
            >
              <span className="text-3xl">🇩🇪</span>
              <span className="text-white font-semibold text-lg">Deutsch</span>
            </button>

            <button
              onClick={() => selectLanguage("bs")}
              className="w-full py-4 px-5 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center gap-4 active:scale-[0.98] active:bg-white/25 transition-all"
            >
              <span className="text-3xl">🇧🇦</span>
              <span className="text-white font-semibold text-lg">Bosanski</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pb-10 safe-area-inset-bottom"
      >
        <p className="text-white/30 text-xs text-center">Wien, Österreich</p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
