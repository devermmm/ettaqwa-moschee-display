import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, MapPin, Heart, Compass, Bell, Calendar, Settings, ChevronRight, BookMarked, Newspaper, X, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { usePrayerNotifications } from "@/hooks/usePrayerNotifications";
import { supabase } from "@/integrations/supabase/client";
import SplashScreen from "@/components/SplashScreen";
import logo from "@/assets/logo.png";
import terrace1 from "@/assets/terrace-1.jpg";
import terrace2 from "@/assets/terrace-2.jpg";
import terrace3 from "@/assets/terrace-3.jpg";
import terrace4 from "@/assets/terrace-4.jpg";
import terrace5 from "@/assets/terrace-5.jpg";
import terrace6 from "@/assets/terrace-6.jpg";

const terraceImages = [terrace1, terrace2, terrace3, terrace4, terrace5, terrace6];

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

// Glass Card Component - Reusable
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-xl bg-card/60 dark:bg-card/40 rounded-3xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 ${className}`}>
    {children}
  </div>
);

const MobileApp = () => {
  const { language, setLanguage } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentTerraceIndex, setCurrentTerraceIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [notificationsEnabled] = useState(() => 
    localStorage.getItem("prayer-notifications") === "true"
  );
  const [adhanEnabled] = useState(() => 
    localStorage.getItem("adhan-enabled") === "true"
  );

  const { prayerTimes: prayerTimesData } = usePrayerTimes(currentTime);

  // Fetch news posts
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setPosts(data);
    };
    fetchPosts();
  }, []);

  // Terrace slideshow timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTerraceIndex((prev) => (prev + 1) % terraceImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  usePrayerNotifications(prayerTimesData, language, notificationsEnabled, adhanEnabled);

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

  // Menu items for the list
  const menuItems = [
    { to: "/app/qibla", icon: Compass, iconColor: "text-amber-500", iconBg: "bg-amber-500/10", 
      label: language === "bs" ? "Kible" : "Qibla", sublabel: language === "bs" ? "Pronađi smjer Kible" : "Finde die Gebetsrichtung" },
    { to: "/app/reminders", icon: Bell, iconColor: "text-blue-500", iconBg: "bg-blue-500/10",
      label: language === "bs" ? "Podsjetnici" : "Erinnerungen", sublabel: language === "bs" ? "Obavijesti za namaz" : "Gebetsbenachrichtigungen" },
    { to: "/app/calendar", icon: Calendar, iconColor: "text-purple-500", iconBg: "bg-purple-500/10",
      label: language === "bs" ? "Kalendar" : "Kalender", sublabel: language === "bs" ? "Islamski datumi" : "Islamische Daten" },
    { to: "/app/hadith", icon: BookMarked, iconColor: "text-amber-600", iconBg: "bg-amber-600/10",
      label: language === "bs" ? "Hadisi" : "Hadithe", sublabel: language === "bs" ? "Sahih Buharija & Muslim" : "Sahih Bukhari & Muslim" },
    { to: "/app/settings", icon: Settings, iconColor: "text-gray-500", iconBg: "bg-gray-500/10",
      label: language === "bs" ? "Postavke" : "Einstellungen", sublabel: language === "bs" ? "App konfiguracija" : "App-Konfiguration" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-2xl bg-background/70 border-b border-white/10">
        <div className="safe-area-inset-top" />
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-2xl shadow-primary/40 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                <img 
                  src={logo} 
                  alt="Et-Taqwa" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
                  ET-TAQWA
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Wien, Österreich</p>
              </div>
            </div>
            <button
              onClick={() => setLanguage(language === "bs" ? "de" : "bs")}
              className="w-11 h-11 rounded-2xl backdrop-blur-xl bg-card/60 dark:bg-card/40 border border-white/20 dark:border-white/10 flex items-center justify-center text-xl shadow-lg shadow-black/5 active:scale-95 transition-transform"
            >
              {language === "bs" ? "🇧🇦" : "🇩🇪"}
            </button>
          </div>
          
          <p className="text-muted-foreground text-sm font-medium">
            {getFormattedDate()}
          </p>
        </div>
      </div>

      <div className="px-5 pb-10 pt-5 space-y-5">

        {/* Next Prayer Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="bg-gradient-to-br from-primary via-accent to-primary rounded-3xl p-5 shadow-xl shadow-primary/25">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider">
                  {language === "bs" ? "Sljedeći namaz" : "Nächstes Gebet"}
                </p>
                <h2 className="text-3xl font-bold text-white mt-1">
                  {language === "bs" ? nextPrayer?.nameBs : nextPrayer?.name}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white tabular-nums">{nextPrayer?.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl p-3.5">
              <Clock className="w-5 h-5 text-white/70" />
              <p className="text-white/90 text-sm font-medium">
                {language === "bs" ? "za" : "in"}{" "}
                <span className="font-bold text-white tabular-nums text-lg">
                  {countdown.hours > 0 && `${countdown.hours}h `}
                  {countdown.minutes}m {countdown.seconds}s
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Prayer Times List */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {language === "bs" ? "Sva vremena" : "Alle Gebetszeiten"}
          </p>
          <GlassCard className="overflow-hidden">
            {prayerTimesList.map((prayer, index) => {
              const isNext = index === nextPrayerIndex;
              const isPast = index < nextPrayerIndex;

              return (
                <div
                  key={prayer.id}
                  className={`flex items-center justify-between px-4 py-3.5 border-b border-white/10 last:border-b-0 ${
                    isNext ? "bg-primary/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      isNext ? "bg-primary shadow-lg shadow-primary/50" : isPast ? "bg-muted-foreground/30" : "bg-muted-foreground/50"
                    }`} />
                    <span className={`font-semibold ${
                      isPast ? "text-muted-foreground/60" : isNext ? "text-primary" : "text-foreground"
                    }`}>
                      {language === "bs" ? prayer.nameBs : prayer.name}
                    </span>
                  </div>
                  <span className={`tabular-nums font-bold ${
                    isPast ? "text-muted-foreground/40" : isNext ? "text-primary" : "text-foreground"
                  }`}>
                    {prayer.time}
                  </span>
                </div>
              );
            })}

            {isFriday && (
              <div className="px-4 py-3 bg-amber-500/10 border-t border-amber-500/20">
                <p className="text-xs text-amber-600 font-bold mb-1.5 uppercase tracking-wide">
                  {language === "bs" ? "Džuma" : "Freitagsgebet"}
                </p>
                <div className="flex gap-3">
                  <span className="text-sm font-semibold text-foreground">12:15</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm font-semibold text-foreground">13:00</span>
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Terrace Project Slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {language === "bs" ? "Projekti" : "Projekte"}
          </p>
          <GlassCard className="overflow-hidden">
            <button
              onClick={() => {
                setLightboxIndex(currentTerraceIndex);
                setLightboxOpen(true);
              }}
              className="relative h-48 w-full block active:scale-[0.98] transition-transform"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentTerraceIndex}
                  src={terraceImages[currentTerraceIndex]}
                  alt="Terrasse Projekt"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <span className="inline-block px-2 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-lg mb-2">
                  {language === "bs" ? "Uskoro" : "Bald"}
                </span>
                <h3 className="text-white font-bold text-lg">
                  {language === "bs" ? "Nova Terasa" : "Neue Terrasse"}
                </h3>
                <p className="text-white/70 text-sm">
                  {language === "bs" ? "Uljepšavamo naš prostor" : "Wir verschönern unseren Raum"}
                </p>
              </div>
              {/* Dots indicator */}
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {terraceImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentTerraceIndex ? "bg-white scale-110" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </button>
          </GlassCard>
        </motion.div>

        {/* Lightbox for Terrace Images */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black flex flex-col"
            >
              {/* Header */}
              <div className="safe-area-inset-top" />
              <div className="flex items-center justify-between px-4 py-3">
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="flex items-center gap-1 text-white/80 font-medium active:opacity-70"
                >
                  <ChevronLeft className="w-5 h-5" />
                  {language === "bs" ? "Nazad" : "Zurück"}
                </button>
                <span className="text-white/60 text-sm">
                  {lightboxIndex + 1} / {terraceImages.length}
                </span>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Swipeable Image */}
              <motion.div 
                className="flex-1 flex items-center justify-center px-4 overflow-hidden"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 80) {
                    setLightboxIndex((prev) => (prev - 1 + terraceImages.length) % terraceImages.length);
                  } else if (info.offset.x < -80) {
                    setLightboxIndex((prev) => (prev + 1) % terraceImages.length);
                  }
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxIndex}
                    src={terraceImages[lightboxIndex]}
                    alt={`Terrasse ${lightboxIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-full max-h-full object-contain rounded-2xl pointer-events-none"
                  />
                </AnimatePresence>
              </motion.div>

              {/* Dots indicator */}
              <div className="px-4 py-6 safe-area-inset-bottom flex justify-center gap-2">
                {terraceImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === lightboxIndex ? "bg-white scale-125" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* News Section */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              {language === "bs" ? "Novosti" : "Neuigkeiten"}
            </p>
            <div className="space-y-3">
              {posts.slice(0, 3).map((post) => (
                <GlassCard key={post.id} className="overflow-hidden">
                  <div className="flex">
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-24 h-24 object-cover flex-shrink-0"
                      />
                    )}
                    <div className="p-3 flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Newspaper className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString(
                            language === "bs" ? "bs-BA" : "de-DE",
                            { day: "numeric", month: "short" }
                          )}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {language === "bs" ? "Brzi pristup" : "Schnellzugriff"}
          </p>
          
          {/* Main Feature Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link to="/app/quran" className="block">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-5 shadow-xl shadow-emerald-500/25 aspect-square flex flex-col justify-between active:scale-[0.98] transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-xl">
                    {language === "bs" ? "Kur'an" : "Quran"}
                  </p>
                  <p className="text-white/70 text-sm font-medium">
                    {language === "bs" ? "Čitaj i slušaj" : "Lesen & Hören"}
                  </p>
                </div>
              </div>
            </Link>

            <Link to="/app/dua" className="block">
              <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl p-5 shadow-xl shadow-rose-500/25 aspect-square flex flex-col justify-between active:scale-[0.98] transition-transform">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-xl">
                    {language === "bs" ? "Dove" : "Duas"}
                  </p>
                  <p className="text-white/70 text-sm font-medium">
                    {language === "bs" ? "Islamske dove" : "Islamische Bittgebete"}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Menu List */}
          <GlassCard className="overflow-hidden">
            {menuItems.map((item, index) => (
              <Link key={item.to} to={item.to} className="block">
                <div className={`flex items-center px-4 py-4 ${index !== menuItems.length - 1 ? 'border-b border-white/10' : ''} active:bg-muted/30 transition-colors`}>
                  <div className={`w-11 h-11 rounded-2xl ${item.iconBg} flex items-center justify-center mr-4`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sublabel}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground/40" />
                </div>
              </Link>
            ))}
          </GlassCard>
        </motion.div>

        {/* Basmala Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-6 pb-4"
        >
          <p className="text-muted-foreground/50 text-xl font-arabic text-center">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <p className="text-muted-foreground/30 text-xs mt-2 text-center font-medium">
            {language === "bs" ? "U ime Allaha, Milostivog, Samilosnog" : "Im Namen Allahs, des Allerbarmers, des Barmherzigen"}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileApp;
