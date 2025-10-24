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
    <div className="text-center">
      <p className="text-[10px] md:text-xs font-inter opacity-90 uppercase tracking-wider mb-1">Zeit verbleibend</p>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter tracking-wider">
        {timeLeft}
      </div>
    </div>
  );
};

export default NextPrayerCountdown;
