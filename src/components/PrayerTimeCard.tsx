import { Card } from "@/components/ui/card";

interface PrayerTimeCardProps {
  name: string;
  time: string;
  isActive?: boolean;
  arabicName?: string;
}

const PrayerTimeCard = ({ name, time, isActive, arabicName }: PrayerTimeCardProps) => {
  return (
    <Card className={`p-3 transition-all duration-300 ${
      isActive 
        ? "bg-primary text-primary-foreground shadow-xl scale-105 border-2 border-primary-glow" 
        : "bg-card hover:shadow-md border border-border"
    }`}>
      <div className="flex flex-col items-center space-y-1">
        {isActive && (
          <div className="w-full text-center mb-1">
            <span className="inline-block bg-primary-foreground text-primary text-xs font-bold px-2 py-0.5 rounded-full font-inter">
              JETZT
            </span>
          </div>
        )}
        {arabicName && (
          <p className={`text-sm font-amiri ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}>
            {arabicName}
          </p>
        )}
        <h3 className={`text-base font-semibold font-inter ${isActive ? "text-primary-foreground" : "text-foreground"}`}>
          {name}
        </h3>
        <p className={`text-2xl font-bold font-inter ${isActive ? "text-primary-foreground" : "text-primary"}`}>
          {time}
        </p>
      </div>
    </Card>
  );
};

export default PrayerTimeCard;
