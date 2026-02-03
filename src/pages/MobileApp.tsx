import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, MapPin, Heart, Compass, Bell, Calendar, Settings, ChevronRight, BookMarked } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import SplashScreen from "@/components/SplashScreen";
import logo from "@/assets/logo.png";

const MobileApp = () => {
  const { t, language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

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
    { id: "fajr", name: "Fajr", nameBs: "Sabah", time: safePrayerTimesData.fajr },
    { id: "sunrise", name: "Sunrise", nameBs: "Izlazak", time: safePrayerTimesData.sunrise },
    { id: "dhuhr", name: "Dhuhr", nameBs: "Podne", time: safePrayerTimesData.dhuhr },
    { id: "asr", name: "Asr", nameBs: "Ikindija", time: safePrayerTimesData.asr },
    { id: "maghrib", name: "Maghrib", nameBs: "Akšam", time: safePrayerTimesData.maghrib },
    { id: "isha", name: "Isha", nameBs: "Jacija", time: safePrayerTimesData.isha },
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

  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    return currentTime.toLocaleDateString(language === "bs" ? "bs-BA" : "de-DE", options);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Clean iOS-style Header */}
      <div className="bg-background sticky top-0 z-40">
        <div className="safe-area-inset-top" />
        <div className="px-5 pt-4 pb-3">
          {/* Top Row - Logo & Language */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-accent p-0.5 shadow-lg shadow-primary/20">
                <img 
                  src={logo} 
                  alt="Et-Taqwa" 
                  className="w-full h-full rounded-[14px] object-cover bg-white" 
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">Et-Taqwa</h1>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="text-xs">Wien, Österreich</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setLanguage(language === "bs" ? "de" : "bs")}
              className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center text-lg border border-border/50 active:scale-95 transition-transform"
            >
              {language === "bs" ? "🇧🇦" : "🇩🇪"}
            </button>
          </div>
          
          {/* Date Row */}
          <p className="text-muted-foreground text-sm">
            {getFormattedDate()}
          </p>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="px-5 pb-8 pt-4">

        {/* Next Prayer Card - iOS Widget Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-accent rounded-3xl p-5 mb-6 shadow-lg shadow-primary/20"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm">
                {language === "bs" ? "Sljedeći namaz" : "Nächstes Gebet"}
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">
                {language === "bs" ? nextPrayer?.nameBs : nextPrayer?.name}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white tabular-nums">{nextPrayer?.time}</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2 bg-black/20 rounded-2xl p-3">
            <Clock className="w-4 h-4 text-white/60" />
            <p className="text-white/80 text-sm">
              {language === "bs" ? "za" : "in"} {" "}
              <span className="font-semibold text-white tabular-nums">
                {countdown.hours > 0 && `${countdown.hours}h `}
                {countdown.minutes}m {countdown.seconds}s
              </span>
            </p>
          </div>
        </motion.div>

        {/* Prayer Times List - iOS List Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border mb-6"
        >
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-foreground">
              {language === "bs" ? "Sva vremena" : "Alle Gebetszeiten"}
            </h3>
          </div>
          
          {prayerTimesList.map((prayer, index) => {
            const isNext = index === nextPrayerIndex;
            const isPast = index < nextPrayerIndex;

            return (
              <div
                key={prayer.id}
                className={`flex items-center justify-between px-4 py-3.5 border-b border-border/50 last:border-b-0 ${
                  isNext ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    isNext ? "bg-primary" : isPast ? "bg-muted" : "bg-muted-foreground/30"
                  }`} />
                  <span className={`font-medium ${
                    isPast ? "text-muted-foreground" : isNext ? "text-primary" : "text-foreground"
                  }`}>
                    {language === "bs" ? prayer.nameBs : prayer.name}
                  </span>
                </div>
                <span className={`tabular-nums font-semibold ${
                  isPast ? "text-muted-foreground/50" : isNext ? "text-primary" : "text-foreground"
                }`}>
                  {prayer.time}
                </span>
              </div>
            );
          })}

          {/* Jumu'ah Times */}
          {isFriday && (
            <div className="px-4 py-3 bg-amber-500/5 border-t border-amber-500/20">
              <p className="text-xs text-amber-600 font-medium mb-2">
                {language === "bs" ? "Džuma" : "Freitagsgebet"}
              </p>
              <div className="flex gap-4">
                <span className="text-sm text-foreground">12:15</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-foreground">13:00</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Actions - iOS Native Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-foreground mb-3">
            {language === "bs" ? "Brzi pristup" : "Schnellzugriff"}
          </h3>
          
          {/* Main Features - Large Cards */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Link to="/app/quran">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 shadow-lg shadow-emerald-500/20 aspect-square flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">
                    {language === "bs" ? "Kur'an" : "Quran"}
                  </p>
                  <p className="text-white/70 text-xs">
                    {language === "bs" ? "Čitaj i slušaj" : "Lesen & Hören"}
                  </p>
                </div>
              </motion.div>
            </Link>

            <Link to="/app/dua">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-4 shadow-lg shadow-rose-500/20 aspect-square flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">
                    {language === "bs" ? "Dove" : "Duas"}
                  </p>
                  <p className="text-white/70 text-xs">
                    {language === "bs" ? "Islamske dove" : "Islamische Gebete"}
                  </p>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Secondary Features - List Style */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Link to="/app/qibla">
              <motion.div
                whileTap={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="flex items-center px-4 py-3.5 border-b border-border/50"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mr-3">
                  <Compass className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {language === "bs" ? "Kible" : "Qibla"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "bs" ? "Pronađi smjer Kible" : "Finde die Gebetsrichtung"}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </motion.div>
            </Link>

            <Link to="/app/reminders">
              <motion.div
                whileTap={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="flex items-center px-4 py-3.5 border-b border-border/50"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mr-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {language === "bs" ? "Podsjetnici" : "Erinnerungen"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "bs" ? "Obavijesti za namaz" : "Gebetsbenachrichtigungen"}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </motion.div>
            </Link>

            <Link to="/app/calendar">
              <motion.div
                whileTap={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="flex items-center px-4 py-3.5 border-b border-border/50"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {language === "bs" ? "Kalendar" : "Kalender"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "bs" ? "Islamski datumi" : "Islamische Daten"}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </motion.div>
            </Link>

            <Link to="/app/hadith">
              <motion.div
                whileTap={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="flex items-center px-4 py-3.5 border-b border-border/50"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-600/10 flex items-center justify-center mr-3">
                  <BookMarked className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {language === "bs" ? "Hadisi" : "Hadithe"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "bs" ? "Sahih Buharija & Muslim" : "Sahih Bukhari & Muslim"}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </motion.div>
            </Link>

            <Link to="/app/settings">
              <motion.div
                whileTap={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="flex items-center px-4 py-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-500/10 flex items-center justify-center mr-3">
                  <Settings className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {language === "bs" ? "Postavke" : "Einstellungen"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "bs" ? "App konfiguracija" : "App-Konfiguration"}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Basmala Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center pb-6"
        >
          <p className="text-muted-foreground/60 text-lg font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <p className="text-muted-foreground/40 text-xs mt-1">
            {language === "bs" ? "U ime Allaha, Milostivog, Samilosnog" : "Im Namen Allahs, des Allerbarmers, des Barmherzigen"}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileApp;
