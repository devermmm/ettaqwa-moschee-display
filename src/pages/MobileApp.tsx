import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, ChevronRight, MapPin, Heart, Compass, Bell, Moon, Sun } from "lucide-react";
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
      {/* iOS-style Header */}
      <div className="bg-background/80 backdrop-blur-xl sticky top-0 z-40 border-b border-border/50">
        <div className="safe-area-inset-top" />
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Et-Taqwa" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="text-lg font-semibold text-foreground">Et-Taqwa</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Wien
              </p>
            </div>
          </div>
          <button
            onClick={() => setLanguage(language === "bs" ? "de" : "bs")}
            className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
          >
            {language === "bs" ? "🇧🇦 BS" : "🇩🇪 DE"}
          </button>
        </div>
      </div>

      <div className="px-5 pb-8">
        {/* Date */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground text-sm mt-4 mb-2"
        >
          {getFormattedDate()}
        </motion.p>

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

        {/* Quick Actions - iOS Grid Style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-foreground mb-3">
            {language === "bs" ? "Brzi pristup" : "Schnellzugriff"}
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <Link to="/app/quran">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="font-semibold text-foreground text-sm">
                  {language === "bs" ? "Kur'an" : "Quran"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {language === "bs" ? "Čitaj sure" : "Suren lesen"}
                </p>
              </motion.div>
            </Link>

            <Link to="/app/dua">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-rose-500" />
                </div>
                <p className="font-semibold text-foreground text-sm">
                  {language === "bs" ? "Dove" : "Duas"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {language === "bs" ? "Bittgebete" : "Bittgebete"}
                </p>
              </motion.div>
            </Link>

            <Link to="/app/qibla">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5 text-amber-600" />
                </div>
                <p className="font-semibold text-foreground text-sm">
                  {language === "bs" ? "Kible" : "Qibla"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {language === "bs" ? "Kompas" : "Kompass"}
                </p>
              </motion.div>
            </Link>

            <Link to="/app/reminders">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                </div>
                <p className="font-semibold text-foreground text-sm">
                  {language === "bs" ? "Podsjetnici" : "Erinnerungen"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {language === "bs" ? "Obavještenja" : "Mitteilungen"}
                </p>
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
