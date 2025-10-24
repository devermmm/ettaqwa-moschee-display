import { useState, useEffect } from "react";
import PrayerTimeCard from "@/components/PrayerTimeCard";
import CurrentTime from "@/components/CurrentTime";
import NextPrayerCountdown from "@/components/NextPrayerCountdown";
import logo from "@/assets/logo.png";

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
}

const Index = () => {
  const [currentPrayer, setCurrentPrayer] = useState(0);
  const [nextPrayer, setNextPrayer] = useState(0);

  // Mock prayer times - these would be fetched from freitagsgebet.com API
  const prayerTimes: PrayerTime[] = [
    { name: "Fajr", arabicName: "الفجر", time: "05:45" },
    { name: "Sonnenaufgang", arabicName: "الشروق", time: "07:15" },
    { name: "Dhuhr", arabicName: "الظهر", time: "12:30" },
    { name: "Asr", arabicName: "العصر", time: "15:45" },
    { name: "Maghrib", arabicName: "المغرب", time: "18:20" },
    { name: "Isha", arabicName: "العشاء", time: "19:50" },
  ];

  useEffect(() => {
    // Determine current and next prayer based on time
    const checkPrayers = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      let foundCurrent = -1;
      
      for (let i = prayerTimes.length - 1; i >= 0; i--) {
        const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
        const prayerTime = hours * 60 + minutes;
        
        if (currentTime >= prayerTime) {
          foundCurrent = i;
          break;
        }
      }
      
      // If no prayer found (before first prayer), current is last prayer of previous day
      if (foundCurrent === -1) {
        foundCurrent = prayerTimes.length - 1;
      }
      
      setCurrentPrayer(foundCurrent);
      
      // Next prayer is the one after current
      const nextPrayerIndex = (foundCurrent + 1) % prayerTimes.length;
      setNextPrayer(nextPrayerIndex);
    };

    checkPrayers();
    const interval = setInterval(checkPrayers, 1000); // Check every second for accuracy

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 p-3">
      <div className="h-full max-w-7xl mx-auto flex flex-col justify-between">
        {/* Header with Logo */}
        <header className="text-center py-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img 
              src={logo} 
              alt="Et-Taqwa Moschee Logo" 
              className="h-16 drop-shadow-lg"
            />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-primary font-inter leading-tight">
                Et-Taqwa Moschee
              </h1>
              <p className="text-xl text-primary font-amiri leading-tight">
                مسجد التقوى
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column */}
          <div className="space-y-3">
            {/* Current Time Display */}
            <div className="bg-card/50 backdrop-blur-sm rounded-xl shadow-elegant p-4 border border-border">
              <CurrentTime />
            </div>

            {/* Next Prayer Countdown */}
            <NextPrayerCountdown
              nextPrayerName={prayerTimes[nextPrayer].name}
              nextPrayerTime={prayerTimes[nextPrayer].time}
              nextPrayerArabic={prayerTimes[nextPrayer].arabicName}
            />

            {/* Current Prayer Highlight */}
            <div className="bg-primary text-primary-foreground p-4 rounded-xl shadow-elegant">
              <p className="text-sm font-inter opacity-90 text-center">Aktuelle Gebetszeit</p>
              <p className="text-lg font-amiri text-center mt-1">{prayerTimes[currentPrayer].arabicName}</p>
              <p className="text-2xl font-bold font-inter text-center">{prayerTimes[currentPrayer].name}</p>
              <p className="text-xl font-inter text-center mt-1">{prayerTimes[currentPrayer].time}</p>
            </div>
          </div>

          {/* Right Column - All Prayer Times */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-center mb-3 text-foreground font-inter">
              Alle Gebetszeiten
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {prayerTimes.map((prayer, index) => (
                <PrayerTimeCard
                  key={prayer.name}
                  name={prayer.name}
                  time={prayer.time}
                  arabicName={prayer.arabicName}
                  isActive={index === currentPrayer}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground font-inter text-xs py-2">
          <p>اللهم بارك لنا - Allah segne uns alle</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
