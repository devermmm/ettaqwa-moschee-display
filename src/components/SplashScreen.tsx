import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const { language, setLanguage } = useLanguage();
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if language was already selected
    const savedLanguage = localStorage.getItem("language");
    const hasSeenSplash = localStorage.getItem("hasSeenSplash");
    
    if (savedLanguage && hasSeenSplash) {
      // Skip splash if already configured
      setTimeout(() => onComplete(), 500);
    } else {
      // Show logo animation then language select
      const timer = setTimeout(() => {
        setShowLanguageSelect(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  const selectLanguage = (lang: "de" | "bs") => {
    setLanguage(lang);
    localStorage.setItem("hasSeenSplash", "true");
    setIsExiting(true);
    setTimeout(() => onComplete(), 600);
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-primary via-primary to-accent flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5 }}
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

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10"
      >
        <motion.img 
          src={logo} 
          alt="Et-Taqwa" 
          className="w-32 h-32 rounded-[2rem] shadow-2xl shadow-black/30"
          animate={{ 
            boxShadow: showLanguageSelect 
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.4)" 
              : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Et-Taqwa</h1>
        <p className="text-white/60 text-sm mt-1 font-arabic">مسجد التقوى</p>
      </motion.div>

      {/* Language Selection */}
      <AnimatePresence>
        {showLanguageSelect && !isExiting && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mt-12 w-full max-w-xs px-6"
          >
            <p className="text-white/70 text-center text-sm mb-4">
              Wählen Sie Ihre Sprache
            </p>
            <p className="text-white/50 text-center text-xs mb-6">
              Izaberite svoj jezik
            </p>

            <div className="space-y-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => selectLanguage("de")}
                className="w-full py-4 px-6 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-between group hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🇩🇪</span>
                  <span className="text-white font-semibold text-lg">Deutsch</span>
                </div>
                <motion.div 
                  className="w-6 h-6 rounded-full border-2 border-white/40 flex items-center justify-center"
                  whileHover={{ borderColor: "rgba(255,255,255,0.8)" }}
                >
                  {language === "de" && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                  )}
                </motion.div>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => selectLanguage("bs")}
                className="w-full py-4 px-6 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-between group hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🇧🇦</span>
                  <span className="text-white font-semibold text-lg">Bosanski</span>
                </div>
                <motion.div 
                  className="w-6 h-6 rounded-full border-2 border-white/40 flex items-center justify-center"
                  whileHover={{ borderColor: "rgba(255,255,255,0.8)" }}
                >
                  {language === "bs" && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator before language select */}
      {!showLanguageSelect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white/40 rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SplashScreen;
