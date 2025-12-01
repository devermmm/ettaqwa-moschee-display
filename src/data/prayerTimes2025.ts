// Prayer times data from Vaktija-Wien-2025.pdf
// Format: { month: { day: { fajr, sunrise, dhuhr, asr, maghrib, isha } } }

export interface DailyPrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export const prayerTimes2025: Record<number, Record<number, DailyPrayerTimes>> = {
  // January
  1: {
    1: { fajr: "5:51", sunrise: "7:38", dhuhr: "12:03", asr: "13:57", maghrib: "16:17", isha: "17:52" },
    2: { fajr: "5:52", sunrise: "7:38", dhuhr: "12:04", asr: "13:59", maghrib: "16:19", isha: "17:54" },
    3: { fajr: "5:52", sunrise: "7:38", dhuhr: "12:04", asr: "13:59", maghrib: "16:19", isha: "17:54" },
    10: { fajr: "5:51", sunrise: "7:36", dhuhr: "12:07", asr: "14:06", maghrib: "16:27", isha: "18:00" },
    17: { fajr: "5:48", sunrise: "7:32", dhuhr: "12:09", asr: "14:14", maghrib: "16:37", isha: "18:08" },
    24: { fajr: "5:44", sunrise: "7:26", dhuhr: "12:12", asr: "14:22", maghrib: "16:47", isha: "18:17" },
    31: { fajr: "5:38", sunrise: "7:19", dhuhr: "12:14", asr: "14:31", maghrib: "16:58", isha: "18:27" },
  },
  // December (main focus for current date)
  12: {
    1: { fajr: "5:31", sunrise: "7:16", dhuhr: "11:48", asr: "13:49", maghrib: "16:10", isha: "17:43" },
    2: { fajr: "5:32", sunrise: "7:18", dhuhr: "11:49", asr: "13:48", maghrib: "16:10", isha: "17:43" },
    3: { fajr: "5:33", sunrise: "7:19", dhuhr: "11:49", asr: "13:48", maghrib: "16:09", isha: "17:43" },
    4: { fajr: "5:34", sunrise: "7:20", dhuhr: "11:50", asr: "13:48", maghrib: "16:09", isha: "17:42" },
    5: { fajr: "5:35", sunrise: "7:21", dhuhr: "11:50", asr: "13:47", maghrib: "16:09", isha: "17:42" },
    6: { fajr: "5:36", sunrise: "7:22", dhuhr: "11:50", asr: "13:47", maghrib: "16:08", isha: "17:42" },
    7: { fajr: "5:37", sunrise: "7:23", dhuhr: "11:51", asr: "13:47", maghrib: "16:08", isha: "17:42" },
    8: { fajr: "5:38", sunrise: "7:24", dhuhr: "11:51", asr: "13:47", maghrib: "16:08", isha: "17:42" },
    9: { fajr: "5:39", sunrise: "7:26", dhuhr: "11:52", asr: "13:47", maghrib: "16:08", isha: "17:42" },
    10: { fajr: "5:40", sunrise: "7:27", dhuhr: "11:52", asr: "13:47", maghrib: "16:08", isha: "17:42" },
    11: { fajr: "5:41", sunrise: "7:28", dhuhr: "11:53", asr: "13:47", maghrib: "16:07", isha: "17:42" },
    12: { fajr: "5:42", sunrise: "7:28", dhuhr: "11:53", asr: "13:47", maghrib: "16:07", isha: "17:42" },
    13: { fajr: "5:42", sunrise: "7:29", dhuhr: "11:53", asr: "13:47", maghrib: "16:07", isha: "17:42" },
    14: { fajr: "5:43", sunrise: "7:30", dhuhr: "11:54", asr: "13:47", maghrib: "16:08", isha: "17:42" },
    15: { fajr: "5:44", sunrise: "7:31", dhuhr: "11:54", asr: "13:48", maghrib: "16:08", isha: "17:42" },
    16: { fajr: "5:45", sunrise: "7:32", dhuhr: "11:55", asr: "13:48", maghrib: "16:08", isha: "17:43" },
    17: { fajr: "5:45", sunrise: "7:33", dhuhr: "11:55", asr: "13:48", maghrib: "16:08", isha: "17:43" },
    18: { fajr: "5:46", sunrise: "7:33", dhuhr: "11:56", asr: "13:48", maghrib: "16:08", isha: "17:43" },
    19: { fajr: "5:46", sunrise: "7:34", dhuhr: "11:56", asr: "13:49", maghrib: "16:09", isha: "17:44" },
    20: { fajr: "5:47", sunrise: "7:35", dhuhr: "11:57", asr: "13:49", maghrib: "16:09", isha: "17:44" },
    21: { fajr: "5:48", sunrise: "7:35", dhuhr: "11:57", asr: "13:50", maghrib: "16:09", isha: "17:44" },
    22: { fajr: "5:48", sunrise: "7:36", dhuhr: "11:58", asr: "13:50", maghrib: "16:10", isha: "17:45" },
    23: { fajr: "5:49", sunrise: "7:36", dhuhr: "11:58", asr: "13:51", maghrib: "16:10", isha: "17:45" },
    24: { fajr: "5:49", sunrise: "7:37", dhuhr: "11:59", asr: "13:51", maghrib: "16:11", isha: "17:46" },
    25: { fajr: "5:49", sunrise: "7:37", dhuhr: "11:59", asr: "13:52", maghrib: "16:12", isha: "17:47" },
    26: { fajr: "5:50", sunrise: "7:37", dhuhr: "12:00", asr: "13:52", maghrib: "16:12", isha: "17:47" },
    27: { fajr: "5:50", sunrise: "7:38", dhuhr: "12:00", asr: "13:53", maghrib: "16:13", isha: "17:48" },
    28: { fajr: "5:51", sunrise: "7:38", dhuhr: "12:01", asr: "13:54", maghrib: "16:14", isha: "17:49" },
    29: { fajr: "5:51", sunrise: "7:38", dhuhr: "12:01", asr: "13:54", maghrib: "16:14", isha: "17:49" },
    30: { fajr: "5:51", sunrise: "7:38", dhuhr: "12:02", asr: "13:55", maghrib: "16:15", isha: "17:50" },
    31: { fajr: "5:51", sunrise: "7:38", dhuhr: "12:02", asr: "13:56", maghrib: "16:16", isha: "17:51" },
  },
};

export const getPrayerTimesForDate = (date: Date): DailyPrayerTimes => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Try to get exact date
  if (prayerTimes2025[month]?.[day]) {
    return prayerTimes2025[month][day];
  }
  
  // Fallback to nearest available date in the month
  const monthData = prayerTimes2025[month];
  if (monthData) {
    const availableDays = Object.keys(monthData).map(Number).sort((a, b) => a - b);
    let closestDay = availableDays[0];
    for (const d of availableDays) {
      if (d <= day) closestDay = d;
      else break;
    }
    return monthData[closestDay];
  }
  
  // Ultimate fallback - December 1st
  return prayerTimes2025[12][1];
};
