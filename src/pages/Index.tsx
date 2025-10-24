import { useState, useEffect } from "react";
import PrayerTimeCard from "@/components/PrayerTimeCard";
import CurrentTime from "@/components/CurrentTime";
import NextPrayerCountdown from "@/components/NextPrayerCountdown";
import BackgroundMusic from "@/components/BackgroundMusic";
import QuranTextDisplay from "@/components/QuranTextDisplay";
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
  const [currentSurahNumber, setCurrentSurahNumber] = useState(1);
  const [currentSurahName, setCurrentSurahName] = useState("Al-Fatihah");
  const [currentSurahArabicName, setCurrentSurahArabicName] = useState("الفاتحة");

  const isFriday = () => {
    const now = new Date();
    return now.getDay() === 5; // 5 = Friday
  };

  // Prayer times for Vienna - replace Dhuhr with Jummah on Fridays
  const basePrayerTimes: PrayerTime[] = [
    { name: "Fajr", arabicName: "الفجر", time: "06:01" },
    { name: "Sonnenaufgang", arabicName: "الشروق", time: "07:27" },
    { name: "Dhuhr", arabicName: "الظهر", time: "12:30" },
    { name: "Asr", arabicName: "العصر", time: "15:25" },
    { name: "Maghrib", arabicName: "المغرب", time: "17:50" },
    { name: "Isha", arabicName: "العشاء", time: "19:23" },
  ];

  // On Fridays, replace Dhuhr with Jummah
  const prayerTimes: PrayerTime[] = isFriday()
    ? basePrayerTimes.map(prayer => 
        prayer.name === "Dhuhr" 
          ? { name: "Dschuma", arabicName: "الجمعة", time: "13:00" }
          : prayer
      )
    : basePrayerTimes;

  // Jummah (Friday Prayer) time for the card
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
    <div className="h-screen overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      <BackgroundMusic 
        onSurahChange={(surahNumber, surahName, surahArabicName) => {
          setCurrentSurahNumber(surahNumber);
          setCurrentSurahName(surahName);
          setCurrentSurahArabicName(surahArabicName);
        }}
      />
      
      <div className="h-full max-w-[1920px] mx-auto flex flex-col">
        {/* Header with Logo */}
        <header className="text-center py-4 border-b-2 border-border/30">
          <div className="flex items-center justify-center gap-6">
            <img 
              src={logo} 
              alt="Et-Taqwa Moschee Logo" 
              className="h-20 drop-shadow-lg"
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold text-primary font-inter leading-tight">
                Et-Taqwa Moschee
              </h1>
              <p className="text-2xl text-primary font-amiri leading-tight">
                مسجد التقوى - Wien
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 py-6 overflow-hidden">
          {/* Left Column - Quran Text Display */}
          <div className="lg:col-span-5 h-full overflow-hidden">
            <QuranTextDisplay
              surahNumber={currentSurahNumber}
              surahName={currentSurahName}
              surahArabicName={currentSurahArabicName}
            />
          </div>

          {/* Middle Column - Time & Info */}
          <div className="lg:col-span-3 space-y-5">
            {/* Current Time Display */}
            <Card className="p-6 bg-card border-2 border-primary/30 shadow-lg">
              <CurrentTime />
            </Card>

            {/* Next Prayer Countdown - Most Important */}
            <div className="bg-gradient-to-br from-accent via-accent to-primary p-8 rounded-xl shadow-xl border-2 border-accent">
              <div className="text-center text-accent-foreground space-y-4">
                <div>
                  <p className="text-lg font-inter opacity-90 uppercase tracking-wider">Nächstes Gebet</p>
                  <h2 className="text-4xl font-bold font-inter mt-2">{prayerTimes[nextPrayer].name}</h2>
                  <p className="text-3xl font-amiri mt-2">{prayerTimes[nextPrayer].arabicName}</p>
                </div>
                
                <NextPrayerCountdown
                  nextPrayerName={prayerTimes[nextPrayer].name}
                  nextPrayerTime={prayerTimes[nextPrayer].time}
                  nextPrayerArabic={prayerTimes[nextPrayer].arabicName}
                />

                <div className="pt-3">
                  <p className="text-3xl font-bold font-inter">um {prayerTimes[nextPrayer].time} Uhr</p>
                </div>
              </div>
            </div>

            {/* Jummah Time */}
            <Card className="p-6 bg-primary text-primary-foreground border-2 border-primary-glow shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold font-inter mb-3 uppercase tracking-wide">Freitagsgebet</h3>
                <p className="text-3xl font-amiri mb-4">صلاة الجمعة</p>
                <div className="bg-primary-foreground/20 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-5xl font-bold font-inter">{jummahTime}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - All Prayer Times */}
          <div className="lg:col-span-4">
            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border h-full flex flex-col">
              <h2 className="text-3xl font-bold text-center mb-6 text-foreground font-inter uppercase tracking-wide">
                Gebetszeiten Wien
              </h2>
              <div className="grid grid-cols-2 gap-5 flex-1">
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
              <div className="mt-6">
                <Card className="p-5 bg-gradient-to-r from-muted/30 to-muted/50 border border-border/50">
                  <p className="text-2xl text-center text-foreground font-amiri leading-relaxed">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                  </p>
                  <p className="text-base text-center text-muted-foreground font-inter mt-3">
                    Im Namen Allahs, des Allerbarmers, des Barmherzigen
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground font-inter text-sm py-3 border-t-2 border-border/30 space-y-1">
          <p className="text-base">اللهم بارك لنا - Allah segne uns alle</p>
          <p className="text-xs">
            Developed by{" "}
            <a 
              href="https://deverm.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="story-link font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              DEVERM
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
