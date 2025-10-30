import { useState, useEffect } from "react";
import PrayerTimeCard from "@/components/PrayerTimeCard";
import CurrentTime from "@/components/CurrentTime";
import NextPrayerCountdown from "@/components/NextPrayerCountdown";
import BackgroundMusic from "@/components/BackgroundMusic";
import QuranTextDisplay from "@/components/QuranTextDisplay";
import ProgressBar from "@/components/ProgressBar";
import AdvertisementSlide from "@/components/AdvertisementSlide";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import mosqueInterior from "@/assets/mosque-interior.png";

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
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  
  // Slideshow state
  const [showAdvertisement, setShowAdvertisement] = useState(false);
  const [progress, setProgress] = useState(0);

  const isFriday = () => {
    const now = new Date();
    return now.getDay() === 5; // 5 = Friday
  };

  // Prayer times for Vienna - replace Dhuhr with Jummah on Fridays
  const basePrayerTimes: PrayerTime[] = [
    { name: "Fajr", arabicName: "الفجر", time: "05:05" },
    { name: "Sonnenaufgang", arabicName: "الشروق", time: "06:32" },
    { name: "Dhuhr", arabicName: "الظهر", time: "11:44" },
    { name: "Asr", arabicName: "العصر", time: "14:21" },
    { name: "Maghrib", arabicName: "المغرب", time: "16:45" },
    { name: "Isha", arabicName: "العشاء", time: "18:18" },
  ];

  // On Fridays, replace Dhuhr with Jummah
  const prayerTimes: PrayerTime[] = isFriday()
    ? basePrayerTimes.map(prayer => 
        prayer.name === "Dhuhr" 
          ? { name: "Dschuma", arabicName: "الجمعة", time: "12:15" }
          : prayer
      )
    : basePrayerTimes;

  // Jummah (Friday Prayer) time for the card
  const jummahTime = "12:15";

  // Slideshow timer (30 seconds prayer times, then advertisement)
  useEffect(() => {
    const PRAYER_DURATION = 30000; // 30 seconds
    const AD_DURATION = 20000; // 20 seconds for advertisement
    const PROGRESS_INTERVAL = 100; // Update every 100ms for smooth progress
    
    let progressInterval: NodeJS.Timeout;
    let slideInterval: NodeJS.Timeout;
    let startTime = Date.now();
    let currentDuration = PRAYER_DURATION;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / currentDuration) * 100;
      
      if (newProgress >= 100) {
        setProgress(100);
        // Switch slides
        setShowAdvertisement(prev => {
          const nextShow = !prev;
          startTime = Date.now();
          currentDuration = nextShow ? AD_DURATION : PRAYER_DURATION;
          setProgress(0);
          return nextShow;
        });
      } else {
        setProgress(newProgress);
      }
    };
    
    progressInterval = setInterval(updateProgress, PROGRESS_INTERVAL);
    
    return () => {
      clearInterval(progressInterval);
      if (slideInterval) clearInterval(slideInterval);
    };
  }, []);

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
    <div className="min-h-screen overflow-y-auto relative p-2 md:p-3 lg:h-screen lg:overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${mosqueInterior})` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-background/95 via-background/90 to-secondary/80" />
      {/* Progress Bar */}
      <ProgressBar progress={progress} />
      
      {/* Advertisement Overlay */}
      {showAdvertisement && <AdvertisementSlide />}
      
      <BackgroundMusic
        onSurahChange={(surahNumber, surahName, surahArabicName) => {
          setCurrentSurahNumber(surahNumber);
          setCurrentSurahName(surahName);
          setCurrentSurahArabicName(surahArabicName);
          setCurrentVerseIndex(0);
        }}
        onVerseChange={(verseIndex) => {
          setCurrentVerseIndex(verseIndex);
        }}
      />
      
      <div className="h-full max-w-[1920px] mx-auto flex flex-col relative z-10">
        {/* Header with Logo */}
        <header className="text-center py-2 md:py-3 border-b border-border/30">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <img 
              src={logo} 
              alt="Et-Taqwa Moschee Logo" 
              className="h-10 md:h-12 lg:h-16 drop-shadow-lg"
            />
            <div className="text-left">
              <h1 className="text-base md:text-lg lg:text-2xl font-bold text-primary font-inter leading-tight">
                Et-Taqwa Moschee
              </h1>
              <p className="text-sm md:text-base lg:text-xl text-primary font-amiri leading-tight">
                مسجد التقوى - Wien
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-3 md:gap-4 py-3 md:py-4 lg:overflow-hidden">
          {/* Left Column - Prayer Times */}
          <div className="lg:col-span-4">
            <div className="bg-card/30 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-border h-full">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-center mb-3 md:mb-4 text-foreground font-inter uppercase tracking-wide">
                Gebetszeiten Wien
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 md:gap-3">
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
              <div className="mt-3 md:mt-4">
                <Card className="p-3 md:p-4 bg-gradient-to-r from-muted/30 to-muted/50 border border-border/50">
                  <p className="text-base md:text-lg lg:text-xl text-center text-foreground font-amiri">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                  </p>
                  <p className="text-xs md:text-sm text-center text-muted-foreground font-inter mt-2">
                    Im Namen Allahs, des Allerbarmers, des Barmherzigen
                  </p>
                </Card>
              </div>
            </div>
          </div>

          {/* Center Column - Main Focus: Time & Next Prayer */}
          <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
            {/* Current Time Display */}
            <Card className="p-4 md:p-5 lg:p-8 bg-card border-2 border-primary/30 shadow-lg">
              <CurrentTime />
            </Card>

            {/* Next Prayer Countdown - Most Important */}
            <div className="bg-gradient-to-br from-accent via-accent to-primary p-5 md:p-6 lg:p-8 rounded-xl shadow-xl border-2 border-accent">
              <div className="text-center text-accent-foreground space-y-3 md:space-y-4">
                <div>
                  <p className="text-sm md:text-base font-inter opacity-90 uppercase tracking-wider">Nächstes Gebet</p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-inter mt-2">{prayerTimes[nextPrayer].name}</h2>
                  <p className="text-lg md:text-xl lg:text-2xl font-amiri mt-2">{prayerTimes[nextPrayer].arabicName}</p>
                </div>
                
                <NextPrayerCountdown
                  nextPrayerName={prayerTimes[nextPrayer].name}
                  nextPrayerTime={prayerTimes[nextPrayer].time}
                  nextPrayerArabic={prayerTimes[nextPrayer].arabicName}
                />

                <div className="pt-3">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold font-inter">um {prayerTimes[nextPrayer].time} Uhr</p>
                </div>
              </div>
            </div>

            {/* Jummah Time - Only show on Fridays before 13:00 */}
            {isFriday() && new Date().getHours() < 13 && (
              <Card className="p-4 md:p-5 bg-primary text-primary-foreground border-2 border-primary-glow shadow-lg">
                <div className="text-center">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold font-inter mb-2 uppercase tracking-wide">Freitagsgebet</h3>
                  <p className="text-xl md:text-2xl lg:text-3xl font-amiri mb-3">صلاة الجمعة</p>
                  <div className="bg-primary-foreground/20 rounded-lg p-3 md:p-4 backdrop-blur-sm">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter">{jummahTime}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Quran Text Display (hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-4 h-full overflow-hidden">
            <QuranTextDisplay
              surahNumber={currentSurahNumber}
              surahName={currentSurahName}
              surahArabicName={currentSurahArabicName}
              currentVerseIndex={currentVerseIndex}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground font-inter text-xs py-2 border-t border-border/30 space-y-1">
          <p className="text-[10px] md:text-xs">اللهم بارك لنا - Allah segne uns alle</p>
          <p className="text-[9px] md:text-[10px]">
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
