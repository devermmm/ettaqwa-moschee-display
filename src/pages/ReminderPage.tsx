import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Bell, BellOff, Clock } from "lucide-react";
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
    if ("Notification" in window && Notification.permission === "granted") {
      setPermissionGranted(true);
    }

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
        toast.success(language === "bs" ? "Aktivirano!" : "Aktiviert!");
      }
    } catch (err) {
      console.error("Permission request failed");
    }
  };

  const toggleReminder = (id: string) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    setReminders(updated);
    localStorage.setItem("prayer-reminders", JSON.stringify(updated));
  };

  const updateMinutesBefore = (id: string, minutes: number) => {
    const updated = reminders.map(r => 
      r.id === id ? { ...r, minutesBefore: minutes } : r
    );
    setReminders(updated);
    localStorage.setItem("prayer-reminders", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* iOS Navigation Bar */}
      <div className="bg-background/80 backdrop-blur-xl sticky top-0 z-40 border-b border-border/50">
        <div className="safe-area-inset-top" />
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate("/app")} className="flex items-center gap-1 text-primary">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-[17px]">{language === "bs" ? "Nazad" : "Zurück"}</span>
          </button>
          <h1 className="font-semibold text-[17px] text-foreground absolute left-1/2 -translate-x-1/2">
            {language === "bs" ? "Podsjetnici" : "Erinnerungen"}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="p-4 pb-8">
        {/* Permission Banner */}
        {!permissionGranted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20"
          >
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">
                  {language === "bs" ? "Obavještenja nisu aktivirana" : "Benachrichtigungen nicht aktiv"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === "bs" 
                    ? "Omogućite obavještenja za podsjetnike" 
                    : "Aktivieren Sie Benachrichtigungen für Erinnerungen"}
                </p>
                <button
                  onClick={requestPermission}
                  className="mt-3 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium"
                >
                  {language === "bs" ? "Aktiviraj" : "Aktivieren"}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Reminders List - iOS Settings Style */}
        <div className="bg-card rounded-2xl overflow-hidden border border-border">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">
              {language === "bs" ? "Namaz podsjetnici" : "Gebetserinnerungen"}
            </p>
          </div>

          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="border-b border-border/50 last:border-b-0"
            >
              {/* Main Toggle Row */}
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  {reminder.enabled ? (
                    <Bell className="w-5 h-5 text-primary" />
                  ) : (
                    <BellOff className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className={`font-medium ${reminder.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                      {language === "bs" ? reminder.nameBs : reminder.name}
                    </p>
                    {reminder.enabled && (
                      <p className="text-xs text-muted-foreground">
                        {reminder.minutesBefore} {language === "bs" ? "min prije" : "Min vorher"}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* iOS Toggle */}
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`w-[51px] h-[31px] rounded-full transition-colors ${
                    reminder.enabled ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <motion.div
                    className="w-[27px] h-[27px] bg-white rounded-full shadow-md ml-[2px]"
                    animate={{ x: reminder.enabled ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Time Options */}
              {reminder.enabled && (
                <div className="px-4 pb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div className="flex gap-2 flex-wrap">
                    {timeOptions.map((mins) => (
                      <button
                        key={mins}
                        onClick={() => updateMinutesBefore(reminder.id, mins)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          reminder.minutesBefore === mins
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60 px-4">
          {language === "bs" 
            ? "Podsjetnici rade i kada je aplikacija zatvorena" 
            : "Erinnerungen funktionieren auch bei geschlossener App"}
        </p>
      </div>
    </div>
  );
};

export default ReminderPage;
