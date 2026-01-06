import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerraceSlideshow from "./TerraceSlideshow";
import QuranSlideshow from "./QuranSlideshow";

interface SlideshowManagerProps {
  isActive: boolean;
}

const SlideshowManager = ({ isActive }: SlideshowManagerProps) => {
  const [currentSlideshow, setCurrentSlideshow] = useState(0);
  
  // Cycle through 3 phases:
  // 0 = Prayer Times (no overlay - 60 sec)
  // 1 = Terrace Portfolio (60 sec)
  // 2 = Quran/Surah (60 sec)
  
  useEffect(() => {
    if (!isActive) {
      setCurrentSlideshow(0);
      return;
    }

    const durations = [60000, 60000, 60000]; // 1 minute each
    
    const timer = setTimeout(() => {
      setCurrentSlideshow((prev) => (prev + 1) % 3);
    }, durations[currentSlideshow]);

    return () => clearTimeout(timer);
  }, [isActive, currentSlideshow]);

  if (!isActive) return null;
  
  // Phase 0 = show nothing (prayer times visible behind)
  if (currentSlideshow === 0) return null;

  return (
    <AnimatePresence mode="wait">
      {currentSlideshow === 1 && (
        <motion.div
          key="terrace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TerraceSlideshow />
        </motion.div>
      )}
      {currentSlideshow === 2 && (
        <motion.div
          key="quran"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <QuranSlideshow />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideshowManager;
