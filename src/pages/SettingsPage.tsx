import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Type, 
  Moon, 
  Sun, 
  Bell, 
  Smartphone,
  Info,
  Heart,
  Clock,
  Volume2,
  VolumeX,
  Play,
  Square,
  Globe,
  Palette
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { usePrayerNotifications } from "@/hooks/usePrayerNotifications";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem("app-font-size") || "medium";
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("app-dark-mode") === "true";
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem("prayer-notifications") === "true";
  });

  const [adhanEnabled, setAdhanEnabled] = useState(() => {
    return localStorage.getItem("adhan-enabled") === "true";
  });

  const [widgetEnabled, setWidgetEnabled] = useState(() => {
    return localStorage.getItem("widget-enabled") === "true";
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const { prayerTimes } = usePrayerTimes(currentTime);

  const { isPlaying, playAdhan, stopAdhan, requestPermissions } = usePrayerNotifications(
    prayerTimes,
    language,
    notificationsEnabled,
    adhanEnabled
  );

  const goBack = () => navigate("/app");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fontSizes = [
    { id: "small", label: language === "bs" ? "S" : "S" },
    { id: "medium", label: language === "bs" ? "M" : "M" },
    { id: "large", label: language === "bs" ? "L" : "L" },
    { id: "xlarge", label: language === "bs" ? "XL" : "XL" },
  ];

  useEffect(() => {
    localStorage.setItem("app-font-size", fontSize);
    document.documentElement.setAttribute("data-font-size", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("app-dark-mode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Glass Card Component
  const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`backdrop-blur-xl bg-card/60 dark:bg-card/40 rounded-3xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 ${className}`}>
      {children}
    </div>
  );

  // Toggle Switch Component
  const Toggle = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
        isOn 
          ? "bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30" 
          : "bg-muted/80 dark:bg-muted/50"
      }`}
    >
      <motion.div
        animate={{ x: isOn ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md"
      />
    </button>
  );

  // Setting Item Component
  const SettingItem = ({ 
    icon: Icon, 
    iconColor = "text-primary",
    iconBg = "bg-primary/10",
    label, 
    sublabel,
    children 
  }: { 
    icon: any; 
    iconColor?: string;
    iconBg?: string;
    label: string; 
    sublabel?: string;
    children?: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between py-4 px-1">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div>
          <p className="font-medium text-foreground">{label}</p>
          {sublabel && <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>}
        </div>
      </div>
      {children}
    </div>
  );

  // Widget Preview
  const WidgetPreview = () => {
    const prayerTimesList = [
      { id: "fajr", name: "Fajr", nameBs: "Sabah", time: prayerTimes?.fajr || "--:--" },
      { id: "dhuhr", name: "Dhuhr", nameBs: "Podne", time: prayerTimes?.dhuhr || "--:--" },
      { id: "asr", name: "Asr", nameBs: "Ikindija", time: prayerTimes?.asr || "--:--" },
      { id: "maghrib", name: "Maghrib", nameBs: "Akšam", time: prayerTimes?.maghrib || "--:--" },
      { id: "isha", name: "Isha", nameBs: "Jacija", time: prayerTimes?.isha || "--:--" },
    ];

    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    let nextPrayerIndex = 0;
    
    for (let i = 0; i < prayerTimesList.length; i++) {
      const [hours, minutes] = prayerTimesList[i].time.split(":").map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const prayerMinutes = hours * 60 + minutes;
        if (currentMinutes < prayerMinutes) {
          nextPrayerIndex = i;
          break;
        }
      }
    }

    const nextPrayer = prayerTimesList[nextPrayerIndex];
    
    const getCountdown = () => {
      if (!nextPrayer || nextPrayer.time === "--:--") return "00:00";
      const [hours, minutes] = nextPrayer.time.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) return "00:00";
      
      const prayerDate = new Date(currentTime);
      prayerDate.setHours(hours, minutes, 0, 0);
      const diff = prayerDate.getTime() - currentTime.getTime();
      if (diff <= 0) return "00:00";

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      
      return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    return (
      <div className="bg-gradient-to-br from-primary via-accent to-primary rounded-2xl p-4 shadow-xl shadow-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs font-medium uppercase tracking-wide">
              {language === "bs" ? "Sljedeći" : "Nächstes"}
            </p>
            <p className="text-xl font-bold text-white">
              {language === "bs" ? nextPrayer?.nameBs : nextPrayer?.name}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-white/60 mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{nextPrayer?.time}</span>
            </div>
            <p className="text-2xl font-bold text-white tabular-nums">
              {getCountdown()}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-2xl bg-background/70 border-b border-white/10">
        <div className="safe-area-inset-top" />
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-primary font-semibold active:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>{language === "bs" ? "Nazad" : "Zurück"}</span>
          </button>
          <h1 className="text-lg font-bold text-foreground">
            {language === "bs" ? "Postavke" : "Einstellungen"}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="px-5 pb-10 space-y-5 pt-6">
        
        {/* Appearance & Display */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {language === "bs" ? "Prikaz" : "Anzeige"}
          </p>
          <GlassCard className="p-4">
            {/* Dark Mode */}
            <SettingItem
              icon={darkMode ? Moon : Sun}
              iconColor={darkMode ? "text-indigo-500" : "text-amber-500"}
              iconBg={darkMode ? "bg-indigo-500/10" : "bg-amber-500/10"}
              label={language === "bs" ? "Tamni način" : "Dunkelmodus"}
              sublabel={darkMode 
                ? (language === "bs" ? "Aktivirano" : "Aktiviert")
                : (language === "bs" ? "Deaktivirano" : "Deaktiviert")
              }
            >
              <Toggle isOn={darkMode} onToggle={() => setDarkMode(!darkMode)} />
            </SettingItem>

            <div className="h-px bg-border/50 my-1" />

            {/* Font Size */}
            <div className="py-4 px-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Type className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {language === "bs" ? "Veličina teksta" : "Schriftgröße"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {language === "bs" ? "Prilagodi čitljivost" : "Lesbarkeit anpassen"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-muted/40 rounded-2xl p-1.5">
                {fontSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setFontSize(size.id)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      fontSize === size.id
                        ? "bg-white dark:bg-white/20 text-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>

              {/* Live Preview */}
              <div className="mt-4 p-4 bg-muted/30 rounded-2xl border border-border/30">
                <p className="text-foreground leading-relaxed">
                  {language === "bs" 
                    ? "Primjer teksta za pregled veličine." 
                    : "Beispieltext für die Vorschau."}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Language */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {language === "bs" ? "Jezik" : "Sprache"}
          </p>
          <GlassCard className="p-4">
            <div className="flex items-center gap-4 mb-4 px-1">
              <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {language === "bs" ? "Odaberi jezik" : "Sprache wählen"}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLanguage("de")}
                className={`py-4 px-4 rounded-2xl flex flex-col items-center gap-2 font-medium transition-all ${
                  language === "de"
                    ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                }`}
              >
                <span className="text-3xl">🇩🇪</span>
                <span>Deutsch</span>
              </button>
              <button
                onClick={() => setLanguage("bs")}
                className={`py-4 px-4 rounded-2xl flex flex-col items-center gap-2 font-medium transition-all ${
                  language === "bs"
                    ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/20"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                }`}
              >
                <span className="text-3xl">🇧🇦</span>
                <span>Bosanski</span>
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {language === "bs" ? "Obavještenja" : "Benachrichtigungen"}
          </p>
          <GlassCard className="p-4">
            <SettingItem
              icon={Bell}
              iconColor="text-rose-500"
              iconBg="bg-rose-500/10"
              label={language === "bs" ? "Push obavještenja" : "Push-Mitteilungen"}
              sublabel={language === "bs" ? "Obavijest za svaki namaz" : "Für jedes Gebet"}
            >
              <Toggle 
                isOn={notificationsEnabled} 
                onToggle={async () => {
                  const newValue = !notificationsEnabled;
                  if (newValue) {
                    const granted = await requestPermissions();
                    if (!granted) {
                      alert(language === "bs" 
                        ? "Molimo omogućite obavještenja u postavkama uređaja" 
                        : "Bitte Benachrichtigungen in Geräteeinstellungen aktivieren");
                      return;
                    }
                  }
                  setNotificationsEnabled(newValue);
                  localStorage.setItem("prayer-notifications", String(newValue));
                }}
              />
            </SettingItem>

            <div className="h-px bg-border/50 my-1" />

            <SettingItem
              icon={adhanEnabled ? Volume2 : VolumeX}
              iconColor="text-emerald-500"
              iconBg="bg-emerald-500/10"
              label={language === "bs" ? "Ezan (Gebetsruf)" : "Adhan (Gebetsruf)"}
              sublabel={language === "bs" ? "Automatski pri svakom namazu" : "Automatisch bei jedem Gebet"}
            >
              <Toggle 
                isOn={adhanEnabled} 
                onToggle={() => {
                  const newValue = !adhanEnabled;
                  setAdhanEnabled(newValue);
                  localStorage.setItem("adhan-enabled", String(newValue));
                }}
              />
            </SettingItem>
            
            {/* Adhan Test Button */}
            {adhanEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <button
                  onClick={() => isPlaying ? stopAdhan() : playAdhan()}
                  className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-semibold transition-all ${
                    isPlaying 
                      ? "bg-red-500/10 text-red-500 border border-red-500/20" 
                      : "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-4 h-4" />
                      {language === "bs" ? "Zaustavi" : "Stoppen"}
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      {language === "bs" ? "Testiraj ezan" : "Adhan testen"}
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* Widget */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            Widget
          </p>
          <GlassCard className="p-4">
            <SettingItem
              icon={Smartphone}
              iconColor="text-purple-500"
              iconBg="bg-purple-500/10"
              label={language === "bs" ? "Početni ekran widget" : "Homescreen-Widget"}
              sublabel={language === "bs" ? "Brzi pregled namaza" : "Schnelle Gebetsübersicht"}
            >
              <Toggle 
                isOn={widgetEnabled} 
                onToggle={() => {
                  setWidgetEnabled(!widgetEnabled);
                  localStorage.setItem("widget-enabled", String(!widgetEnabled));
                }}
              />
            </SettingItem>

            {widgetEnabled && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4"
              >
                <p className="text-xs text-muted-foreground mb-2 px-1">
                  {language === "bs" ? "Pregled widgeta" : "Widget-Vorschau"}
                </p>
                <WidgetPreview />
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1">
            {language === "bs" ? "Informacije" : "Informationen"}
          </p>
          <GlassCard className="p-4">
            <SettingItem
              icon={Info}
              iconColor="text-sky-500"
              iconBg="bg-sky-500/10"
              label={language === "bs" ? "Verzija aplikacije" : "App-Version"}
              sublabel="1.0.0"
            />
            
            <div className="h-px bg-border/50 my-1" />
            
            <SettingItem
              icon={Heart}
              iconColor="text-pink-500"
              iconBg="bg-pink-500/10"
              label="Et-Taqwa Moschee"
              sublabel="Wien, Österreich"
            />
          </GlassCard>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="pt-4 pb-6"
        >
          <p className="text-center text-muted-foreground/40 text-xs font-medium">
            {language === "bs" 
              ? "S ljubavlju za našu zajednicu 💚" 
              : "Mit Liebe für unsere Gemeinde 💚"}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
