import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Moon, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CalendarPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());

  const goBack = () => navigate("/app");

  const monthNames = language === "bs" 
    ? ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"]
    : ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

  const dayNames = language === "bs"
    ? ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"]
    : ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  const islamicMonths = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];

  // Important Islamic dates (approximate - would need proper Hijri calendar library for accuracy)
  const islamicEvents: { [key: string]: { name: string; nameBs: string } } = {
    "2025-03-01": { name: "Ramadan Beginn", nameBs: "Početak Ramazana" },
    "2025-03-31": { name: "Eid al-Fitr", nameBs: "Bajram" },
    "2025-06-07": { name: "Eid al-Adha", nameBs: "Kurban Bajram" },
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getEventForDay = (day: number | null) => {
    if (!day) return null;
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return islamicEvents[dateStr];
  };

  const isFriday = (day: number | null) => {
    if (!day) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.getDay() === 5;
  };

  const days = getDaysInMonth(currentDate);

  // Get upcoming events
  const upcomingEvents = Object.entries(islamicEvents)
    .filter(([date]) => new Date(date) >= new Date())
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(0, 3);

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
            {language === "bs" ? "Kalendar" : "Kalender"}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="px-5 pb-8">
        {/* Month Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between py-4"
        >
          <button
            onClick={prevMonth}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-bold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-4 border border-border shadow-sm mb-6"
        >
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day, index) => (
              <div
                key={day}
                className={`text-center text-xs font-medium py-2 ${
                  index === 5 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const event = getEventForDay(day);
              const friday = isFriday(day);
              const today = isToday(day);

              return (
                <div
                  key={index}
                  className={`
                    relative aspect-square flex items-center justify-center rounded-xl text-sm
                    ${!day ? "" : ""}
                    ${today ? "bg-primary text-primary-foreground font-bold" : ""}
                    ${friday && !today ? "text-primary font-semibold" : ""}
                    ${event && !today ? "bg-accent/20" : ""}
                    ${!today && !friday && day ? "text-foreground" : ""}
                  `}
                >
                  {day}
                  {event && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                      <Star className="w-2 h-2 text-amber-500 fill-amber-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Islamic Events */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Moon className="w-4 h-4 text-primary" />
            {language === "bs" ? "Važni datumi" : "Wichtige Termine"}
          </h3>

          <div className="space-y-3">
            {upcomingEvents.map(([date, event]) => {
              const eventDate = new Date(date);
              return (
                <div
                  key={date}
                  className="bg-card rounded-2xl p-4 border border-border shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {language === "bs" ? event.nameBs : event.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {eventDate.toLocaleDateString(language === "bs" ? "bs-BA" : "de-DE", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                </div>
              );
            })}

            {upcomingEvents.length === 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <p className="text-muted-foreground">
                  {language === "bs" ? "Nema nadolazećih događaja" : "Keine bevorstehenden Ereignisse"}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>{language === "bs" ? "Danas" : "Heute"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/30" />
            <span>{language === "bs" ? "Petak" : "Freitag"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{language === "bs" ? "Praznik" : "Feiertag"}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarPage;
