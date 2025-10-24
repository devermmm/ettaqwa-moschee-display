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

  // Jummah (Friday Prayer) time
  const jummahTime = "13:00";

  useEffect(() => {
    // Determine current and next prayer based on time
    const checkPrayers = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      let foundNext = 0;
      
      // Find the next prayer
      for (let i = 0; i < prayerTimes.length; i++) {
        const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
        const prayerTime = hours * 60 + minutes;
        
        if (currentTime < prayerTime) {
          foundNext = i;
          break;
        }
      }
      
      // If no prayer found (after last prayer), next is first prayer of next day
      if (foundNext === 0 && currentTime >= 0) {
        const [lastHours, lastMinutes] = prayerTimes[prayerTimes.length - 1].time.split(':').map(Number);
        const lastPrayerTime = lastHours * 60 + lastMinutes;
        if (currentTime >= lastPrayerTime) {
          foundNext = 0; // Next prayer is Fajr tomorrow
        }
      }
      
      setNextPrayer(foundNext);
      
      // Current prayer is the one before next, or last if next is first
      const currentIndex = foundNext === 0 ? prayerTimes.length - 1 : foundNext - 1;
      setCurrentPrayer(currentIndex);
    };

    checkPrayers();
    const interval = setInterval(checkPrayers, 1000);

    return () => clearInterval(interval);
  }, []);

  const isPrayerPast = (index: number) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [hours, minutes] = prayerTimes[index].time.split(':').map(Number);
    const prayerTime = hours * 60 + minutes;
    return currentTime > prayerTime;
  };

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
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 py-4 overflow-hidden">
          {/* Left Column - Time & Info */}
          <div className="lg:col-span-4 space-y-3">
            {/* Current Time Display */}
            <Card className="p-5 bg-card border-2 border-primary/30 shadow-lg">
              <CurrentTime />
            </Card>

            {/* Next Prayer Countdown - Most Important */}
            <div className="bg-gradient-to-br from-accent via-accent to-primary p-6 rounded-xl shadow-xl border-2 border-accent">
              <div className="text-center text-accent-foreground space-y-3">
                <div>
                  <p className="text-sm font-inter opacity-90 uppercase tracking-wider">Nächstes Gebet</p>
                  <h2 className="text-3xl font-bold font-inter mt-1">{prayerTimes[nextPrayer].name}</h2>
                  <p className="text-xl font-amiri mt-1">{prayerTimes[nextPrayer].arabicName}</p>
                </div>
                
                <NextPrayerCountdown
                  nextPrayerName={prayerTimes[nextPrayer].name}
                  nextPrayerTime={prayerTimes[nextPrayer].time}
                  nextPrayerArabic={prayerTimes[nextPrayer].arabicName}
                />

                <div className="pt-2">
                  <p className="text-2xl font-bold font-inter">um {prayerTimes[nextPrayer].time} Uhr</p>
                </div>
              </div>
            </div>

            {/* Jummah Time */}
            <Card className="p-4 bg-primary text-primary-foreground border-2 border-primary-glow shadow-lg">
              <div className="text-center">
                <h3 className="text-xl font-bold font-inter mb-2 uppercase tracking-wide">Freitagsgebet</h3>
                <p className="text-2xl font-amiri mb-3">صلاة الجمعة</p>
                <div className="bg-primary-foreground/20 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-4xl font-bold font-inter">{jummahTime}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - All Prayer Times */}
          <div className="lg:col-span-8">
            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border">
              <h2 className="text-2xl font-bold text-center mb-4 text-foreground font-inter uppercase tracking-wide">
                Gebetszeiten Wien
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {prayerTimes.map((prayer, index) => (
                  <PrayerTimeCard
                    key={prayer.name}
                    name={prayer.name}
                    time={prayer.time}
                    arabicName={prayer.arabicName}
                    isNext={index === nextPrayer}
                    isPast={isPrayerPast(index)}
                  />
                ))}
              </div>
              
              {/* Basmala Section */}
              <div className="mt-4">
                <Card className="p-4 bg-gradient-to-r from-muted/30 to-muted/50 border border-border/50">
                  <p className="text-xl text-center text-foreground font-amiri">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                  </p>
                  <p className="text-sm text-center text-muted-foreground font-inter mt-2">
                    Im Namen Allahs, des Allerbarmers, des Barmherzigen
                  </p>
                </Card>
              </div>
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
