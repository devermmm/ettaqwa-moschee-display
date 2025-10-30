import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Sunrise, Sun, Sunset, Moon, Maximize2, Minimize2 } from "lucide-react";

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  icon: typeof Clock;
}

const PrayerTimes = () => {
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
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const isFriday = () => currentTime.getDay() === 5;

  const basePrayerTimes: PrayerTime[] = [
    { name: "Fajr", arabicName: "الفجر", time: "05:09", icon: Sunrise },
    { name: "Dhuhr", arabicName: "الظهر", time: "11:43", icon: Sun },
    { name: "Asr", arabicName: "العصر", time: "14:17", icon: Sun },
    { name: "Maghrib", arabicName: "المغرب", time: "16:40", icon: Sunset },
    { name: "Isha", arabicName: "العشاء", time: "18:13", icon: Moon },
  ];

  const prayerTimes: PrayerTime[] = isFriday()
    ? basePrayerTimes.map(prayer =>
        prayer.name === "Dhuhr"
          ? { ...prayer, name: "Jummah", arabicName: "الجمعة", time: "12:15" }
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
    <div className="min-h-screen h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden flex flex-col">
      {/* Fullscreen Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={toggleFullscreen}
        className="fixed top-6 right-6 z-50 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl border-2 border-white/30 transition-all duration-300 shadow-2xl"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <Minimize2 className="w-8 h-8 text-white" />
        ) : (
          <Maximize2 className="w-8 h-8 text-white" />
        )}
      </motion.button>

      {/* Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
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

      <div className="relative z-10 flex-1 flex flex-col py-8 px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl tracking-wide">
            ET TAQWA
          </h1>
          <p className="text-3xl md:text-4xl text-white/90 mb-2 font-arabic">مسجد التقوى</p>
          <p className="text-2xl text-white/80">Wien</p>
        </motion.div>

        {/* Current Time - Large Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-white/15 backdrop-blur-lg rounded-3xl px-16 py-8 border-2 border-white/30 shadow-2xl">
            <p className="text-white/80 text-lg mb-2 uppercase tracking-wider">Aktuelle Zeit</p>
            <p className="text-8xl font-bold text-white tabular-nums">
              {currentTime.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
            <p className="text-white/70 text-xl mt-3">
              {currentTime.toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </motion.div>

        {/* All Prayer Times - TV Optimized Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex-1 max-w-7xl mx-auto w-full"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-8 uppercase tracking-wider">
            Gebetszeiten
          </h2>
          <div className="grid grid-cols-5 gap-6 h-full">
            {prayerTimes.map((prayer, index) => {
              const Icon = prayer.icon;
              const isNext = index === nextPrayerIndex;

              return (
                <motion.div
                  key={prayer.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-500 flex flex-col items-center justify-center ${
                    isNext
                      ? "bg-white/30 border-4 border-white/60 shadow-2xl scale-105"
                      : "bg-white/15 border-2 border-white/30"
                  } backdrop-blur-lg`}
                >
                  {isNext && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute top-4 left-1/2 -translate-x-1/2"
                    >
                      <span className="inline-block px-4 py-2 bg-white/40 rounded-full text-sm text-white font-bold uppercase tracking-wider shadow-lg">
                        Nächstes
                      </span>
                    </motion.div>
                  )}
                  
                  <div className="flex flex-col items-center text-center space-y-4 mt-8">
                    <div className="p-5 bg-white/25 rounded-2xl shadow-lg">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-white">
                        {prayer.name}
                      </h3>
                      <p className="text-2xl text-white/90 font-arabic">
                        {prayer.arabicName}
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <p className="text-6xl font-bold text-white tabular-nums">
                        {prayer.time}
                      </p>
                    </div>

                    {isNext && (
                      <div className="pt-2">
                        <p className="text-lg text-white/80">in</p>
                        <p className="text-2xl font-bold text-white">
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
          className="text-center mt-8"
        >
          <div className="inline-block bg-white/15 backdrop-blur-lg rounded-2xl px-12 py-6 border-2 border-white/30">
            <p className="text-4xl text-white font-arabic mb-3">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <p className="text-lg text-white/80">
              Im Namen Allahs, des Allerbarmers, des Barmherzigen
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrayerTimes;
