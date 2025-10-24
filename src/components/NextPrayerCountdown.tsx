import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface NextPrayerCountdownProps {
  nextPrayerName: string;
  nextPrayerTime: string;
  nextPrayerArabic: string;
}

const NextPrayerCountdown = ({ nextPrayerName, nextPrayerTime, nextPrayerArabic }: NextPrayerCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const [hours, minutes] = nextPrayerTime.split(':').map(Number);
      
      let target = new Date();
      target.setHours(hours, minutes, 0, 0);
      
      // If target time is earlier than now, it means it's tomorrow
      if (target < now) {
        target.setDate(target.getDate() + 1);
      }
      
      const diff = target.getTime() - now.getTime();
      
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [nextPrayerTime]);

  return (
    <Card className="p-8 bg-gradient-to-br from-accent to-primary text-accent-foreground shadow-elegant">
      <div className="text-center space-y-4">
        <div>
          <p className="text-lg font-inter opacity-90">Nächstes Gebet</p>
          <h2 className="text-4xl font-bold font-inter mt-2">{nextPrayerName}</h2>
          <p className="text-2xl font-amiri mt-1">{nextPrayerArabic}</p>
        </div>
        
        <div className="py-4">
          <p className="text-lg font-inter opacity-90 mb-2">Zeit bis zum Gebet</p>
          <div className="text-6xl font-bold font-inter tracking-wider">
            {timeLeft}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-2xl font-inter">Gebetszeit: {nextPrayerTime}</p>
        </div>
      </div>
    </Card>
  );
};

export default NextPrayerCountdown;
