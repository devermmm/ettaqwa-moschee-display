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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Logo */}
        <header className="text-center space-y-4 py-6">
          <img 
            src={logo} 
            alt="Et-Taqwa Moschee Logo" 
            className="h-24 md:h-32 mx-auto drop-shadow-lg"
          />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-inter mb-2">
              Et-Taqwa Moschee
            </h1>
            <p className="text-2xl md:text-3xl text-primary font-amiri">
              مسجد التقوى
            </p>
            <p className="text-lg md:text-xl text-muted-foreground font-inter mt-3">
              Bosnische Moschee Wien
            </p>
          </div>
        </header>

        {/* Current Time Display */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-elegant p-6 md:p-8 border border-border">
          <CurrentTime />
        </div>

        {/* Next Prayer Countdown */}
        <NextPrayerCountdown
          nextPrayerName={prayerTimes[nextPrayer].name}
          nextPrayerTime={prayerTimes[nextPrayer].time}
          nextPrayerArabic={prayerTimes[nextPrayer].arabicName}
        />

        {/* Current Prayer Highlight */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-inter mb-4">
            Aktuelle Gebetszeit
          </h2>
          <div className="inline-block">
            <div className="bg-primary text-primary-foreground px-8 py-4 rounded-xl shadow-elegant">
              <p className="text-xl font-amiri mb-2">{prayerTimes[currentPrayer].arabicName}</p>
              <p className="text-3xl font-bold font-inter">{prayerTimes[currentPrayer].name}</p>
              <p className="text-2xl font-inter mt-2">{prayerTimes[currentPrayer].time}</p>
            </div>
          </div>
        </div>

        {/* All Prayer Times Grid */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-foreground font-inter">
            Alle Gebetszeiten
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

        {/* Footer */}
        <footer className="text-center text-muted-foreground font-inter text-sm py-6 border-t border-border mt-8">
          <p>Gebetszeiten für Wien</p>
          <p className="mt-2">اللهم بارك لنا - Allah segne uns alle</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
