import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SlideshowManager from "@/components/SlideshowManager";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

interface PrayerTime {
  name: string;
  bosnianName: string;
  time: string;
}

const PrayerTimes = () => {
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(true);
  const [showAd, setShowAd] = useState(false);

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
    if (!isFullscreen) return;

    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowFullscreenButton(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowFullscreenButton(false);
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    timeoutId = setTimeout(() => {
      setShowFullscreenButton(false);
    }, 3000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isFullscreen]);

  useEffect(() => {
    if (!isFullscreen) return;

    const adInterval = setInterval(() => {
      setShowAd(true);
      setTimeout(() => {
        setShowAd(false);
      }, 15000);
    }, 30000);

    return () => clearInterval(adInterval);
  }, [isFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isInFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isInFullscreen);
      
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = isInFullscreen ? 'none' : '';
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.display = '';
      }
    };
  }, []);

  const { prayerTimes: prayerTimesData } = usePrayerTimes(currentTime);

  const safePrayerTimesData = prayerTimesData || {
    fajr: "--:--",
    sunrise: "--:--",
    dhuhr: "--:--",
    asr: "--:--",
    maghrib: "--:--",
    isha: "--:--",
  };

  const basePrayerTimes: PrayerTime[] = [
    { name: "Sabah", bosnianName: t("prayerTimes.sabah"), time: safePrayerTimesData.fajr },
    { name: "Izlazak Sunca", bosnianName: t("prayerTimes.sunriseLabel"), time: safePrayerTimesData.sunrise },
    { name: "Podne", bosnianName: t("prayerTimes.podne"), time: safePrayerTimesData.dhuhr },
    { name: "Ikindija", bosnianName: t("prayerTimes.ikindija"), time: safePrayerTimesData.asr },
    { name: "Akšam", bosnianName: t("prayerTimes.aksam"), time: safePrayerTimesData.maghrib },
    { name: "Jacija", bosnianName: t("prayerTimes.jacija"), time: safePrayerTimesData.isha },
  ];

  const prayerTimesList: PrayerTime[] = basePrayerTimes;

  // Dzuma (Friday prayer) times - always shown
  const dzumaTimes = [
    { name: "Džuma 1", bosnianName: t("prayerTimes.dzuma1"), time: "12:00" },
    { name: "Džuma 2", bosnianName: t("prayerTimes.dzuma2"), time: "13:00" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = currentTime;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let foundNext = 0;
    for (let i = 0; i < prayerTimesList.length; i++) {
      const [hours, minutes] = prayerTimesList[i].time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (currentMinutes < prayerMinutes) {
        foundNext = i;
        break;
      }
    }

    setNextPrayerIndex(foundNext);
  }, [currentTime, prayerTimesList]);

  const getTimeUntilPrayer = (prayerTime: string, isPast: boolean) => {
    if (isPast) {
      return t("prayerTimes.passed");
    }
    
    const [hours, minutes] = prayerTime.split(":").map(Number);
    const now = currentTime;
    const prayer = new Date(now);
    prayer.setHours(hours, minutes, 0, 0);

    const diff = prayer.getTime() - now.getTime();
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hoursLeft === 0) {
      return t("prayerTimes.inMinutes").replace("{min}", minutesLeft.toString());
    }
    if (minutesLeft === 0) {
      return (hoursLeft > 1 ? t("prayerTimes.inHoursPlural") : t("prayerTimes.inHours")).replace("{h}", hoursLeft.toString());
    }
    return t("prayerTimes.inHoursMinutes").replace("{h}", hoursLeft.toString()).replace("{min}", minutesLeft.toString());
  };

  const getHijriDate = () => {
    const day = currentTime.getDate();
    const monthNames = language === "bs" 
      ? ["muharrem", "safer", "rebiu-l-evvel", "rebiu-l-ahir", "džumade-l-ula", "džumade-l-uhra", "redžeb", "ša'ban", "ramazan", "ševval", "zu-l-ka'de", "zu-l-hidždže"]
      : ["Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"];
    return `${day}. ${monthNames[5]} 1447`;
  };

  const getGregorianDate = () => {
    const monthsBs = ["januar", "februar", "mart", "april", "maj", "juni", "juli", "august", "septembar", "oktobar", "novembar", "decembar"];
    const monthsDe = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const months = language === "bs" ? monthsBs : monthsDe;
    const day = currentTime.getDate();
    const month = months[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    return `${day}. ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 relative overflow-hidden flex items-center justify-center">
      {/* Islamic Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="0.5"/>
              <path d="M15 15L45 15L45 45L15 45Z" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)"/>
        </svg>
      </div>

      {/* Mosque Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 opacity-10">
        <svg viewBox="0 0 1200 200" className="w-full h-auto" fill="white">
          <path d="M0 200 L0 180 L100 180 L100 120 L120 120 L130 80 L140 120 L160 120 L160 180 L200 180 L200 140 L220 140 L240 100 L260 140 L280 140 L280 180 L400 180 L400 150 L420 150 L430 60 L440 150 L460 150 L460 180 L500 180 L500 160 L550 160 L550 100 L570 100 L600 30 L630 100 L650 100 L650 160 L700 160 L700 180 L800 180 L800 140 L820 140 L830 90 L840 140 L860 140 L860 180 L950 180 L950 150 L970 150 L980 70 L990 150 L1010 150 L1010 180 L1100 180 L1100 130 L1120 130 L1140 80 L1160 130 L1180 130 L1180 180 L1200 180 L1200 200 Z"/>
        </svg>
      </div>

      {/* Fullscreen Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showFullscreenButton ? 1 : 0, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFullscreen}
        className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-800/50 hover:bg-emerald-700/50 backdrop-blur-md rounded-full border border-emerald-500/30 transition-all duration-700 shadow-lg shadow-emerald-900/50"
        style={{ pointerEvents: showFullscreenButton ? 'auto' : 'none' }}
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <Minimize2 className="w-6 h-6 text-emerald-200" />
        ) : (
          <Maximize2 className="w-6 h-6 text-emerald-200" />
        )}
      </motion.button>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8">
        {/* Header Row: Logo, Time, Date */}
        <div className="flex items-center justify-between mb-8">
          {/* Mosque Logo/Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-left"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide mb-1">
              ET-TAQWA
            </h1>
            <p className="text-emerald-300 text-lg font-arabic">مسجد التقوى</p>
            <div className="flex items-center gap-2 text-emerald-200/80 mt-1">
              <MapPin className="w-4 h-4" />
              <span className="text-sm uppercase tracking-widest">{t("prayerTimes.location")}</span>
            </div>
          </motion.div>

          {/* Current Time */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-block px-8 py-4 rounded-2xl bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20">
              <p className="text-5xl md:text-6xl lg:text-7xl font-light text-white tabular-nums tracking-tight">
                {currentTime.toLocaleTimeString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-right"
          >
            <p className="text-emerald-100 text-lg font-medium">
              {getGregorianDate()}
            </p>
            <p className="text-emerald-300/80 text-sm mt-1">
              {getHijriDate()}
            </p>
          </motion.div>
        </div>

        {/* Prayer Times - Horizontal Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-6 gap-4 mb-6"
        >
          {prayerTimesList.map((prayer, index) => {
            const isNext = index === nextPrayerIndex;
            const isPast = index < nextPrayerIndex;

            return (
              <motion.div
                key={prayer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`text-center px-4 py-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  isNext 
                    ? "bg-gradient-to-b from-emerald-600/50 to-teal-600/50 border-emerald-400/50 scale-105" 
                    : "bg-emerald-900/40 border-emerald-500/20"
                }`}
              >
                <span className={`block text-lg md:text-xl font-medium mb-2 ${
                  isNext ? "text-white" : isPast ? "text-emerald-100/40" : "text-emerald-100"
                }`}>
                  {prayer.bosnianName}
                </span>
                <span className={`block text-3xl md:text-4xl font-bold tabular-nums mb-2 ${
                  isNext ? "text-white" : isPast ? "text-emerald-100/40" : "text-emerald-100"
                }`}>
                  {prayer.time}
                </span>
                <span className={`block text-xs ${
                  isNext ? "text-emerald-200" : "text-emerald-100/40"
                }`}>
                  {getTimeUntilPrayer(prayer.time, isPast)}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dzuma Times - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20">
            <span className="text-emerald-300 text-lg font-semibold">{t("prayerTimes.dzumaLabel")}:</span>
            {dzumaTimes.map((dzuma) => (
              <div key={dzuma.name} className="text-center">
                <span className="text-emerald-100/80 text-sm block">{dzuma.bosnianName}</span>
                <span className="text-white text-2xl font-bold tabular-nums">{dzuma.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer with Basmala */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-emerald-300/60 text-xl font-arabic mb-2">
            {t("prayerTimes.basmala")}
          </p>
          <p className="text-emerald-200/40 text-xs">
            {t("prayerTimes.basmalaTranslation")}
          </p>
        </motion.div>
      </div>

      {/* Slideshow Manager - cycles through all 3 slideshows */}
      <SlideshowManager isActive={showAd && isFullscreen} />
    </div>
  );
};

export default PrayerTimes;
