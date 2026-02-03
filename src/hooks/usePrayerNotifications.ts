import { useEffect, useRef, useCallback, useState } from "react";
import { LocalNotifications, ScheduleOptions } from "@capacitor/local-notifications";
import { Capacitor } from "@capacitor/core";
import { DailyPrayerTimes } from "@/data/prayerTimes2025";

interface PrayerInfo {
  id: string;
  nameDe: string;
  nameBs: string;
  nameAr: string;
}

const PRAYERS: PrayerInfo[] = [
  { id: "fajr", nameDe: "Fajr", nameBs: "Sabah", nameAr: "الفجر" },
  { id: "dhuhr", nameDe: "Dhuhr", nameBs: "Podne", nameAr: "الظهر" },
  { id: "asr", nameDe: "Asr", nameBs: "Ikindija", nameAr: "العصر" },
  { id: "maghrib", nameDe: "Maghrib", nameBs: "Akšam", nameAr: "المغرب" },
  { id: "isha", nameDe: "Isha", nameBs: "Jacija", nameAr: "العشاء" },
];

// Adhan audio URL (using a public domain Adhan)
const ADHAN_AUDIO_URL = "/adhan.mp3";

export const usePrayerNotifications = (
  prayerTimes: DailyPrayerTimes | null,
  language: string,
  enabled: boolean,
  adhanEnabled: boolean
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const lastPlayedPrayer = useRef<string | null>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(ADHAN_AUDIO_URL);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
      audioRef.current.addEventListener("error", (e) => {
        console.error("Adhan audio error:", e);
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Request notification permissions
  const requestPermissions = useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const permission = await LocalNotifications.requestPermissions();
        return permission.display === "granted";
      } catch (error) {
        console.error("Error requesting notification permissions:", error);
        return false;
      }
    }
    
    // For web, check if Notification API is available
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    
    return false;
  }, []);

  // Play Adhan
  const playAdhan = useCallback(() => {
    if (audioRef.current && adhanEnabled) {
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Error playing Adhan:", error);
          setIsPlaying(false);
        });
    }
  }, [adhanEnabled]);

  // Stop Adhan
  const stopAdhan = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  // Show notification
  const showNotification = useCallback(async (prayer: PrayerInfo, time: string) => {
    const title = language === "bs" 
      ? `${prayer.nameBs} - ${prayer.nameAr}` 
      : `${prayer.nameDe} - ${prayer.nameAr}`;
    
    const body = language === "bs"
      ? `Vrijeme je za ${prayer.nameBs} namaz (${time})`
      : `Zeit für das ${prayer.nameDe} Gebet (${time})`;

    if (Capacitor.isNativePlatform()) {
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title,
              body,
              id: Date.now(),
              sound: "adhan.mp3",
              smallIcon: "ic_stat_icon",
              largeIcon: "ic_launcher",
              channelId: "prayer-times",
            },
          ],
        });
      } catch (error) {
        console.error("Error scheduling notification:", error);
      }
    } else if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        tag: `prayer-${prayer.id}`,
      });
    }
  }, [language]);

  // Create notification channel for Android
  useEffect(() => {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android") {
      LocalNotifications.createChannel({
        id: "prayer-times",
        name: "Gebetszeiten",
        description: "Benachrichtigungen für Gebetszeiten",
        importance: 5,
        visibility: 1,
        sound: "adhan.mp3",
        vibration: true,
      }).catch(console.error);
    }
  }, []);

  // Check prayer times and trigger notifications
  useEffect(() => {
    if (!enabled || !prayerTimes) return;

    const checkPrayerTime = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      PRAYERS.forEach((prayer) => {
        const prayerTime = prayerTimes[prayer.id as keyof DailyPrayerTimes];
        
        if (prayerTime === currentTime && lastPlayedPrayer.current !== `${prayer.id}-${currentTime}`) {
          lastPlayedPrayer.current = `${prayer.id}-${currentTime}`;
          
          // Play Adhan
          if (adhanEnabled) {
            playAdhan();
          }
          
          // Show notification
          showNotification(prayer, prayerTime);
        }
      });
    };

    // Check immediately
    checkPrayerTime();

    // Check every 10 seconds
    checkIntervalRef.current = setInterval(checkPrayerTime, 10000);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [enabled, adhanEnabled, prayerTimes, playAdhan, showNotification]);

  // Request permissions on mount if enabled
  useEffect(() => {
    if (enabled) {
      requestPermissions();
    }
  }, [enabled, requestPermissions]);

  return {
    isPlaying,
    playAdhan,
    stopAdhan,
    requestPermissions,
  };
};
