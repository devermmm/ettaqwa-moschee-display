import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Type, 
  Moon, 
  Sun, 
  Bell, 
  Smartphone,
  Info,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Square,
  Globe
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { usePrayerNotifications } from "@/hooks/usePrayerNotifications";

import { GlassCard, PageContainer, PageHeader, SectionTitle } from "@/components/ui/GlassUI";
import { GlassSwitch } from "@/components/ui/GlassSwitch";
import { SettingItem } from "@/components/settings/SettingItem";
import { WidgetPreview } from "@/components/settings/WidgetPreview";

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

  // Stable reference so the page doesn't re-render every second (which caused toggle remount + flicker)
  const [prayerClock] = useState(() => new Date());
  const { prayerTimes } = usePrayerTimes(prayerClock);

  const { isPlaying, playAdhan, stopAdhan, requestPermissions } = usePrayerNotifications(
    prayerTimes,
    language,
    notificationsEnabled,
    adhanEnabled
  );

  const goBack = () => navigate("/app");

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

  return (
    <PageContainer>
      <PageHeader
        title={language === "bs" ? "Postavke" : "Einstellungen"}
        onBack={goBack}
        backLabel={language === "bs" ? "Nazad" : "Zurück"}
      />

      <div className="px-5 pb-10 space-y-5 pt-6">
        
        {/* Appearance & Display */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <SectionTitle>{language === "bs" ? "Prikaz" : "Anzeige"}</SectionTitle>
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
              <GlassSwitch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                aria-label={language === "bs" ? "Tamni način" : "Dunkelmodus"}
              />
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
          <SectionTitle>{language === "bs" ? "Jezik" : "Sprache"}</SectionTitle>
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
          <SectionTitle>
            {language === "bs" ? "Obavještenja" : "Benachrichtigungen"}
          </SectionTitle>
          <GlassCard className="p-4">
            <SettingItem
              icon={Bell}
              iconColor="text-rose-500"
              iconBg="bg-rose-500/10"
              label={language === "bs" ? "Push obavještenja" : "Push-Mitteilungen"}
              sublabel={language === "bs" ? "Obavijest za svaki namaz" : "Für jedes Gebet"}
            >
              <GlassSwitch
                checked={notificationsEnabled}
                onCheckedChange={async (checked) => {
                  if (checked) {
                    const granted = await requestPermissions();
                    if (!granted) {
                      alert(
                        language === "bs"
                          ? "Molimo omogućite obavještenja u postavkama uređaja"
                          : "Bitte Benachrichtigungen in Geräteeinstellungen aktivieren",
                      );
                      return;
                    }
                  }
                  setNotificationsEnabled(checked);
                  localStorage.setItem("prayer-notifications", String(checked));
                }}
                aria-label={
                  language === "bs" ? "Push obavještenja" : "Push-Mitteilungen"
                }
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
              <GlassSwitch
                checked={adhanEnabled}
                onCheckedChange={(checked) => {
                  setAdhanEnabled(checked);
                  localStorage.setItem("adhan-enabled", String(checked));
                }}
                aria-label={language === "bs" ? "Ezan" : "Adhan"}
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
          <SectionTitle>Widget</SectionTitle>
          <GlassCard className="p-4">
            <SettingItem
              icon={Smartphone}
              iconColor="text-purple-500"
              iconBg="bg-purple-500/10"
              label={language === "bs" ? "Početni ekran widget" : "Homescreen-Widget"}
              sublabel={language === "bs" ? "Brzi pregled namaza" : "Schnelle Gebetsübersicht"}
            >
              <GlassSwitch
                checked={widgetEnabled}
                onCheckedChange={(checked) => {
                  setWidgetEnabled(checked);
                  localStorage.setItem("widget-enabled", String(checked));
                }}
                aria-label={
                  language === "bs"
                    ? "Početni ekran widget"
                    : "Homescreen-Widget"
                }
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
                 <WidgetPreview language={language} />
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
          <SectionTitle>
            {language === "bs" ? "Informacije" : "Informationen"}
          </SectionTitle>
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
    </PageContainer>
  );
};

export default SettingsPage;
