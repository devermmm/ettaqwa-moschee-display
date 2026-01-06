import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import terrace1 from "@/assets/terrace-1.jpg";
import terrace2 from "@/assets/terrace-2.jpg";
import terrace3 from "@/assets/terrace-3.jpg";
import terrace4 from "@/assets/terrace-4.jpg";
import terrace5 from "@/assets/terrace-5.jpg";
import terrace6 from "@/assets/terrace-6.jpg";

const terraceImages = [terrace1, terrace2, terrace3, terrace4, terrace5, terrace6];

const TerraceSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGerman, setShowGerman] = useState(true);

  // Cycle images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % terraceImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Toggle language every 30 seconds (German -> Bosnian -> German...)
  useEffect(() => {
    const interval = setInterval(() => {
      setShowGerman((prev) => !prev);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const title = showGerman ? "BALD NEUE TERRASSE" : "USKORO NOVA TERASA";
  const subtitle = showGerman 
    ? "Wir verschönern unseren Raum für die Gemeinschaft"
    : "Uljepšavamo naš prostor za zajednicu";
  const badge = showGerman ? "Demnächst" : "Uskoro";

  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 flex items-center justify-center overflow-hidden">
      {/* Background Image with Ken Burns effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={terraceImages[currentImageIndex]}
            alt="Neue Terrasse"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/50 to-emerald-950/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-8">
        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-block mb-6"
        >
          <span className="px-6 py-2 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-sm font-semibold uppercase tracking-widest">
            {badge}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-wide"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl md:text-2xl text-emerald-200 mb-8"
        >
          {subtitle}
        </motion.p>

        {/* Image indicator dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-3 mt-8"
        >
          {terraceImages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? "bg-white scale-125" 
                  : "bg-white/30"
              }`}
            />
          ))}
        </motion.div>

        {/* Dzamija name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12"
        >
          <p className="text-emerald-300/80 text-lg font-semibold">
            DŽEMAT ET-TAQWA
          </p>
          <p className="text-emerald-300/60 text-sm font-arabic">
            مسجد التقوى
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TerraceSlideshow;
