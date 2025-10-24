import { Card } from "@/components/ui/card";

interface PrayerTimeCardProps {
  name: string;
  time: string;
  isActive?: boolean;
  isPast?: boolean;
  isNext?: boolean;
  arabicName?: string;
}

const PrayerTimeCard = ({ name, time, isActive, isPast, isNext, arabicName }: PrayerTimeCardProps) => {
  return (
    <Card className={`p-4 transition-all duration-300 ${
      isNext
        ? "bg-accent text-accent-foreground shadow-xl scale-105 border-2 border-accent ring-2 ring-accent/50" 
        : isPast
        ? "bg-muted/50 opacity-60 border border-border"
        : "bg-card border border-border"
    }`}>
      <div className="flex flex-col items-center space-y-1">
        {isNext && (
          <div className="w-full text-center mb-1">
            <span className="inline-block bg-accent-foreground text-accent text-xs font-bold px-3 py-1 rounded-full font-inter uppercase">
              Nächstes
            </span>
          </div>
        )}
        {arabicName && (
          <p className={`text-base font-amiri ${
            isNext ? "text-accent-foreground" : 
            isPast ? "text-muted-foreground/60" : 
            "text-muted-foreground"
          }`}>
            {arabicName}
          </p>
        )}
        <h3 className={`text-lg font-semibold font-inter ${
          isNext ? "text-accent-foreground" : 
          isPast ? "text-muted-foreground" : 
          "text-foreground"
        }`}>
          {name}
        </h3>
        <p className={`text-3xl font-bold font-inter ${
          isNext ? "text-accent-foreground" : 
          isPast ? "text-muted-foreground" : 
          "text-primary"
        }`}>
          {time}
        </p>
      </div>
    </Card>
  );
};

export default PrayerTimeCard;
