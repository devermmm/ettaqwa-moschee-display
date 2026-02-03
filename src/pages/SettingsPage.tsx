import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Type, 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  Smartphone,
  Info,
  Heart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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

  const goBack = () => navigate("/app");

  const fontSizes = [
    { id: "small", label: language === "bs" ? "Mala" : "Klein", scale: "text-sm" },
    { id: "medium", label: language === "bs" ? "Srednja" : "Mittel", scale: "text-base" },
    { id: "large", label: language === "bs" ? "Velika" : "Groß", scale: "text-lg" },
    { id: "xlarge", label: language === "bs" ? "Vrlo velika" : "Sehr groß", scale: "text-xl" },
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

  const SettingRow = ({ 
    icon: Icon, 
    label, 
    value, 
    onClick,
    toggle,
    isOn
  }: { 
    icon: any; 
    label: string; 
    value?: string; 
    onClick?: () => void;
    toggle?: boolean;
    isOn?: boolean;
  }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3.5 border-b border-border/50 last:border-b-0 active:bg-muted/50"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="font-medium text-foreground">{label}</span>
      </div>
      {toggle ? (
        <div
          className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
            isOn ? "bg-primary" : "bg-muted"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
              isOn ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {value && <span className="text-muted-foreground text-sm">{value}</span>}
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* iOS Navigation Bar */}
      <div className="bg-background/80 backdrop-blur-xl sticky top-0 z-40 border-b border-border/50">
        <div className="safe-area-inset-top" />
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-primary font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>{language === "bs" ? "Nazad" : "Zurück"}</span>
          </button>
          <h1 className="font-semibold text-foreground">
            {language === "bs" ? "Postavke" : "Einstellungen"}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="px-5 pb-8">
        {/* Font Size Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-4">
            {language === "bs" ? "Veličina teksta" : "Schriftgröße"}
          </h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">A</span>
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ 
                      width: fontSize === "small" ? "25%" : 
                             fontSize === "medium" ? "50%" : 
                             fontSize === "large" ? "75%" : "100%" 
                    }}
                  />
                </div>
                <span className="text-lg text-muted-foreground">A</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {fontSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setFontSize(size.id)}
                    className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors ${
                      fontSize === size.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div className="mt-4 p-3 bg-muted/50 rounded-xl">
                <p className={`text-foreground ${
                  fontSize === "small" ? "text-sm" :
                  fontSize === "medium" ? "text-base" :
                  fontSize === "large" ? "text-lg" : "text-xl"
                }`}>
                  {language === "bs" 
                    ? "Ovo je primjer teksta" 
                    : "Dies ist ein Beispieltext"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Appearance Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-4">
            {language === "bs" ? "Izgled" : "Darstellung"}
          </h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <SettingRow
              icon={darkMode ? Moon : Sun}
              label={language === "bs" ? "Tamni način" : "Dunkelmodus"}
              toggle
              isOn={darkMode}
              onClick={() => setDarkMode(!darkMode)}
            />
          </div>
        </motion.div>

        {/* Language Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-6"
        >
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-4">
            {language === "bs" ? "Jezik" : "Sprache"}
          </h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLanguage("de")}
                  className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${
                    language === "de"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <span className="text-lg">🇩🇪</span>
                  <span>Deutsch</span>
                </button>
                <button
                  onClick={() => setLanguage("bs")}
                  className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${
                    language === "bs"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <span className="text-lg">🇧🇦</span>
                  <span>Bosanski</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-4">
            {language === "bs" ? "Obavještenja" : "Mitteilungen"}
          </h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <SettingRow
              icon={Bell}
              label={language === "bs" ? "Obavještenja za namaz" : "Gebets-Mitteilungen"}
              toggle
              isOn={notificationsEnabled}
              onClick={() => {
                setNotificationsEnabled(!notificationsEnabled);
                localStorage.setItem("prayer-notifications", String(!notificationsEnabled));
              }}
            />
          </div>
        </motion.div>

        {/* Widget Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6"
        >
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-4">
            {language === "bs" ? "Widget" : "Widget"}
          </h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {language === "bs" ? "Dodaj Widget" : "Widget hinzufügen"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "bs" 
                      ? "Dugo pritisni na početni ekran → Widgeti → Et-Taqwa" 
                      : "Lange auf Startbildschirm drücken → Widgets → Et-Taqwa"}
                  </p>
                </div>
              </div>

              {/* Widget Preview */}
              <div className="mt-4 p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {language === "bs" ? "Sljedeći namaz" : "Nächstes Gebet"}
                    </p>
                    <p className="text-lg font-bold text-foreground">Dhuhr</p>
                    <p className="text-sm text-muted-foreground">12:30</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary tabular-nums">2:15:30</p>
                    <p className="text-xs text-muted-foreground">
                      {language === "bs" ? "preostalo" : "verbleibend"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-4">
            {language === "bs" ? "O aplikaciji" : "Über die App"}
          </h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <SettingRow
              icon={Info}
              label={language === "bs" ? "Verzija" : "Version"}
              value="1.0.0"
            />
            <SettingRow
              icon={Heart}
              label={language === "bs" ? "Et-Taqwa Moschee" : "Et-Taqwa Moschee"}
              value="Wien"
            />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-muted-foreground/50 text-xs mt-8"
        >
          {language === "bs" 
            ? "Napravljeno s ljubavlju za našu zajednicu" 
            : "Mit Liebe für unsere Gemeinde gemacht"}
        </motion.p>
      </div>
    </div>
  );
};

export default SettingsPage;
