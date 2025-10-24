import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

// Complete Quran Surahs with Mishary Rashid Alafasy recitation
const surahs = [{
  number: 1,
  name: "Al-Fatihah",
  arabicName: "الفاتحة",
  url: "https://server8.mp3quran.net/afs/001.mp3"
}, {
  number: 2,
  name: "Al-Baqarah",
  arabicName: "البقرة",
  url: "https://server8.mp3quran.net/afs/002.mp3"
}, {
  number: 3,
  name: "Ali 'Imran",
  arabicName: "آل عمران",
  url: "https://server8.mp3quran.net/afs/003.mp3"
}, {
  number: 4,
  name: "An-Nisa",
  arabicName: "النساء",
  url: "https://server8.mp3quran.net/afs/004.mp3"
}, {
  number: 5,
  name: "Al-Ma'idah",
  arabicName: "المائدة",
  url: "https://server8.mp3quran.net/afs/005.mp3"
}, {
  number: 6,
  name: "Al-An'am",
  arabicName: "الأنعام",
  url: "https://server8.mp3quran.net/afs/006.mp3"
}, {
  number: 7,
  name: "Al-A'raf",
  arabicName: "الأعراف",
  url: "https://server8.mp3quran.net/afs/007.mp3"
}, {
  number: 8,
  name: "Al-Anfal",
  arabicName: "الأنفال",
  url: "https://server8.mp3quran.net/afs/008.mp3"
}, {
  number: 9,
  name: "At-Tawbah",
  arabicName: "التوبة",
  url: "https://server8.mp3quran.net/afs/009.mp3"
}, {
  number: 10,
  name: "Yunus",
  arabicName: "يونس",
  url: "https://server8.mp3quran.net/afs/010.mp3"
}, {
  number: 11,
  name: "Hud",
  arabicName: "هود",
  url: "https://server8.mp3quran.net/afs/011.mp3"
}, {
  number: 12,
  name: "Yusuf",
  arabicName: "يوسف",
  url: "https://server8.mp3quran.net/afs/012.mp3"
}, {
  number: 13,
  name: "Ar-Ra'd",
  arabicName: "الرعد",
  url: "https://server8.mp3quran.net/afs/013.mp3"
}, {
  number: 14,
  name: "Ibrahim",
  arabicName: "ابراهيم",
  url: "https://server8.mp3quran.net/afs/014.mp3"
}, {
  number: 15,
  name: "Al-Hijr",
  arabicName: "الحجر",
  url: "https://server8.mp3quran.net/afs/015.mp3"
}, {
  number: 16,
  name: "An-Nahl",
  arabicName: "النحل",
  url: "https://server8.mp3quran.net/afs/016.mp3"
}, {
  number: 17,
  name: "Al-Isra",
  arabicName: "الإسراء",
  url: "https://server8.mp3quran.net/afs/017.mp3"
}, {
  number: 18,
  name: "Al-Kahf",
  arabicName: "الكهف",
  url: "https://server8.mp3quran.net/afs/018.mp3"
}, {
  number: 19,
  name: "Maryam",
  arabicName: "مريم",
  url: "https://server8.mp3quran.net/afs/019.mp3"
}, {
  number: 20,
  name: "Taha",
  arabicName: "طه",
  url: "https://server8.mp3quran.net/afs/020.mp3"
}, {
  number: 21,
  name: "Al-Anbya",
  arabicName: "الأنبياء",
  url: "https://server8.mp3quran.net/afs/021.mp3"
}, {
  number: 22,
  name: "Al-Hajj",
  arabicName: "الحج",
  url: "https://server8.mp3quran.net/afs/022.mp3"
}, {
  number: 23,
  name: "Al-Mu'minun",
  arabicName: "المؤمنون",
  url: "https://server8.mp3quran.net/afs/023.mp3"
}, {
  number: 24,
  name: "An-Nur",
  arabicName: "النور",
  url: "https://server8.mp3quran.net/afs/024.mp3"
}, {
  number: 25,
  name: "Al-Furqan",
  arabicName: "الفرقان",
  url: "https://server8.mp3quran.net/afs/025.mp3"
}, {
  number: 26,
  name: "Ash-Shu'ara",
  arabicName: "الشعراء",
  url: "https://server8.mp3quran.net/afs/026.mp3"
}, {
  number: 27,
  name: "An-Naml",
  arabicName: "النمل",
  url: "https://server8.mp3quran.net/afs/027.mp3"
}, {
  number: 28,
  name: "Al-Qasas",
  arabicName: "القصص",
  url: "https://server8.mp3quran.net/afs/028.mp3"
}, {
  number: 29,
  name: "Al-'Ankabut",
  arabicName: "العنكبوت",
  url: "https://server8.mp3quran.net/afs/029.mp3"
}, {
  number: 30,
  name: "Ar-Rum",
  arabicName: "الروم",
  url: "https://server8.mp3quran.net/afs/030.mp3"
}, {
  number: 31,
  name: "Luqman",
  arabicName: "لقمان",
  url: "https://server8.mp3quran.net/afs/031.mp3"
}, {
  number: 32,
  name: "As-Sajdah",
  arabicName: "السجدة",
  url: "https://server8.mp3quran.net/afs/032.mp3"
}, {
  number: 33,
  name: "Al-Ahzab",
  arabicName: "الأحزاب",
  url: "https://server8.mp3quran.net/afs/033.mp3"
}, {
  number: 34,
  name: "Saba",
  arabicName: "سبإ",
  url: "https://server8.mp3quran.net/afs/034.mp3"
}, {
  number: 35,
  name: "Fatir",
  arabicName: "فاطر",
  url: "https://server8.mp3quran.net/afs/035.mp3"
}, {
  number: 36,
  name: "Ya-Sin",
  arabicName: "يس",
  url: "https://server8.mp3quran.net/afs/036.mp3"
}, {
  number: 37,
  name: "As-Saffat",
  arabicName: "الصافات",
  url: "https://server8.mp3quran.net/afs/037.mp3"
}, {
  number: 38,
  name: "Sad",
  arabicName: "ص",
  url: "https://server8.mp3quran.net/afs/038.mp3"
}, {
  number: 39,
  name: "Az-Zumar",
  arabicName: "الزمر",
  url: "https://server8.mp3quran.net/afs/039.mp3"
}, {
  number: 40,
  name: "Ghafir",
  arabicName: "غافر",
  url: "https://server8.mp3quran.net/afs/040.mp3"
}, {
  number: 41,
  name: "Fussilat",
  arabicName: "فصلت",
  url: "https://server8.mp3quran.net/afs/041.mp3"
}, {
  number: 42,
  name: "Ash-Shuraa",
  arabicName: "الشورى",
  url: "https://server8.mp3quran.net/afs/042.mp3"
}, {
  number: 43,
  name: "Az-Zukhruf",
  arabicName: "الزخرف",
  url: "https://server8.mp3quran.net/afs/043.mp3"
}, {
  number: 44,
  name: "Ad-Dukhan",
  arabicName: "الدخان",
  url: "https://server8.mp3quran.net/afs/044.mp3"
}, {
  number: 45,
  name: "Al-Jathiyah",
  arabicName: "الجاثية",
  url: "https://server8.mp3quran.net/afs/045.mp3"
}, {
  number: 46,
  name: "Al-Ahqaf",
  arabicName: "الأحقاف",
  url: "https://server8.mp3quran.net/afs/046.mp3"
}, {
  number: 47,
  name: "Muhammad",
  arabicName: "محمد",
  url: "https://server8.mp3quran.net/afs/047.mp3"
}, {
  number: 48,
  name: "Al-Fath",
  arabicName: "الفتح",
  url: "https://server8.mp3quran.net/afs/048.mp3"
}, {
  number: 49,
  name: "Al-Hujurat",
  arabicName: "الحجرات",
  url: "https://server8.mp3quran.net/afs/049.mp3"
}, {
  number: 50,
  name: "Qaf",
  arabicName: "ق",
  url: "https://server8.mp3quran.net/afs/050.mp3"
}, {
  number: 51,
  name: "Adh-Dhariyat",
  arabicName: "الذاريات",
  url: "https://server8.mp3quran.net/afs/051.mp3"
}, {
  number: 52,
  name: "At-Tur",
  arabicName: "الطور",
  url: "https://server8.mp3quran.net/afs/052.mp3"
}, {
  number: 53,
  name: "An-Najm",
  arabicName: "النجم",
  url: "https://server8.mp3quran.net/afs/053.mp3"
}, {
  number: 54,
  name: "Al-Qamar",
  arabicName: "القمر",
  url: "https://server8.mp3quran.net/afs/054.mp3"
}, {
  number: 55,
  name: "Ar-Rahman",
  arabicName: "الرحمن",
  url: "https://server8.mp3quran.net/afs/055.mp3"
}, {
  number: 56,
  name: "Al-Waqi'ah",
  arabicName: "الواقعة",
  url: "https://server8.mp3quran.net/afs/056.mp3"
}, {
  number: 57,
  name: "Al-Hadid",
  arabicName: "الحديد",
  url: "https://server8.mp3quran.net/afs/057.mp3"
}, {
  number: 58,
  name: "Al-Mujadila",
  arabicName: "المجادلة",
  url: "https://server8.mp3quran.net/afs/058.mp3"
}, {
  number: 59,
  name: "Al-Hashr",
  arabicName: "الحشر",
  url: "https://server8.mp3quran.net/afs/059.mp3"
}, {
  number: 60,
  name: "Al-Mumtahanah",
  arabicName: "الممتحنة",
  url: "https://server8.mp3quran.net/afs/060.mp3"
}, {
  number: 61,
  name: "As-Saf",
  arabicName: "الصف",
  url: "https://server8.mp3quran.net/afs/061.mp3"
}, {
  number: 62,
  name: "Al-Jumu'ah",
  arabicName: "الجمعة",
  url: "https://server8.mp3quran.net/afs/062.mp3"
}, {
  number: 63,
  name: "Al-Munafiqun",
  arabicName: "المنافقون",
  url: "https://server8.mp3quran.net/afs/063.mp3"
}, {
  number: 64,
  name: "At-Taghabun",
  arabicName: "التغابن",
  url: "https://server8.mp3quran.net/afs/064.mp3"
}, {
  number: 65,
  name: "At-Talaq",
  arabicName: "الطلاق",
  url: "https://server8.mp3quran.net/afs/065.mp3"
}, {
  number: 66,
  name: "At-Tahrim",
  arabicName: "التحريم",
  url: "https://server8.mp3quran.net/afs/066.mp3"
}, {
  number: 67,
  name: "Al-Mulk",
  arabicName: "الملك",
  url: "https://server8.mp3quran.net/afs/067.mp3"
}, {
  number: 68,
  name: "Al-Qalam",
  arabicName: "القلم",
  url: "https://server8.mp3quran.net/afs/068.mp3"
}, {
  number: 69,
  name: "Al-Haqqah",
  arabicName: "الحاقة",
  url: "https://server8.mp3quran.net/afs/069.mp3"
}, {
  number: 70,
  name: "Al-Ma'arij",
  arabicName: "المعارج",
  url: "https://server8.mp3quran.net/afs/070.mp3"
}, {
  number: 71,
  name: "Nuh",
  arabicName: "نوح",
  url: "https://server8.mp3quran.net/afs/071.mp3"
}, {
  number: 72,
  name: "Al-Jinn",
  arabicName: "الجن",
  url: "https://server8.mp3quran.net/afs/072.mp3"
}, {
  number: 73,
  name: "Al-Muzzammil",
  arabicName: "المزمل",
  url: "https://server8.mp3quran.net/afs/073.mp3"
}, {
  number: 74,
  name: "Al-Muddaththir",
  arabicName: "المدثر",
  url: "https://server8.mp3quran.net/afs/074.mp3"
}, {
  number: 75,
  name: "Al-Qiyamah",
  arabicName: "القيامة",
  url: "https://server8.mp3quran.net/afs/075.mp3"
}, {
  number: 76,
  name: "Al-Insan",
  arabicName: "الانسان",
  url: "https://server8.mp3quran.net/afs/076.mp3"
}, {
  number: 77,
  name: "Al-Mursalat",
  arabicName: "المرسلات",
  url: "https://server8.mp3quran.net/afs/077.mp3"
}, {
  number: 78,
  name: "An-Naba",
  arabicName: "النبإ",
  url: "https://server8.mp3quran.net/afs/078.mp3"
}, {
  number: 79,
  name: "An-Nazi'at",
  arabicName: "النازعات",
  url: "https://server8.mp3quran.net/afs/079.mp3"
}, {
  number: 80,
  name: "'Abasa",
  arabicName: "عبس",
  url: "https://server8.mp3quran.net/afs/080.mp3"
}, {
  number: 81,
  name: "At-Takwir",
  arabicName: "التكوير",
  url: "https://server8.mp3quran.net/afs/081.mp3"
}, {
  number: 82,
  name: "Al-Infitar",
  arabicName: "الإنفطار",
  url: "https://server8.mp3quran.net/afs/082.mp3"
}, {
  number: 83,
  name: "Al-Mutaffifin",
  arabicName: "المطففين",
  url: "https://server8.mp3quran.net/afs/083.mp3"
}, {
  number: 84,
  name: "Al-Inshiqaq",
  arabicName: "الإنشقاق",
  url: "https://server8.mp3quran.net/afs/084.mp3"
}, {
  number: 85,
  name: "Al-Buruj",
  arabicName: "البروج",
  url: "https://server8.mp3quran.net/afs/085.mp3"
}, {
  number: 86,
  name: "At-Tariq",
  arabicName: "الطارق",
  url: "https://server8.mp3quran.net/afs/086.mp3"
}, {
  number: 87,
  name: "Al-A'la",
  arabicName: "الأعلى",
  url: "https://server8.mp3quran.net/afs/087.mp3"
}, {
  number: 88,
  name: "Al-Ghashiyah",
  arabicName: "الغاشية",
  url: "https://server8.mp3quran.net/afs/088.mp3"
}, {
  number: 89,
  name: "Al-Fajr",
  arabicName: "الفجر",
  url: "https://server8.mp3quran.net/afs/089.mp3"
}, {
  number: 90,
  name: "Al-Balad",
  arabicName: "البلد",
  url: "https://server8.mp3quran.net/afs/090.mp3"
}, {
  number: 91,
  name: "Ash-Shams",
  arabicName: "الشمس",
  url: "https://server8.mp3quran.net/afs/091.mp3"
}, {
  number: 92,
  name: "Al-Layl",
  arabicName: "الليل",
  url: "https://server8.mp3quran.net/afs/092.mp3"
}, {
  number: 93,
  name: "Ad-Duhaa",
  arabicName: "الضحى",
  url: "https://server8.mp3quran.net/afs/093.mp3"
}, {
  number: 94,
  name: "Ash-Sharh",
  arabicName: "الشرح",
  url: "https://server8.mp3quran.net/afs/094.mp3"
}, {
  number: 95,
  name: "At-Tin",
  arabicName: "التين",
  url: "https://server8.mp3quran.net/afs/095.mp3"
}, {
  number: 96,
  name: "Al-'Alaq",
  arabicName: "العلق",
  url: "https://server8.mp3quran.net/afs/096.mp3"
}, {
  number: 97,
  name: "Al-Qadr",
  arabicName: "القدر",
  url: "https://server8.mp3quran.net/afs/097.mp3"
}, {
  number: 98,
  name: "Al-Bayyinah",
  arabicName: "البينة",
  url: "https://server8.mp3quran.net/afs/098.mp3"
}, {
  number: 99,
  name: "Az-Zalzalah",
  arabicName: "الزلزلة",
  url: "https://server8.mp3quran.net/afs/099.mp3"
}, {
  number: 100,
  name: "Al-'Adiyat",
  arabicName: "العاديات",
  url: "https://server8.mp3quran.net/afs/100.mp3"
}, {
  number: 101,
  name: "Al-Qari'ah",
  arabicName: "القارعة",
  url: "https://server8.mp3quran.net/afs/101.mp3"
}, {
  number: 102,
  name: "At-Takathur",
  arabicName: "التكاثر",
  url: "https://server8.mp3quran.net/afs/102.mp3"
}, {
  number: 103,
  name: "Al-'Asr",
  arabicName: "العصر",
  url: "https://server8.mp3quran.net/afs/103.mp3"
}, {
  number: 104,
  name: "Al-Humazah",
  arabicName: "الهمزة",
  url: "https://server8.mp3quran.net/afs/104.mp3"
}, {
  number: 105,
  name: "Al-Fil",
  arabicName: "الفيل",
  url: "https://server8.mp3quran.net/afs/105.mp3"
}, {
  number: 106,
  name: "Quraysh",
  arabicName: "قريش",
  url: "https://server8.mp3quran.net/afs/106.mp3"
}, {
  number: 107,
  name: "Al-Ma'un",
  arabicName: "الماعون",
  url: "https://server8.mp3quran.net/afs/107.mp3"
}, {
  number: 108,
  name: "Al-Kawthar",
  arabicName: "الكوثر",
  url: "https://server8.mp3quran.net/afs/108.mp3"
}, {
  number: 109,
  name: "Al-Kafirun",
  arabicName: "الكافرون",
  url: "https://server8.mp3quran.net/afs/109.mp3"
}, {
  number: 110,
  name: "An-Nasr",
  arabicName: "النصر",
  url: "https://server8.mp3quran.net/afs/110.mp3"
}, {
  number: 111,
  name: "Al-Masad",
  arabicName: "المسد",
  url: "https://server8.mp3quran.net/afs/111.mp3"
}, {
  number: 112,
  name: "Al-Ikhlas",
  arabicName: "الإخلاص",
  url: "https://server8.mp3quran.net/afs/112.mp3"
}, {
  number: 113,
  name: "Al-Falaq",
  arabicName: "الفلق",
  url: "https://server8.mp3quran.net/afs/113.mp3"
}, {
  number: 114,
  name: "An-Nas",
  arabicName: "الناس",
  url: "https://server8.mp3quran.net/afs/114.mp3"
}];
interface BackgroundMusicProps {
  onSurahChange?: (surahNumber: number, surahName: string, surahArabicName: string) => void;
  onVerseChange?: (verseIndex: number) => void;
}
const BackgroundMusic = ({
  onSurahChange,
  onVerseChange
}: BackgroundMusicProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurahIndex, setCurrentSurahIndex] = useState(0);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Versuche Autoplay beim Laden
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      // Versuche automatisch zu starten
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay wurde blockiert, Nutzer muss klicken
            setIsPlaying(false);
          });
      }
    }
  }, []);
  
  const handleStartPlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  const handleSurahEnded = () => {
    // Move to next surah, loop back to beginning if at end
    const nextIndex = (currentSurahIndex + 1) % surahs.length;
    setCurrentSurahIndex(nextIndex);
    setCurrentVerseIndex(0);
  };
  useEffect(() => {
    const currentSurah = surahs[currentSurahIndex];
    if (onSurahChange) {
      onSurahChange(currentSurah.number, currentSurah.name, currentSurah.arabicName);
    }
    setCurrentVerseIndex(0);
  }, [currentSurahIndex, onSurahChange]);

  // Auto-advance verses while playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => prev + 1);
    }, 8000); // Advance verse every 8 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Notify parent component of verse changes
  useEffect(() => {
    if (onVerseChange) {
      onVerseChange(currentVerseIndex);
    }
  }, [currentVerseIndex, onVerseChange]);
  const currentSurah = surahs[currentSurahIndex];
  return <>
      {/* Start Button - wird nur angezeigt wenn nicht abspielt */}
      {!isPlaying && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center">
          <Card className="p-8 text-center bg-card border-2 border-primary shadow-2xl">
            <h3 className="text-2xl font-bold text-primary mb-4 font-inter">Quran Rezitation starten</h3>
            <p className="text-muted-foreground mb-6 font-inter">Klicken Sie um die Quran Wiedergabe zu starten</p>
            <Button onClick={handleStartPlay} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter">
              <Volume2 className="mr-2 h-5 w-5" />
              Jetzt starten
            </Button>
          </Card>
        </div>
      )}
      
      {/* Mute button - bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={toggleMute} variant="outline" size="icon" className="rounded-full bg-card/90 backdrop-blur-sm border-primary/30 hover:bg-card shadow-lg h-12 w-12">
          {isMuted ? <VolumeX className="h-5 w-5 text-muted-foreground" /> : <Volume2 className="h-5 w-5 text-primary" />}
        </Button>
      </div>

      <audio ref={audioRef} src={currentSurah.url} onEnded={handleSurahEnded} />
    </>;
};
export default BackgroundMusic;