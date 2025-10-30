import Navbar from "@/components/Navbar";
import PrayerTimes from "./PrayerTimes";

const PrayerTimesLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PrayerTimes />
      </div>
    </div>
  );
};

export default PrayerTimesLayout;
