import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Moon, Star, ChevronRight, Calendar, MapPin, Heart, Settings, Compass, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import logo from "@/assets/logo.png";

const MobileApp = () => {
  const { t, language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const { prayerTimes: prayerTimesData } = usePrayerTimes(currentTime);

  const safePrayerTimesData = prayerTimesData || {
    fajr: "--:--",
    sunrise: "--:--",
    dhuhr: "--:--",
    asr: "--:--",
    maghrib: "--:--",
    isha: "--:--",
  };

  const prayerTimesList = [
    { name: "Sabah", arabicName: "الفجر", time: safePrayerTimesData.fajr, icon: "🌙" },
    { name: "Izlazak", arabicName: "الشروق", time: safePrayerTimesData.sunrise, icon: "🌅" },
    { name: "Podne", arabicName: "الظهر", time: safePrayerTimesData.dhuhr, icon: "☀️" },
    { name: "Ikindija", arabicName: "العصر", time: safePrayerTimesData.asr, icon: "🌤️" },
    { name: "Akšam", arabicName: "المغرب", time: safePrayerTimesData.maghrib, icon: "🌆" },
    { name: "Jacija", arabicName: "العشاء", time: safePrayerTimesData.isha, icon: "🌃" },
  ];

  // Dzuma times
  const dzumaTimes = [
    { name: "Džuma 1", time: "12:15" },
    { name: "Džuma 2", time: "13:00" },
  ];

  const isFriday = currentTime.getDay() === 5;

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
  }, [currentTime]);

  const getTimeUntilNextPrayer = () => {
    const prayer = prayerTimesList[nextPrayerIndex];
    if (!prayer || prayer.time === "--:--") return { hours: 0, minutes: 0, seconds: 0 };

    const [hours, minutes] = prayer.time.split(":").map(Number);
    const prayerDate = new Date(currentTime);
    prayerDate.setHours(hours, minutes, 0, 0);

    const diff = prayerDate.getTime() - currentTime.getTime();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  const countdown = getTimeUntilNextPrayer();
  const nextPrayer = prayerTimesList[nextPrayerIndex];

  const getHijriDate = () => {
    const day = currentTime.getDate();
    const monthNames = ["Muharrem", "Safer", "Rebiul-Evvel", "Rebiul-Ahir", "Džumadel-Ula", "Džumadel-Uhra", "Redžeb", "Ša'ban", "Ramazan", "Ševval", "Zul-Ka'de", "Zul-Hidždže"];
    return `${day}. ${monthNames[5]} 1447 h`;
  };

  const getGregorianDate = () => {
    const days = language === "bs" 
      ? ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
      : ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const months = language === "bs"
      ? ["januar", "februar", "mart", "april", "maj", "juni", "juli", "august", "septembar", "oktobar", "novembar", "decembar"]
      : ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    
    return `${days[currentTime.getDay()]}, ${currentTime.getDate()}. ${months[currentTime.getMonth()]}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-accent overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-6 pb-4 px-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.img 
              src={logo} 
              alt="Et-Taqwa" 
              className="w-12 h-12 rounded-xl shadow-lg"
              whileTap={{ scale: 0.95 }}
            />
            <div>
              <h1 className="text-xl font-bold text-white">Et-Taqwa</h1>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Wien, Österreich
              </p>
            </div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
          >
            <Settings className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Settings Dropdown */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-5 top-16 bg-card/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-border z-50 min-w-48"
            >
              <p className="text-sm font-semibold text-foreground mb-3">{language === "bs" ? "Jezik" : "Sprache"}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => { setLanguage("bs"); setShowSettings(false); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${language === "bs" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                >
                  Bosanski
                </button>
                <button
                  onClick={() => { setLanguage("de"); setShowSettings(false); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${language === "de" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
                >
                  Deutsch
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Next Prayer Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mb-6"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 p-6">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <Moon className="w-full h-full text-white" />
          </div>
          <Star className="absolute bottom-3 left-3 w-4 h-4 text-white/20" />
          <Star className="absolute top-8 right-8 w-3 h-3 text-white/20" />

          <div className="relative z-10">
            <p className="text-white/70 text-sm mb-1">
              {language === "bs" ? "Sljedeći namaz" : "Nächstes Gebet"}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white">{nextPrayer?.name || "--"}</h2>
                <p className="text-lg text-white/80 font-arabic">{nextPrayer?.arabicName || ""}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-white tabular-nums">{nextPrayer?.time || "--:--"}</p>
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-black/20 rounded-2xl p-4">
              <p className="text-white/60 text-xs mb-2 text-center">
                {language === "bs" ? "Preostalo vrijeme" : "Zeit verbleibend"}
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white tabular-nums">{String(countdown.hours).padStart(2, "0")}</p>
                  <p className="text-xs text-white/50">{language === "bs" ? "sati" : "Std"}</p>
                </div>
                <p className="text-3xl font-bold text-white/50">:</p>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white tabular-nums">{String(countdown.minutes).padStart(2, "0")}</p>
                  <p className="text-xs text-white/50">{language === "bs" ? "min" : "Min"}</p>
                </div>
                <p className="text-3xl font-bold text-white/50">:</p>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white tabular-nums">{String(countdown.seconds).padStart(2, "0")}</p>
                  <p className="text-xs text-white/50">{language === "bs" ? "sek" : "Sek"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Date Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mb-4 flex items-center justify-between px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-white/70" />
          <span className="text-white text-sm">{getGregorianDate()}</span>
        </div>
        <span className="text-white/70 text-xs">{getHijriDate()}</span>
      </motion.div>

      {/* Prayer Times List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-5 rounded-3xl bg-card/95 backdrop-blur-xl border border-border overflow-hidden shadow-2xl"
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              {language === "bs" ? "Namaz vremena" : "Gebetszeiten"}
            </h3>
          </div>
        </div>

        <div className="divide-y divide-border">
          {prayerTimesList.map((prayer, index) => {
            const isNext = index === nextPrayerIndex;
            const isPast = index < nextPrayerIndex;

            return (
              <motion.div
                key={prayer.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`flex items-center justify-between px-4 py-4 transition-all ${
                  isNext ? "bg-primary/10" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{prayer.icon}</span>
                  <div>
                    <p className={`font-medium ${isPast ? "text-muted-foreground" : isNext ? "text-primary font-semibold" : "text-foreground"}`}>
                      {prayer.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-arabic">{prayer.arabicName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className={`text-lg tabular-nums font-semibold ${
                    isPast ? "text-muted-foreground/50" : isNext ? "text-primary" : "text-foreground"
                  }`}>
                    {prayer.time}
                  </p>
                  {isNext && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {language === "bs" ? "Sljedeći" : "Nächstes"}
                    </span>
                  )}
                  {isPast && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      {language === "bs" ? "Prije" : "Vorbei"}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dzuma Times */}
        {isFriday && (
          <div className="p-4 bg-primary/5 border-t border-border">
            <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              {language === "bs" ? "Džuma namaz" : "Freitagsgebet"}
            </p>
            <div className="flex gap-4">
              {dzumaTimes.map((dzuma) => (
                <div key={dzuma.name} className="flex-1 bg-card rounded-xl p-3 text-center border border-border">
                  <p className="text-xs text-muted-foreground">{dzuma.name}</p>
                  <p className="text-xl font-bold text-foreground tabular-nums">{dzuma.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-5 mt-6 grid grid-cols-2 gap-4"
      >
        <Link to="/app/quran">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm"
          >
            <div className="p-2 rounded-xl bg-primary/10">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground text-sm">{language === "bs" ? "Kur'an" : "Quran"}</p>
              <p className="text-xs text-muted-foreground">{language === "bs" ? "Čitaj i slušaj" : "Lesen & Hören"}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </Link>

        <Link to="/app/dua">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm"
          >
            <div className="p-2 rounded-xl bg-accent/10">
              <Heart className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground text-sm">{language === "bs" ? "Dove" : "Duas"}</p>
              <p className="text-xs text-muted-foreground">{language === "bs" ? "Dnevne dove" : "Tägliche Duas"}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </Link>

        <Link to="/app/qibla">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm"
          >
            <div className="p-2 rounded-xl bg-amber-500/10">
              <Compass className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground text-sm">{language === "bs" ? "Kible" : "Qibla"}</p>
              <p className="text-xs text-muted-foreground">{language === "bs" ? "Smjer Meke" : "Richtung Mekka"}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </Link>

        <Link to="/app/reminders">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-sm"
          >
            <div className="p-2 rounded-xl bg-blue-500/10">
              <Bell className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-left flex-1">
              <p className="font-medium text-foreground text-sm">{language === "bs" ? "Podsjetnici" : "Erinnerungen"}</p>
              <p className="text-xs text-muted-foreground">{language === "bs" ? "Obavještenja" : "Benachrichtigungen"}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </Link>
      </motion.div>

      {/* Basmala Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 pb-8 text-center"
      >
        <p className="text-white/50 text-2xl font-arabic mb-1">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>
        <p className="text-white/30 text-xs">
          {language === "bs" ? "U ime Allaha, Milostivog, Samilosnog" : "Im Namen Allahs, des Allerbarmers, des Barmherzigen"}
        </p>
      </motion.div>
    </div>
  );
};

export default MobileApp;
