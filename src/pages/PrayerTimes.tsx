import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Sunrise, Sun, Sunset, Moon, Maximize2, Minimize2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  icon: typeof Clock;
}

const PrayerTimes = () => {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isInFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isInFullscreen);
      
      // Hide navbar in fullscreen mode
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = isInFullscreen ? 'none' : '';
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      // Restore navbar on unmount
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = '';
      }
    };
  }, []);

  const isFriday = () => currentTime.getDay() === 5;

  const basePrayerTimes: PrayerTime[] = [
    { name: t("prayerTimes.fajr"), arabicName: "الفجر", time: "05:08", icon: Sunrise },
    { name: t("prayerTimes.dhuhr"), arabicName: "الظهر", time: "11:44", icon: Sun },
    { name: t("prayerTimes.asr"), arabicName: "العصر", time: "14:02", icon: Sun },
    { name: t("prayerTimes.maghrib"), arabicName: "المغرب", time: "16:28", icon: Sunset },
    { name: t("prayerTimes.isha"), arabicName: "العشاء", time: "17:57", icon: Moon },
  ];

  const prayerTimes: PrayerTime[] = isFriday()
    ? basePrayerTimes.map(prayer =>
        prayer.arabicName === "الظهر"
          ? { ...prayer, name: t("prayerTimes.jummah"), arabicName: "الجمعة", time: "11:44" }
          : prayer
      )
    : basePrayerTimes;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = currentTime;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let foundNext = 0;
    for (let i = 0; i < prayerTimes.length; i++) {
      const [hours, minutes] = prayerTimes[i].time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (currentMinutes < prayerMinutes) {
        foundNext = i;
        break;
      }
    }

    setNextPrayerIndex(foundNext);
  }, [currentTime, prayerTimes]);

  const getTimeUntilPrayer = (prayerTime: string) => {
    const [hours, minutes] = prayerTime.split(":").map(Number);
    const now = currentTime;
    const prayer = new Date(now);
    prayer.setHours(hours, minutes, 0, 0);

    if (prayer < now) {
      prayer.setDate(prayer.getDate() + 1);
    }

    const diff = prayer.getTime() - now.getTime();
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hoursLeft}h ${minutesLeft}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      {/* Fullscreen Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFullscreen}
        className="fixed bottom-6 right-6 z-50 px-6 py-4 bg-white/90 hover:bg-white backdrop-blur-md rounded-2xl border-2 border-emerald-600/50 transition-all duration-300 shadow-2xl flex items-center gap-3 group"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <>
            <Minimize2 className="w-7 h-7 text-emerald-800" />
            <span className="text-emerald-900 font-semibold text-lg hidden sm:inline">
              {t("prayerTimes.exitFullscreen")}
            </span>
          </>
        ) : (
          <>
            <Maximize2 className="w-7 h-7 text-emerald-800" />
            <span className="text-emerald-900 font-semibold text-lg hidden sm:inline">
              {t("prayerTimes.fullscreen")}
            </span>
          </>
        )}
      </motion.button>

      {/* Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${10 + i * 12}%`,
              top: `${5 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8 lg:mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-2 md:mb-3 lg:mb-4 drop-shadow-2xl tracking-wide">
            ET TAQWA
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/90 mb-1 md:mb-2 font-arabic">{t("prayerTimes.mosque")}</p>
          <p className="text-base md:text-xl lg:text-2xl text-white/80">{t("prayerTimes.location")}</p>
        </motion.div>

        {/* Current Time */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6 md:mb-8 lg:mb-12"
        >
          <div className="inline-block bg-white/15 backdrop-blur-lg rounded-2xl md:rounded-3xl px-6 md:px-12 lg:px-16 py-4 md:py-6 lg:py-8 border-2 border-white/30 shadow-2xl">
            <p className="text-white/80 text-xs md:text-sm lg:text-lg mb-1 md:mb-2 uppercase tracking-wider">{t("prayerTimes.today")}</p>
            <p className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tabular-nums">
              {currentTime.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
            <p className="text-white/70 text-xs md:text-base lg:text-xl mt-1 md:mt-2 lg:mt-3">
              {currentTime.toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </motion.div>

        {/* All Prayer Times Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto mb-6 md:mb-8 lg:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-4 md:mb-6 lg:mb-8 uppercase tracking-wider">
            {t("nav.prayerTimes")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
            {prayerTimes.map((prayer, index) => {
              const Icon = prayer.icon;
              const isNext = index === nextPrayerIndex;

              return (
                <motion.div
                  key={prayer.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative overflow-hidden rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 transition-all duration-500 flex flex-col items-center justify-center ${
                    isNext
                      ? "bg-white/30 border-2 md:border-3 lg:border-4 border-white/60 shadow-2xl scale-105"
                      : "bg-white/15 border border-white/30"
                  } backdrop-blur-lg`}
                >
                  {isNext && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute top-2 md:top-3 lg:top-4 left-1/2 -translate-x-1/2"
                    >
                      <span className="inline-block px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 bg-white/40 rounded-full text-[10px] md:text-xs lg:text-sm text-white font-bold uppercase tracking-wider shadow-lg">
                        {t("prayerTimes.nextPrayer")}
                      </span>
                    </motion.div>
                  )}
                  
                  <div className="flex flex-col items-center text-center space-y-2 md:space-y-3 lg:space-y-4 mt-6 md:mt-8">
                    <div className="p-2 md:p-3 lg:p-5 bg-white/25 rounded-lg md:rounded-xl lg:rounded-2xl shadow-lg">
                      <Icon className="w-5 h-5 md:w-8 md:h-8 lg:w-12 lg:h-12 text-white" />
                    </div>
                    
                    <div className="space-y-1 md:space-y-2">
                      <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white">
                        {prayer.name}
                      </h3>
                      <p className="text-sm md:text-xl lg:text-2xl text-white/90 font-arabic">
                        {prayer.arabicName}
                      </p>
                    </div>
                    
                    <div className="pt-2 md:pt-3 lg:pt-4">
                      <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums">
                        {prayer.time}
                      </p>
                    </div>

                    {isNext && (
                      <div className="pt-1 md:pt-2">
                        <p className="text-xs md:text-base lg:text-lg text-white/80">in</p>
                        <p className="text-base md:text-xl lg:text-2xl font-bold text-white">
                          {getTimeUntilPrayer(prayer.time)}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Basmala */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-block bg-white/15 backdrop-blur-lg rounded-xl md:rounded-2xl px-6 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 border-2 border-white/30">
            <p className="text-xl md:text-3xl lg:text-4xl text-white font-arabic mb-2 md:mb-3">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <p className="text-xs md:text-base lg:text-lg text-white/80">
              Im Namen Allahs, des Allerbarmers, des Barmherzigen
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrayerTimes;
