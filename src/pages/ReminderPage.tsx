import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, BellOff, Clock, Check, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface PrayerReminder {
  id: string;
  name: string;
  nameBs: string;
  enabled: boolean;
  minutesBefore: number;
}

const ReminderPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [notificationsSupported, setNotificationsSupported] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [reminders, setReminders] = useState<PrayerReminder[]>([
    { id: "fajr", name: "Fajr", nameBs: "Sabah", enabled: true, minutesBefore: 15 },
    { id: "dhuhr", name: "Dhuhr", nameBs: "Podne", enabled: true, minutesBefore: 10 },
    { id: "asr", name: "Asr", nameBs: "Ikindija", enabled: true, minutesBefore: 10 },
    { id: "maghrib", name: "Maghrib", nameBs: "Akšam", enabled: true, minutesBefore: 5 },
    { id: "isha", name: "Isha", nameBs: "Jacija", enabled: true, minutesBefore: 10 },
  ]);

  const timeOptions = [5, 10, 15, 20, 30];

  useEffect(() => {
    // Check notification support
    if (!("Notification" in window)) {
      setNotificationsSupported(false);
      return;
    }

    // Check permission status
    if (Notification.permission === "granted") {
      setPermissionGranted(true);
    }

    // Load saved reminders from localStorage
    const saved = localStorage.getItem("prayer-reminders");
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  }, []);

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setPermissionGranted(true);
        toast.success(language === "bs" ? "Obavještenja aktivirana!" : "Benachrichtigungen aktiviert!");
      } else {
        toast.error(language === "bs" ? "Pristup obavještenjima odbijen" : "Benachrichtigungszugriff verweigert");
      }
    } catch (err) {
      console.error("Permission request failed:", err);
    }
  };

  const toggleReminder = (id: string) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    setReminders(updated);
    localStorage.setItem("prayer-reminders", JSON.stringify(updated));
    
    const reminder = updated.find(r => r.id === id);
    if (reminder?.enabled) {
      toast.success(
        language === "bs" 
          ? `${reminder.nameBs} podsjetnik aktiviran` 
          : `${reminder.name} Erinnerung aktiviert`
      );
    }
  };

  const updateMinutesBefore = (id: string, minutes: number) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, minutesBefore: minutes } : r
    );
    setReminders(updated);
    localStorage.setItem("prayer-reminders", JSON.stringify(updated));
  };

  const enableAll = () => {
    const updated = reminders.map(r => ({ ...r, enabled: true }));
    setReminders(updated);
    localStorage.setItem("prayer-reminders", JSON.stringify(updated));
    toast.success(language === "bs" ? "Svi podsjetnici aktivirani" : "Alle Erinnerungen aktiviert");
  };

  const disableAll = () => {
    const updated = reminders.map(r => ({ ...r, enabled: false }));
    setReminders(updated);
    localStorage.setItem("prayer-reminders", JSON.stringify(updated));
    toast.success(language === "bs" ? "Svi podsjetnici deaktivirani" : "Alle Erinnerungen deaktiviert");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-accent">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-primary/95 backdrop-blur-xl border-b border-white/10 px-4 py-4"
      >
        <div className="flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/app")}
            className="p-2 rounded-full bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-white">
              {language === "bs" ? "Podsjetnici" : "Erinnerungen"}
            </h1>
            <p className="text-white/70 text-sm">
              {language === "bs" ? "Obavještenja za namaz" : "Gebetsbenachrichtigungen"}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="p-4 pb-24">
        {/* Permission Request */}
        {notificationsSupported && !permissionGranted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 rounded-2xl bg-amber-500/20 border border-amber-400/30"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/30">
                <Bell className="w-6 h-6 text-amber-200" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">
                  {language === "bs" ? "Aktiviraj obavještenja" : "Benachrichtigungen aktivieren"}
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  {language === "bs" 
                    ? "Primajte podsjetnike prije svakog namaza" 
                    : "Erhalten Sie Erinnerungen vor jedem Gebet"}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={requestPermission}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium"
                >
                  {language === "bs" ? "Dozvoli obavještenja" : "Benachrichtigungen erlauben"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {!notificationsSupported && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 rounded-2xl bg-red-500/20 border border-red-400/30"
          >
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-red-300" />
              <p className="text-white/80 text-sm">
                {language === "bs" 
                  ? "Obavještenja nisu podržana na ovom uređaju" 
                  : "Benachrichtigungen werden auf diesem Gerät nicht unterstützt"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={enableAll}
            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/10 text-white text-sm"
          >
            <Bell className="w-4 h-4" />
            {language === "bs" ? "Sve uključi" : "Alle ein"}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={disableAll}
            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-white/10 text-white text-sm"
          >
            <BellOff className="w-4 h-4" />
            {language === "bs" ? "Sve isključi" : "Alle aus"}
          </motion.button>
        </div>

        {/* Prayer Reminders */}
        <div className="space-y-3">
          {reminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-2xl border transition-all ${
                reminder.enabled 
                  ? "bg-white/10 border-white/20" 
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${reminder.enabled ? "bg-primary" : "bg-white/10"}`}>
                    {reminder.enabled ? (
                      <Bell className="w-5 h-5 text-white" />
                    ) : (
                      <BellOff className="w-5 h-5 text-white/50" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${reminder.enabled ? "text-white" : "text-white/50"}`}>
                      {language === "bs" ? reminder.nameBs : reminder.name}
                    </h3>
                    <p className="text-white/50 text-xs">
                      {reminder.enabled 
                        ? `${reminder.minutesBefore} ${language === "bs" ? "min prije" : "Min vorher"}`
                        : (language === "bs" ? "Isključeno" : "Deaktiviert")}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleReminder(reminder.id)}
                  className={`w-12 h-7 rounded-full transition-all ${
                    reminder.enabled ? "bg-primary" : "bg-white/20"
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: reminder.enabled ? 26 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>

              {/* Time Options */}
              {reminder.enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex gap-2 pt-3 border-t border-white/10"
                >
                  <Clock className="w-4 h-4 text-white/50 shrink-0 mt-1" />
                  <div className="flex flex-wrap gap-2">
                    {timeOptions.map((mins) => (
                      <motion.button
                        key={mins}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateMinutesBefore(reminder.id, mins)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          reminder.minutesBefore === mins
                            ? "bg-white text-primary"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        {mins} min
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10"
        >
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <p className="text-white/60 text-sm">
              {language === "bs" 
                ? "Podsjetnici će se prikazati čak i kada je aplikacija zatvorena (zahtijeva nativnu aplikaciju)" 
                : "Erinnerungen erscheinen auch wenn die App geschlossen ist (erfordert native App)"}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReminderPage;
