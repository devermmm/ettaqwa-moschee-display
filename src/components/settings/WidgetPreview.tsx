import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";

import { usePrayerTimes } from "@/hooks/usePrayerTimes";

export function WidgetPreview({ language }: { language: string }) {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const { prayerTimes } = usePrayerTimes(currentTime);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTimesList = useMemo(
    () => [
      { id: "fajr", name: "Fajr", nameBs: "Sabah", time: prayerTimes?.fajr || "--:--" },
      { id: "dhuhr", name: "Dhuhr", nameBs: "Podne", time: prayerTimes?.dhuhr || "--:--" },
      { id: "asr", name: "Asr", nameBs: "Ikindija", time: prayerTimes?.asr || "--:--" },
      { id: "maghrib", name: "Maghrib", nameBs: "Akšam", time: prayerTimes?.maghrib || "--:--" },
      { id: "isha", name: "Isha", nameBs: "Jacija", time: prayerTimes?.isha || "--:--" },
    ],
    [prayerTimes],
  );

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

    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
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
          <div className="flex items-center gap-1.5 text-white/60 mb-0.5 justify-end">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">{nextPrayer?.time}</span>
          </div>
          <p className="text-2xl font-bold text-white tabular-nums">{getCountdown()}</p>
        </div>
      </div>
    </div>
  );
}
