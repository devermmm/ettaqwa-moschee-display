import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getPrayerTimesForDate, DailyPrayerTimes } from "@/data/prayerTimes2025";
import { format } from "date-fns";

export const usePrayerTimes = (date: Date) => {
  const [prayerTimes, setPrayerTimes] = useState<DailyPrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"database" | "fallback">("fallback");

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setLoading(true);
      const dateString = format(date, "yyyy-MM-dd");

      try {
        // First, try to get from database
        const { data, error } = await supabase
          .from("prayer_times")
          .select("fajr, sunrise, dhuhr, asr, maghrib, isha")
          .eq("date", dateString)
          .maybeSingle();

        if (data && !error) {
          setPrayerTimes({
            fajr: data.fajr,
            sunrise: data.sunrise,
            dhuhr: data.dhuhr,
            asr: data.asr,
            maghrib: data.maghrib,
            isha: data.isha,
          });
          setSource("database");
        } else {
          // Fallback to PDF data
          const fallbackTimes = getPrayerTimesForDate(date);
          setPrayerTimes(fallbackTimes);
          setSource("fallback");
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        // Fallback to PDF data on error
        const fallbackTimes = getPrayerTimesForDate(date);
        setPrayerTimes(fallbackTimes);
        setSource("fallback");
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [date.toDateString()]);

  return { prayerTimes, loading, source };
};
