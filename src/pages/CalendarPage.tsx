import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Moon, Star, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Hijri calendar conversion utilities
const gregorianToHijri = (date: Date): { day: number; month: number; year: number } => {
  const gd = date.getDate();
  const gm = date.getMonth() + 1;
  const gy = date.getFullYear();

  let jd = Math.floor((1461 * (gy + 4800 + Math.floor((gm - 14) / 12))) / 4) +
    Math.floor((367 * (gm - 2 - 12 * Math.floor((gm - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((gy + 4900 + Math.floor((gm - 14) / 12)) / 100)) / 4) +
    gd - 32075;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const remaining = l - 10631 * n + 354;
  const j = Math.floor((10985 - remaining) / 5316) * Math.floor((50 * remaining) / 17719) +
    Math.floor(remaining / 5670) * Math.floor((43 * remaining) / 15238);
  const adjustedRemaining = remaining - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;

  const hm = Math.floor((24 * adjustedRemaining) / 709);
  const hd = adjustedRemaining - Math.floor((709 * hm) / 24);
  const hy = 30 * n + j - 30;

  return { day: hd, month: hm, year: hy };
};

const CalendarPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showHijri, setShowHijri] = useState(true);

  const goBack = () => navigate("/app");

  const monthNames = language === "bs" 
    ? ["Januar", "Februar", "Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"]
    : ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

  const dayNames = language === "bs"
    ? ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"]
    : ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  const hijriMonthNames = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];

  const hijriMonthNamesArabic = [
    "مُحَرَّم", "صَفَر", "رَبِيع الأَوَّل", "رَبِيع الثَّانِي",
    "جُمَادَى الأُولَى", "جُمَادَى الآخِرَة", "رَجَب", "شَعْبَان",
    "رَمَضَان", "شَوَّال", "ذُو القَعْدَة", "ذُو الحِجَّة"
  ];

  // Important Islamic dates for 2025/2026
  const islamicEvents: { [key: string]: { name: string; nameBs: string; hijriDate: string } } = {
    // 2025 Events
    "2025-01-07": { name: "Rabi' al-Awwal Beginn", nameBs: "Početak Rebi'ul-evvela", hijriDate: "1 Rabi' al-Awwal 1446" },
    "2025-02-28": { name: "Ramadan Beginn", nameBs: "Početak Ramazana", hijriDate: "1 Ramadan 1446" },
    "2025-03-30": { name: "Eid al-Fitr (Ramazanski Bajram)", nameBs: "Ramazanski Bajram", hijriDate: "1 Shawwal 1446" },
    "2025-03-31": { name: "2. Tag Eid al-Fitr", nameBs: "2. dan Ramazanskog Bajrama", hijriDate: "2 Shawwal 1446" },
    "2025-04-01": { name: "3. Tag Eid al-Fitr", nameBs: "3. dan Ramazanskog Bajrama", hijriDate: "3 Shawwal 1446" },
    "2025-06-06": { name: "Eid al-Adha (Kurban Bajram)", nameBs: "Kurban Bajram", hijriDate: "10 Dhu al-Hijjah 1446" },
    "2025-06-07": { name: "2. Tag Eid al-Adha", nameBs: "2. dan Kurban Bajrama", hijriDate: "11 Dhu al-Hijjah 1446" },
    "2025-06-08": { name: "3. Tag Eid al-Adha", nameBs: "3. dan Kurban Bajrama", hijriDate: "12 Dhu al-Hijjah 1446" },
    "2025-06-09": { name: "4. Tag Eid al-Adha", nameBs: "4. dan Kurban Bajrama", hijriDate: "13 Dhu al-Hijjah 1446" },
    "2025-06-27": { name: "Islamisches Neujahr", nameBs: "Islamska Nova Godina", hijriDate: "1 Muharram 1447" },
    "2025-07-06": { name: "Ashura", nameBs: "Dan Ašure", hijriDate: "10 Muharram 1447" },
    "2025-09-05": { name: "Mawlid an-Nabi", nameBs: "Mevlud", hijriDate: "12 Rabi' al-Awwal 1447" },
    // 2026 Events
    "2026-02-17": { name: "Ramadan Beginn", nameBs: "Početak Ramazana", hijriDate: "1 Ramadan 1447" },
    "2026-03-19": { name: "Eid al-Fitr (Ramazanski Bajram)", nameBs: "Ramazanski Bajram", hijriDate: "1 Shawwal 1447" },
    "2026-03-20": { name: "2. Tag Eid al-Fitr", nameBs: "2. dan Ramazanskog Bajrama", hijriDate: "2 Shawwal 1447" },
    "2026-03-21": { name: "3. Tag Eid al-Fitr", nameBs: "3. dan Ramazanskog Bajrama", hijriDate: "3 Shawwal 1447" },
    "2026-05-27": { name: "Eid al-Adha (Kurban Bajram)", nameBs: "Kurban Bajram", hijriDate: "10 Dhu al-Hijjah 1447" },
    "2026-05-28": { name: "2. Tag Eid al-Adha", nameBs: "2. dan Kurban Bajrama", hijriDate: "11 Dhu al-Hijjah 1447" },
    "2026-05-29": { name: "3. Tag Eid al-Adha", nameBs: "3. dan Kurban Bajrama", hijriDate: "12 Dhu al-Hijjah 1447" },
    "2026-05-30": { name: "4. Tag Eid al-Adha", nameBs: "4. dan Kurban Bajrama", hijriDate: "13 Dhu al-Hijjah 1447" },
    "2026-06-17": { name: "Islamisches Neujahr", nameBs: "Islamska Nova Godina", hijriDate: "1 Muharram 1448" },
    "2026-06-26": { name: "Ashura", nameBs: "Dan Ašure", hijriDate: "10 Muharram 1448" },
    "2026-08-26": { name: "Mawlid an-Nabi", nameBs: "Mevlud", hijriDate: "12 Rabi' al-Awwal 1448" },
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = [];
    
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getHijriForDay = (day: number | null) => {
    if (!day) return null;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return gregorianToHijri(date);
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
  
  // Get current Hijri date for header
  const currentHijri = gregorianToHijri(currentDate);
  const todayHijri = gregorianToHijri(new Date());

  // Get upcoming events
  const upcomingEvents = Object.entries(islamicEvents)
    .filter(([date]) => new Date(date) >= new Date())
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(0, 4);

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
          <h1 className="font-semibold text-foreground absolute left-1/2 -translate-x-1/2">
            {language === "bs" ? "Kalendar" : "Kalender"}
          </h1>
          <button
            onClick={() => setShowHijri(!showHijri)}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
          >
            <Moon className={`w-4 h-4 ${showHijri ? "text-primary" : "text-muted-foreground"}`} />
          </button>
        </div>
      </div>

      <div className="px-5 pb-8">
        {/* Today's Hijri Date Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-accent rounded-2xl p-4 mt-4 mb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs">
                {language === "bs" ? "Danas - Hidžri" : "Heute - Hijri"}
              </p>
              <p className="text-white text-lg font-bold mt-1">
                {todayHijri.day} {hijriMonthNames[todayHijri.month - 1]} {todayHijri.year}
              </p>
              <p className="text-white/80 text-sm font-arabic mt-0.5">
                {todayHijri.day} {hijriMonthNamesArabic[todayHijri.month - 1]} {todayHijri.year}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Moon className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Month Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center justify-between py-3"
        >
          <button
            onClick={prevMonth}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="text-center">
            <h2 className="text-lg font-bold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            {showHijri && (
              <p className="text-xs text-muted-foreground">
                {hijriMonthNames[currentHijri.month - 1]} {currentHijri.year} هـ
              </p>
            )}
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
          className="bg-card rounded-2xl p-3 border border-border shadow-sm mb-4"
        >
          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayNames.map((day, index) => (
              <div
                key={day}
                className={`text-center text-xs font-medium py-1.5 ${
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
              const hijri = showHijri ? getHijriForDay(day) : null;

              return (
                <div
                  key={index}
                  className={`
                    relative aspect-square flex flex-col items-center justify-center rounded-xl text-xs p-0.5
                    ${!day ? "" : ""}
                    ${today ? "bg-primary text-primary-foreground" : ""}
                    ${friday && !today ? "bg-primary/10" : ""}
                    ${event && !today ? "bg-amber-500/10" : ""}
                    ${!today && day ? "text-foreground" : ""}
                  `}
                >
                  <span className={`font-semibold ${today ? "text-primary-foreground" : friday ? "text-primary" : ""}`}>
                    {day}
                  </span>
                  {hijri && day && (
                    <span className={`text-[9px] ${today ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {hijri.day}
                    </span>
                  )}
                  {event && (
                    <div className="absolute top-0.5 right-0.5">
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
            <Star className="w-4 h-4 text-amber-500" />
            {language === "bs" ? "Islamski praznici" : "Islamische Feiertage"}
          </h3>

          <div className="space-y-2">
            {upcomingEvents.map(([date, event]) => {
              const eventDate = new Date(date);
              const daysUntil = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div
                  key={date}
                  className="bg-card rounded-2xl p-3 border border-border shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-primary/20 flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-foreground">
                        {eventDate.getDate()}
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        {monthNames[eventDate.getMonth()].slice(0, 3)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">
                        {language === "bs" ? event.nameBs : event.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.hijriDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {daysUntil === 0 
                          ? (language === "bs" ? "Danas" : "Heute")
                          : daysUntil === 1 
                            ? (language === "bs" ? "Sutra" : "Morgen")
                            : `${daysUntil} ${language === "bs" ? "dana" : "Tage"}`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {upcomingEvents.length === 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border text-center">
                <p className="text-muted-foreground text-sm">
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
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>{language === "bs" ? "Danas" : "Heute"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary/20" />
            <span>{language === "bs" ? "Petak" : "Freitag"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{language === "bs" ? "Praznik" : "Feiertag"}</span>
          </div>
          {showHijri && (
            <div className="flex items-center gap-1.5">
              <Moon className="w-3 h-3 text-primary" />
              <span>{language === "bs" ? "Hidžri datum" : "Hijri-Datum"}</span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarPage;
