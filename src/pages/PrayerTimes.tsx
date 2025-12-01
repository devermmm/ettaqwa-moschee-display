import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AdvertisementSlide from "@/components/AdvertisementSlide";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

interface PrayerTime {
  name: string;
  bosnianName: string;
  time: string;
}

const PrayerTimes = () => {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenButton, setShowFullscreenButton] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
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

  // Auto-hide fullscreen button on mouse inactivity
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

  // Advertisement slideshow
  useEffect(() => {
    if (!isFullscreen) return;

    const adInterval = setInterval(() => {
      setShowAd(true);
      setTimeout(() => {
        setShowAd(false);
        setCurrentAdIndex((prev) => (prev + 1) % 2);
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

  const isFriday = () => currentTime.getDay() === 5;

  // Fetch prayer times from database (with fallback to PDF data)
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
    { name: "Sabah", bosnianName: "Sabah", time: safePrayerTimesData.fajr },
    { name: "Izlazak Sunca", bosnianName: "Izlazak Sunca", time: safePrayerTimesData.sunrise },
    { name: "Podne", bosnianName: "Podne", time: safePrayerTimesData.dhuhr },
    { name: "Ikindija", bosnianName: "Ikindija", time: safePrayerTimesData.asr },
    { name: "Akšam", bosnianName: "Akšam", time: safePrayerTimesData.maghrib },
    { name: "Jacija", bosnianName: "Jacija", time: safePrayerTimesData.isha },
  ];

  const fridayPrayerTimes: PrayerTime[] = [
    { name: "Sabah", bosnianName: "Sabah", time: safePrayerTimesData.fajr },
    { name: "Izlazak Sunca", bosnianName: "Izlazak Sunca", time: safePrayerTimesData.sunrise },
    { name: "Džuma 1", bosnianName: "Džuma 1", time: "12:00" },
    { name: "Džuma 2", bosnianName: "Džuma 2", time: "13:00" },
    { name: "Ikindija", bosnianName: "Ikindija", time: safePrayerTimesData.asr },
    { name: "Akšam", bosnianName: "Akšam", time: safePrayerTimesData.maghrib },
    { name: "Jacija", bosnianName: "Jacija", time: safePrayerTimesData.isha },
  ];

  const prayerTimesList: PrayerTime[] = isFriday() ? fridayPrayerTimes : basePrayerTimes;

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

    if (hoursLeft === 0) {
      return `za ${minutesLeft} min`;
    }
    if (minutesLeft === 0) {
      return `za ${hoursLeft} sat${hoursLeft > 1 ? 'a' : ''}`;
    }
    return `za ${hoursLeft} sat${hoursLeft > 1 ? 'a' : ''} ${minutesLeft} min`;
  };

  // Get Hijri date approximation
  const getHijriDate = () => {
    // Simple approximation - in production use a proper library
    const gregorianDate = currentTime;
    const day = gregorianDate.getDate();
    const monthNames = [
      "muharrem", "safer", "rebiu-l-evvel", "rebiu-l-ahir",
      "džumade-l-ula", "džumade-l-uhra", "redžeb", "ša'ban",
      "ramazan", "ševval", "zu-l-ka'de", "zu-l-hidždže"
    ];
    // This is a simplified approximation
    return `${day}. ${monthNames[5]} 1447`;
  };

  const getGregorianDate = () => {
    const months = [
      "januar", "februar", "mart", "april", "maj", "juni",
      "juli", "august", "septembar", "oktobar", "novembar", "decembar"
    ];
    const day = currentTime.getDate();
    const month = months[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    return `${day}. ${month} ${year}`;
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] relative overflow-hidden flex items-center justify-center">
      {/* Fullscreen Toggle Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showFullscreenButton ? 1 : 0, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFullscreen}
        className="fixed bottom-6 right-6 z-50 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 transition-all duration-700"
        style={{ pointerEvents: showFullscreenButton ? 'auto' : 'none' }}
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <Minimize2 className="w-6 h-6 text-white" />
        ) : (
          <Maximize2 className="w-6 h-6 text-white" />
        )}
      </motion.button>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-8">
        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2"
        >
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-wide">
            Graz
          </h1>
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <p className="text-white/60 text-sm md:text-base">
            {getGregorianDate()} / {getHijriDate()}
          </p>
        </motion.div>

        {/* Current Time */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-6xl md:text-7xl lg:text-8xl font-extralight text-white tabular-nums tracking-tight">
            {currentTime.toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </motion.div>

        {/* Prayer Times List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-0"
        >
          {prayerTimesList.map((prayer, index) => {
            const isNext = index === nextPrayerIndex;
            const isPast = index < nextPrayerIndex;

            return (
              <motion.div
                key={prayer.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`flex items-center justify-between py-4 border-b border-white/10 ${
                  isNext ? "bg-white/5 -mx-4 px-4 rounded-lg border-transparent" : ""
                }`}
              >
                <div className="flex flex-col">
                  <span className={`text-lg md:text-xl font-medium ${
                    isNext ? "text-emerald-400" : isPast ? "text-white/40" : "text-white"
                  }`}>
                    {prayer.bosnianName}
                  </span>
                  {isNext && (
                    <span className="text-emerald-400/70 text-sm">
                      {getTimeUntilPrayer(prayer.time)}
                    </span>
                  )}
                  {!isNext && !isPast && (
                    <span className="text-white/40 text-sm">
                      {getTimeUntilPrayer(prayer.time)}
                    </span>
                  )}
                </div>
                <span className={`text-2xl md:text-3xl font-light tabular-nums ${
                  isNext ? "text-emerald-400" : isPast ? "text-white/40" : "text-white"
                }`}>
                  {prayer.time}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mosque Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-white/40 text-sm uppercase tracking-widest">
            Et-Taqwa Moschee
          </p>
        </motion.div>
      </div>

      {/* Advertisement Overlay */}
      {showAd && isFullscreen && <AdvertisementSlide />}
    </div>
  );
};

export default PrayerTimes;
