import { useState, useEffect } from "react";
import PrayerTimeCard from "@/components/PrayerTimeCard";
import CurrentTime from "@/components/CurrentTime";
import logo from "@/assets/logo.png";

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
}

const Index = () => {
  const [currentPrayer, setCurrentPrayer] = useState(0);

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
    // Determine current prayer based on time
    const checkCurrentPrayer = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      for (let i = prayerTimes.length - 1; i >= 0; i--) {
        const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
        const prayerTime = hours * 60 + minutes;
        
        if (currentTime >= prayerTime) {
          setCurrentPrayer(i);
          return;
        }
      }
      setCurrentPrayer(0);
    };

    checkCurrentPrayer();
    const interval = setInterval(checkCurrentPrayer, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header with Logo */}
        <header className="text-center space-y-6 py-8">
          <img 
            src={logo} 
            alt="Et-Taqwa Moschee Logo" 
            className="h-32 mx-auto drop-shadow-lg"
          />
          <div>
            <h1 className="text-5xl font-bold text-primary font-inter mb-2">
              Et-Taqwa Moschee
            </h1>
            <p className="text-3xl text-primary font-amiri">
              مسجد التقوى
            </p>
            <p className="text-xl text-muted-foreground font-inter mt-4">
              Bosnische Moschee Wien
            </p>
          </div>
        </header>

        {/* Current Time Display */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-elegant p-8 border border-border">
          <CurrentTime />
        </div>

        {/* Prayer Times Grid */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground font-inter">
            Gebetszeiten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <footer className="text-center text-muted-foreground font-inter text-sm py-6">
          <p>Gebetszeiten für Wien</p>
          <p className="mt-2">Allah segne uns alle</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
