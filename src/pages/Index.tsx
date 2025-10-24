import { useState, useEffect } from "react";
import PrayerTimeCard from "@/components/PrayerTimeCard";
import CurrentTime from "@/components/CurrentTime";
import NextPrayerCountdown from "@/components/NextPrayerCountdown";
import BackgroundMusic from "@/components/BackgroundMusic";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
}

const Index = () => {
  const [currentPrayer, setCurrentPrayer] = useState(0);
  const [nextPrayer, setNextPrayer] = useState(0);

  // Prayer times for Vienna
  const prayerTimes: PrayerTime[] = [
    { name: "Fajr", arabicName: "الفجر", time: "05:45" },
    { name: "Sonnenaufgang", arabicName: "الشروق", time: "07:15" },
    { name: "Dhuhr", arabicName: "الظهر", time: "12:30" },
    { name: "Asr", arabicName: "العصر", time: "15:45" },
    { name: "Maghrib", arabicName: "المغرب", time: "18:20" },
    { name: "Isha", arabicName: "العشاء", time: "19:50" },
  ];

  // Jummah (Friday Prayer) times
  const jummahTimes = [
    { time: "12:30", label: "1. Khutbah" },
    { time: "13:30", label: "2. Khutbah" },
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
      <BackgroundMusic />
      
      <div className="h-full max-w-7xl mx-auto flex flex-col">
        {/* Header with Logo */}
        <header className="text-center py-2 border-b border-border/30">
          <div className="flex items-center justify-center gap-3">
            <img 
              src={logo} 
              alt="Et-Taqwa Moschee Logo" 
              className="h-14 drop-shadow-lg"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold text-primary font-inter leading-tight">
                Et-Taqwa Moschee
              </h1>
              <p className="text-lg text-primary font-amiri leading-tight">
                مسجد التقوى - Wien
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 py-3 overflow-hidden">
          {/* Left Column - Time & Next Prayer */}
          <div className="lg:col-span-4 space-y-3">
            {/* Current Time Display */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
              <CurrentTime />
            </Card>

            {/* Next Prayer Countdown */}
            <NextPrayerCountdown
              nextPrayerName={prayerTimes[nextPrayer].name}
              nextPrayerTime={prayerTimes[nextPrayer].time}
              nextPrayerArabic={prayerTimes[nextPrayer].arabicName}
            />

            {/* Current Prayer Highlight */}
            <Card className="p-4 bg-primary text-primary-foreground border-2 border-primary-glow">
              <p className="text-xs font-inter opacity-90 text-center uppercase tracking-wide">Aktuelle Gebetszeit</p>
              <p className="text-xl font-amiri text-center mt-2">{prayerTimes[currentPrayer].arabicName}</p>
              <p className="text-2xl font-bold font-inter text-center">{prayerTimes[currentPrayer].name}</p>
              <p className="text-3xl font-bold font-inter text-center mt-1">{prayerTimes[currentPrayer].time}</p>
            </Card>

            {/* Jummah Times */}
            <Card className="p-4 bg-accent text-accent-foreground border-2 border-accent">
              <div className="text-center">
                <h3 className="text-lg font-bold font-inter mb-2">Jummah / Freitagsgebet</h3>
                <p className="text-2xl font-amiri mb-3">صلاة الجمعة</p>
                <div className="space-y-2">
                  {jummahTimes.map((jummah, idx) => (
                    <div key={idx} className="bg-accent-foreground/10 rounded-lg p-2">
                      <p className="text-sm font-inter">{jummah.label}</p>
                      <p className="text-2xl font-bold font-inter">{jummah.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - All Prayer Times */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold text-center mb-3 text-foreground font-inter">
              Gebetszeiten Wien
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
            
            {/* Info Section */}
            <div className="mt-4 text-center">
              <Card className="p-3 bg-muted/50 border border-border/50">
                <p className="text-sm text-muted-foreground font-amiri">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </p>
                <p className="text-xs text-muted-foreground font-inter mt-1">
                  Im Namen Allahs, des Allerbarmers, des Barmherzigen
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground font-inter text-xs py-2 border-t border-border/30">
          <p>اللهم بارك لنا - Allah segne uns alle</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
