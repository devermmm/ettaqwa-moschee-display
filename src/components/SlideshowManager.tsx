import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdvertisementSlide from "./AdvertisementSlide";
import TerraceSlideshow from "./TerraceSlideshow";
import QuranSlideshow from "./QuranSlideshow";

interface SlideshowManagerProps {
  isActive: boolean;
}

const SlideshowManager = ({ isActive }: SlideshowManagerProps) => {
  const [currentSlideshow, setCurrentSlideshow] = useState(0);
  
  // Cycle through 3 slideshows
  // 0 = Advertisement (15 sec)
  // 1 = Terrace Portfolio (30 sec - 6 images × 5 sec)
  // 2 = Quran (45 sec)
  
  useEffect(() => {
    if (!isActive) {
      setCurrentSlideshow(0);
      return;
    }

    const durations = [15000, 30000, 45000]; // milliseconds for each slideshow
    
    const timer = setTimeout(() => {
      setCurrentSlideshow((prev) => (prev + 1) % 3);
    }, durations[currentSlideshow]);

    return () => clearTimeout(timer);
  }, [isActive, currentSlideshow]);

  if (!isActive) return null;

  return (
    <AnimatePresence mode="wait">
      {currentSlideshow === 0 && (
        <motion.div
          key="advertisement"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AdvertisementSlide />
        </motion.div>
      )}
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
