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
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreen}
        className="fixed top-4 right-4 z-50 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl border border-white/30 transition-all duration-300 group"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <Minimize2 className="w-6 h-6 text-white" />
        ) : (
          <Maximize2 className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
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

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-2xl">
            ET TAQWA
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-1">مسجد التقوى</p>
          <p className="text-base text-white/70">Wien</p>
        </motion.div>

        {/* Current Time */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
            <p className="text-white/70 text-xs mb-1">Aktuelle Zeit</p>
            <p className="text-3xl md:text-5xl font-bold text-white">
              {currentTime.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
            <p className="text-white/60 text-xs mt-1">
              {currentTime.toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </motion.div>

        {/* Next Prayer Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/30 shadow-2xl">
            <p className="text-white/80 text-center text-xs uppercase tracking-widest mb-3">
              Nächstes Gebet
            </p>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {prayerTimes[nextPrayerIndex].name}
              </h2>
              <p className="text-2xl md:text-3xl text-white/90 mb-4 font-arabic">
                {prayerTimes[nextPrayerIndex].arabicName}
              </p>
              <div className="flex items-center justify-center gap-6">
                <div>
                  <p className="text-white/70 text-xs mb-1">Zeit</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {prayerTimes[nextPrayerIndex].time}
                  </p>
                </div>
                <div className="h-10 w-px bg-white/30" />
                <div>
                  <p className="text-white/70 text-xs mb-1">In</p>
                  <p className="text-xl md:text-2xl font-bold text-white">
                    {getTimeUntilPrayer(prayerTimes[nextPrayerIndex].time)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Prayer Times Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-6">
            Alle Gebetszeiten
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {prayerTimes.map((prayer, index) => {
              const Icon = prayer.icon;
              const isNext = index === nextPrayerIndex;

              return (
                <motion.div
                  key={prayer.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                    isNext
                      ? "bg-white/25 border-2 border-white/50 shadow-2xl"
                      : "bg-white/10 border border-white/20"
                  } backdrop-blur-md`}
                >
                  {isNext && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-block px-2 py-0.5 bg-white/30 rounded-full text-[10px] text-white font-semibold">
                        Nächstes
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col items-center text-center mb-3">
                    <div className="p-2 bg-white/20 rounded-lg mb-2">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {prayer.name}
                      </h4>
                      <p className="text-white/70 text-xs font-arabic">
                        {prayer.arabicName}
                      </p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white text-center">{prayer.time}</p>
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
          className="text-center mt-8 mb-6"
        >
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
            <p className="text-xl md:text-2xl text-white font-arabic mb-2">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
            </p>
            <p className="text-xs text-white/70">
              Im Namen Allahs, des Allerbarmers, des Barmherzigen
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrayerTimes;
