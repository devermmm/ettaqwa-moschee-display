import { Card } from "@/components/ui/card";

interface PrayerTimeCardProps {
  name: string;
  time: string;
  isActive?: boolean;
  arabicName?: string;
}

const PrayerTimeCard = ({ name, time, isActive, arabicName }: PrayerTimeCardProps) => {
  return (
    <Card className={`p-6 transition-all duration-300 ${
      isActive 
        ? "bg-primary text-primary-foreground shadow-xl scale-105 border-primary" 
        : "bg-card hover:shadow-md"
    }`}>
      <div className="flex flex-col items-center space-y-2">
        {arabicName && (
          <p className={`text-lg font-amiri ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}>
            {arabicName}
          </p>
        )}
        <h3 className={`text-2xl font-semibold font-inter ${isActive ? "text-primary-foreground" : "text-foreground"}`}>
          {name}
        </h3>
        <p className={`text-4xl font-bold font-inter ${isActive ? "text-primary-foreground" : "text-primary"}`}>
          {time}
        </p>
      </div>
    </Card>
  );
};

export default PrayerTimeCard;
