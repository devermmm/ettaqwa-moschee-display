import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Play, Pause, BookOpen, ChevronRight, Volume2, SkipBack, SkipForward, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  arabicName: string;
  verses: number;
  revelationType: string;
}

interface Verse {
  number: number;
  arabic: string;
  translation: string;
}

// Complete list of all 114 Surahs
const allSurahs: Surah[] = [
  { number: 1, name: "Al-Fatiha", englishName: "The Opening", arabicName: "الفاتحة", verses: 7, revelationType: "Meccan" },
  { number: 2, name: "Al-Baqarah", englishName: "The Cow", arabicName: "البقرة", verses: 286, revelationType: "Medinan" },
  { number: 3, name: "Aal-Imran", englishName: "The Family of Imran", arabicName: "آل عمران", verses: 200, revelationType: "Medinan" },
  { number: 4, name: "An-Nisa", englishName: "The Women", arabicName: "النساء", verses: 176, revelationType: "Medinan" },
  { number: 5, name: "Al-Ma'idah", englishName: "The Table", arabicName: "المائدة", verses: 120, revelationType: "Medinan" },
  { number: 6, name: "Al-An'am", englishName: "The Cattle", arabicName: "الأنعام", verses: 165, revelationType: "Meccan" },
  { number: 7, name: "Al-A'raf", englishName: "The Heights", arabicName: "الأعراف", verses: 206, revelationType: "Meccan" },
  { number: 8, name: "Al-Anfal", englishName: "The Spoils of War", arabicName: "الأنفال", verses: 75, revelationType: "Medinan" },
  { number: 9, name: "At-Tawbah", englishName: "The Repentance", arabicName: "التوبة", verses: 129, revelationType: "Medinan" },
  { number: 10, name: "Yunus", englishName: "Jonah", arabicName: "يونس", verses: 109, revelationType: "Meccan" },
  { number: 11, name: "Hud", englishName: "Hud", arabicName: "هود", verses: 123, revelationType: "Meccan" },
  { number: 12, name: "Yusuf", englishName: "Joseph", arabicName: "يوسف", verses: 111, revelationType: "Meccan" },
  { number: 13, name: "Ar-Ra'd", englishName: "The Thunder", arabicName: "الرعد", verses: 43, revelationType: "Medinan" },
  { number: 14, name: "Ibrahim", englishName: "Abraham", arabicName: "إبراهيم", verses: 52, revelationType: "Meccan" },
  { number: 15, name: "Al-Hijr", englishName: "The Rocky Tract", arabicName: "الحجر", verses: 99, revelationType: "Meccan" },
  { number: 16, name: "An-Nahl", englishName: "The Bee", arabicName: "النحل", verses: 128, revelationType: "Meccan" },
  { number: 17, name: "Al-Isra", englishName: "The Night Journey", arabicName: "الإسراء", verses: 111, revelationType: "Meccan" },
  { number: 18, name: "Al-Kahf", englishName: "The Cave", arabicName: "الكهف", verses: 110, revelationType: "Meccan" },
  { number: 19, name: "Maryam", englishName: "Mary", arabicName: "مريم", verses: 98, revelationType: "Meccan" },
  { number: 20, name: "Ta-Ha", englishName: "Ta-Ha", arabicName: "طه", verses: 135, revelationType: "Meccan" },
  { number: 21, name: "Al-Anbiya", englishName: "The Prophets", arabicName: "الأنبياء", verses: 112, revelationType: "Meccan" },
  { number: 22, name: "Al-Hajj", englishName: "The Pilgrimage", arabicName: "الحج", verses: 78, revelationType: "Medinan" },
  { number: 23, name: "Al-Mu'minun", englishName: "The Believers", arabicName: "المؤمنون", verses: 118, revelationType: "Meccan" },
  { number: 24, name: "An-Nur", englishName: "The Light", arabicName: "النور", verses: 64, revelationType: "Medinan" },
  { number: 25, name: "Al-Furqan", englishName: "The Criterion", arabicName: "الفرقان", verses: 77, revelationType: "Meccan" },
  { number: 26, name: "Ash-Shu'ara", englishName: "The Poets", arabicName: "الشعراء", verses: 227, revelationType: "Meccan" },
  { number: 27, name: "An-Naml", englishName: "The Ants", arabicName: "النمل", verses: 93, revelationType: "Meccan" },
  { number: 28, name: "Al-Qasas", englishName: "The Stories", arabicName: "القصص", verses: 88, revelationType: "Meccan" },
  { number: 29, name: "Al-Ankabut", englishName: "The Spider", arabicName: "العنكبوت", verses: 69, revelationType: "Meccan" },
  { number: 30, name: "Ar-Rum", englishName: "The Romans", arabicName: "الروم", verses: 60, revelationType: "Meccan" },
  { number: 31, name: "Luqman", englishName: "Luqman", arabicName: "لقمان", verses: 34, revelationType: "Meccan" },
  { number: 32, name: "As-Sajdah", englishName: "The Prostration", arabicName: "السجدة", verses: 30, revelationType: "Meccan" },
  { number: 33, name: "Al-Ahzab", englishName: "The Confederates", arabicName: "الأحزاب", verses: 73, revelationType: "Medinan" },
  { number: 34, name: "Saba", englishName: "Sheba", arabicName: "سبأ", verses: 54, revelationType: "Meccan" },
  { number: 35, name: "Fatir", englishName: "The Originator", arabicName: "فاطر", verses: 45, revelationType: "Meccan" },
  { number: 36, name: "Ya-Sin", englishName: "Ya-Sin", arabicName: "يس", verses: 83, revelationType: "Meccan" },
  { number: 37, name: "As-Saffat", englishName: "Those Ranged in Ranks", arabicName: "الصافات", verses: 182, revelationType: "Meccan" },
  { number: 38, name: "Sad", englishName: "Sad", arabicName: "ص", verses: 88, revelationType: "Meccan" },
  { number: 39, name: "Az-Zumar", englishName: "The Groups", arabicName: "الزمر", verses: 75, revelationType: "Meccan" },
  { number: 40, name: "Ghafir", englishName: "The Forgiver", arabicName: "غافر", verses: 85, revelationType: "Meccan" },
  { number: 41, name: "Fussilat", englishName: "Explained in Detail", arabicName: "فصلت", verses: 54, revelationType: "Meccan" },
  { number: 42, name: "Ash-Shura", englishName: "The Consultation", arabicName: "الشورى", verses: 53, revelationType: "Meccan" },
  { number: 43, name: "Az-Zukhruf", englishName: "The Gold", arabicName: "الزخرف", verses: 89, revelationType: "Meccan" },
  { number: 44, name: "Ad-Dukhan", englishName: "The Smoke", arabicName: "الدخان", verses: 59, revelationType: "Meccan" },
  { number: 45, name: "Al-Jathiyah", englishName: "The Kneeling", arabicName: "الجاثية", verses: 37, revelationType: "Meccan" },
  { number: 46, name: "Al-Ahqaf", englishName: "The Curved Sandhills", arabicName: "الأحقاف", verses: 35, revelationType: "Meccan" },
  { number: 47, name: "Muhammad", englishName: "Muhammad", arabicName: "محمد", verses: 38, revelationType: "Medinan" },
  { number: 48, name: "Al-Fath", englishName: "The Victory", arabicName: "الفتح", verses: 29, revelationType: "Medinan" },
  { number: 49, name: "Al-Hujurat", englishName: "The Dwellings", arabicName: "الحجرات", verses: 18, revelationType: "Medinan" },
  { number: 50, name: "Qaf", englishName: "Qaf", arabicName: "ق", verses: 45, revelationType: "Meccan" },
  { number: 51, name: "Adh-Dhariyat", englishName: "The Scattering Winds", arabicName: "الذاريات", verses: 60, revelationType: "Meccan" },
  { number: 52, name: "At-Tur", englishName: "The Mount", arabicName: "الطور", verses: 49, revelationType: "Meccan" },
  { number: 53, name: "An-Najm", englishName: "The Star", arabicName: "النجم", verses: 62, revelationType: "Meccan" },
  { number: 54, name: "Al-Qamar", englishName: "The Moon", arabicName: "القمر", verses: 55, revelationType: "Meccan" },
  { number: 55, name: "Ar-Rahman", englishName: "The Most Gracious", arabicName: "الرحمن", verses: 78, revelationType: "Medinan" },
  { number: 56, name: "Al-Waqi'ah", englishName: "The Event", arabicName: "الواقعة", verses: 96, revelationType: "Meccan" },
  { number: 57, name: "Al-Hadid", englishName: "The Iron", arabicName: "الحديد", verses: 29, revelationType: "Medinan" },
  { number: 58, name: "Al-Mujadila", englishName: "The Disputation", arabicName: "المجادلة", verses: 22, revelationType: "Medinan" },
  { number: 59, name: "Al-Hashr", englishName: "The Gathering", arabicName: "الحشر", verses: 24, revelationType: "Medinan" },
  { number: 60, name: "Al-Mumtahina", englishName: "The Examined One", arabicName: "الممتحنة", verses: 13, revelationType: "Medinan" },
  { number: 61, name: "As-Saff", englishName: "The Row", arabicName: "الصف", verses: 14, revelationType: "Medinan" },
  { number: 62, name: "Al-Jumu'ah", englishName: "Friday", arabicName: "الجمعة", verses: 11, revelationType: "Medinan" },
  { number: 63, name: "Al-Munafiqun", englishName: "The Hypocrites", arabicName: "المنافقون", verses: 11, revelationType: "Medinan" },
  { number: 64, name: "At-Taghabun", englishName: "Loss & Gain", arabicName: "التغابن", verses: 18, revelationType: "Medinan" },
  { number: 65, name: "At-Talaq", englishName: "The Divorce", arabicName: "الطلاق", verses: 12, revelationType: "Medinan" },
  { number: 66, name: "At-Tahrim", englishName: "The Prohibition", arabicName: "التحريم", verses: 12, revelationType: "Medinan" },
  { number: 67, name: "Al-Mulk", englishName: "The Dominion", arabicName: "الملك", verses: 30, revelationType: "Meccan" },
  { number: 68, name: "Al-Qalam", englishName: "The Pen", arabicName: "القلم", verses: 52, revelationType: "Meccan" },
  { number: 69, name: "Al-Haqqah", englishName: "The Inevitable", arabicName: "الحاقة", verses: 52, revelationType: "Meccan" },
  { number: 70, name: "Al-Ma'arij", englishName: "The Ways of Ascent", arabicName: "المعارج", verses: 44, revelationType: "Meccan" },
  { number: 71, name: "Nuh", englishName: "Noah", arabicName: "نوح", verses: 28, revelationType: "Meccan" },
  { number: 72, name: "Al-Jinn", englishName: "The Jinn", arabicName: "الجن", verses: 28, revelationType: "Meccan" },
  { number: 73, name: "Al-Muzzammil", englishName: "The Enwrapped One", arabicName: "المزمل", verses: 20, revelationType: "Meccan" },
  { number: 74, name: "Al-Muddathir", englishName: "The Cloaked One", arabicName: "المدثر", verses: 56, revelationType: "Meccan" },
  { number: 75, name: "Al-Qiyamah", englishName: "The Resurrection", arabicName: "القيامة", verses: 40, revelationType: "Meccan" },
  { number: 76, name: "Al-Insan", englishName: "Man", arabicName: "الإنسان", verses: 31, revelationType: "Medinan" },
  { number: 77, name: "Al-Mursalat", englishName: "Those Sent Forth", arabicName: "المرسلات", verses: 50, revelationType: "Meccan" },
  { number: 78, name: "An-Naba", englishName: "The Great News", arabicName: "النبأ", verses: 40, revelationType: "Meccan" },
  { number: 79, name: "An-Nazi'at", englishName: "Those Who Pull Out", arabicName: "النازعات", verses: 46, revelationType: "Meccan" },
  { number: 80, name: "Abasa", englishName: "He Frowned", arabicName: "عبس", verses: 42, revelationType: "Meccan" },
  { number: 81, name: "At-Takwir", englishName: "The Overthrowing", arabicName: "التكوير", verses: 29, revelationType: "Meccan" },
  { number: 82, name: "Al-Infitar", englishName: "The Cleaving", arabicName: "الانفطار", verses: 19, revelationType: "Meccan" },
  { number: 83, name: "Al-Mutaffifin", englishName: "Those Who Deal in Fraud", arabicName: "المطففين", verses: 36, revelationType: "Meccan" },
  { number: 84, name: "Al-Inshiqaq", englishName: "The Splitting Asunder", arabicName: "الانشقاق", verses: 25, revelationType: "Meccan" },
  { number: 85, name: "Al-Buruj", englishName: "The Constellations", arabicName: "البروج", verses: 22, revelationType: "Meccan" },
  { number: 86, name: "At-Tariq", englishName: "The Night-Comer", arabicName: "الطارق", verses: 17, revelationType: "Meccan" },
  { number: 87, name: "Al-A'la", englishName: "The Most High", arabicName: "الأعلى", verses: 19, revelationType: "Meccan" },
  { number: 88, name: "Al-Ghashiyah", englishName: "The Overwhelming", arabicName: "الغاشية", verses: 26, revelationType: "Meccan" },
  { number: 89, name: "Al-Fajr", englishName: "The Dawn", arabicName: "الفجر", verses: 30, revelationType: "Meccan" },
  { number: 90, name: "Al-Balad", englishName: "The City", arabicName: "البلد", verses: 20, revelationType: "Meccan" },
  { number: 91, name: "Ash-Shams", englishName: "The Sun", arabicName: "الشمس", verses: 15, revelationType: "Meccan" },
  { number: 92, name: "Al-Layl", englishName: "The Night", arabicName: "الليل", verses: 21, revelationType: "Meccan" },
  { number: 93, name: "Ad-Duha", englishName: "The Forenoon", arabicName: "الضحى", verses: 11, revelationType: "Meccan" },
  { number: 94, name: "Ash-Sharh", englishName: "The Opening Forth", arabicName: "الشرح", verses: 8, revelationType: "Meccan" },
  { number: 95, name: "At-Tin", englishName: "The Fig", arabicName: "التين", verses: 8, revelationType: "Meccan" },
  { number: 96, name: "Al-'Alaq", englishName: "The Clot", arabicName: "العلق", verses: 19, revelationType: "Meccan" },
  { number: 97, name: "Al-Qadr", englishName: "The Night of Decree", arabicName: "القدر", verses: 5, revelationType: "Meccan" },
  { number: 98, name: "Al-Bayyinah", englishName: "The Clear Evidence", arabicName: "البينة", verses: 8, revelationType: "Medinan" },
  { number: 99, name: "Az-Zalzalah", englishName: "The Earthquake", arabicName: "الزلزلة", verses: 8, revelationType: "Medinan" },
  { number: 100, name: "Al-'Adiyat", englishName: "Those That Run", arabicName: "العاديات", verses: 11, revelationType: "Meccan" },
  { number: 101, name: "Al-Qari'ah", englishName: "The Striking Hour", arabicName: "القارعة", verses: 11, revelationType: "Meccan" },
  { number: 102, name: "At-Takathur", englishName: "The Piling Up", arabicName: "التكاثر", verses: 8, revelationType: "Meccan" },
  { number: 103, name: "Al-'Asr", englishName: "The Time", arabicName: "العصر", verses: 3, revelationType: "Meccan" },
  { number: 104, name: "Al-Humazah", englishName: "The Slanderer", arabicName: "الهمزة", verses: 9, revelationType: "Meccan" },
  { number: 105, name: "Al-Fil", englishName: "The Elephant", arabicName: "الفيل", verses: 5, revelationType: "Meccan" },
  { number: 106, name: "Quraysh", englishName: "Quraysh", arabicName: "قريش", verses: 4, revelationType: "Meccan" },
  { number: 107, name: "Al-Ma'un", englishName: "The Small Kindnesses", arabicName: "الماعون", verses: 7, revelationType: "Meccan" },
  { number: 108, name: "Al-Kawthar", englishName: "The Abundance", arabicName: "الكوثر", verses: 3, revelationType: "Meccan" },
  { number: 109, name: "Al-Kafirun", englishName: "The Disbelievers", arabicName: "الكافرون", verses: 6, revelationType: "Meccan" },
  { number: 110, name: "An-Nasr", englishName: "The Help", arabicName: "النصر", verses: 3, revelationType: "Medinan" },
  { number: 111, name: "Al-Masad", englishName: "The Palm Fiber", arabicName: "المسد", verses: 5, revelationType: "Meccan" },
  { number: 112, name: "Al-Ikhlas", englishName: "The Sincerity", arabicName: "الإخلاص", verses: 4, revelationType: "Meccan" },
  { number: 113, name: "Al-Falaq", englishName: "The Daybreak", arabicName: "الفلق", verses: 5, revelationType: "Meccan" },
  { number: 114, name: "An-Nas", englishName: "Mankind", arabicName: "الناس", verses: 6, revelationType: "Meccan" },
];

const ayatAlKursi: Verse = { 
  number: 255, 
  arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", 
  translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist. Wer ist es, der bei Ihm Fürsprache einlegen könnte außer mit Seiner Erlaubnis? Er weiß, was vor ihnen und was hinter ihnen liegt. Sie aber begreifen nichts von Seinem Wissen, außer was Er will. Sein Thron umfasst die Himmel und die Erde. Deren Behütung fällt Ihm nicht schwer. Er ist der Erhabene, der Gewaltige." 
};

const QuranPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [showAyatKursi, setShowAyatKursi] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [playMode, setPlayMode] = useState<"surah" | "verse">("surah");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const verseRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const audioQueue = useRef<number[]>([]);
  const isPlayingSequence = useRef(false);

  // Filter surahs based on search
  const filteredSurahs = allSurahs.filter(surah => 
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.arabicName.includes(searchQuery) ||
    surah.number.toString() === searchQuery
  );

  // Fetch verses from API when surah is selected
  useEffect(() => {
    if (selectedSurah) {
      fetchSurahVerses(selectedSurah.number);
      setCurrentVerseIndex(-1);
    }
  }, [selectedSurah]);

  // Auto-scroll to current verse
  useEffect(() => {
    if (currentVerseIndex >= 0 && verseRefs.current[currentVerseIndex]) {
      verseRefs.current[currentVerseIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [currentVerseIndex]);

  const fetchSurahVerses = async (surahNumber: number) => {
    setIsLoading(true);
    try {
      // Fetch Arabic text
      const arabicResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
      const arabicData = await arabicResponse.json();
      
      // Fetch German translation
      const germanResponse = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/de.aburida`);
      const germanData = await germanResponse.json();

      if (arabicData.data && germanData.data) {
        const combinedVerses: Verse[] = arabicData.data.ayahs.map((ayah: any, index: number) => ({
          number: ayah.numberInSurah,
          arabic: ayah.text,
          translation: germanData.data.ayahs[index]?.text || ""
        }));
        setVerses(combinedVerses);
      }
    } catch (error) {
      console.error("Error fetching verses:", error);
      toast.error(language === "bs" ? "Greška pri učitavanju" : "Fehler beim Laden");
    } finally {
      setIsLoading(false);
    }
  };

  const getGlobalVerseNumber = (surahNumber: number, verseNumber: number): number => {
    // Calculate global verse number for audio API
    const versesBeforeSurah = allSurahs
      .filter(s => s.number < surahNumber)
      .reduce((sum, s) => sum + s.verses, 0);
    return versesBeforeSurah + verseNumber;
  };

  const playVerseByIndex = async (index: number) => {
    if (!selectedSurah || index >= verses.length) {
      setIsPlaying(false);
      setCurrentVerseIndex(-1);
      isPlayingSequence.current = false;
      return;
    }

    const verse = verses[index];
    setCurrentVerseIndex(index);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const reciter = "ar.alafasy";
    const globalVerseNumber = getGlobalVerseNumber(selectedSurah.number, verse.number);
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/${reciter}/${globalVerseNumber}.mp3`;

    audioRef.current = new Audio(audioUrl);
    
    audioRef.current.onended = () => {
      // Play next verse in sequence
      if (isPlayingSequence.current && index + 1 < verses.length) {
        playVerseByIndex(index + 1);
      } else {
        setIsPlaying(false);
        setCurrentVerseIndex(-1);
        isPlayingSequence.current = false;
      }
    };

    audioRef.current.onerror = () => {
      toast.error(language === "bs" ? "Audio nije dostupan" : "Audio nicht verfügbar");
      setIsPlaying(false);
      setCurrentVerseIndex(-1);
      isPlayingSequence.current = false;
    };

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  const playSingleVerse = async (verseIndex: number) => {
    isPlayingSequence.current = false;
    setPlayMode("verse");
    
    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (!selectedSurah) return;

    const verse = verses[verseIndex];
    setCurrentVerseIndex(verseIndex);

    const reciter = "ar.alafasy";
    const globalVerseNumber = getGlobalVerseNumber(selectedSurah.number, verse.number);
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/${reciter}/${globalVerseNumber}.mp3`;

    audioRef.current = new Audio(audioUrl);
    
    audioRef.current.onended = () => {
      setIsPlaying(false);
      setCurrentVerseIndex(-1);
    };

    audioRef.current.onerror = () => {
      toast.error(language === "bs" ? "Audio nije dostupan" : "Audio nicht verfügbar");
      setIsPlaying(false);
      setCurrentVerseIndex(-1);
    };

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const startFullSurahPlayback = () => {
    if (!selectedSurah || verses.length === 0) return;
    
    isPlayingSequence.current = true;
    setPlayMode("surah");
    playVerseByIndex(0);
  };

  const togglePlayPause = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      isPlayingSequence.current = false;
    } else if (selectedSurah) {
      if (currentVerseIndex >= 0 && currentVerseIndex < verses.length - 1) {
        // Resume from current position
        isPlayingSequence.current = true;
        playVerseByIndex(currentVerseIndex);
      } else {
        // Start from beginning
        startFullSurahPlayback();
      }
    } else if (showAyatKursi) {
      playAyatKursi();
    }
  };

  const playAyatKursi = async () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const reciter = "ar.alafasy";
    const globalVerseNumber = getGlobalVerseNumber(2, 255);
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/${reciter}/${globalVerseNumber}.mp3`;

    audioRef.current = new Audio(audioUrl);
    audioRef.current.onended = () => setIsPlaying(false);
    audioRef.current.onerror = () => {
      toast.error(language === "bs" ? "Audio nije dostupan" : "Audio nicht verfügbar");
      setIsPlaying(false);
    };

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const skipToNextVerse = () => {
    if (currentVerseIndex < verses.length - 1) {
      isPlayingSequence.current = true;
      playVerseByIndex(currentVerseIndex + 1);
    }
  };

  const skipToPreviousVerse = () => {
    if (currentVerseIndex > 0) {
      isPlayingSequence.current = true;
      playVerseByIndex(currentVerseIndex - 1);
    }
  };

  const goBack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (showAyatKursi) {
      setShowAyatKursi(false);
    } else if (selectedSurah) {
      setSelectedSurah(null);
      setVerses([]);
    } else {
      navigate("/app");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* iOS Navigation Bar */}
      <div className="bg-background/80 backdrop-blur-xl sticky top-0 z-40 border-b border-border/50">
        <div className="safe-area-inset-top" />
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={goBack} className="flex items-center gap-1 text-primary font-medium">
            <ChevronLeft className="w-5 h-5" />
            <span>{language === "bs" ? "Nazad" : "Zurück"}</span>
          </button>
          <h1 className="font-semibold text-foreground">
            {showAyatKursi ? "Ayat al-Kursi" : selectedSurah ? selectedSurah.name : (language === "bs" ? "Kur'an" : "Quran")}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Surah List */}
        {!selectedSurah && !showAyatKursi && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-8"
          >
            {/* Search Bar */}
            <div className="px-4 pt-4">
              <input
                type="text"
                placeholder={language === "bs" ? "Pretraži sure..." : "Suren suchen..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Ayat al-Kursi Card */}
            <div className="px-4 pt-4">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAyatKursi(true)}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-amber-600 font-medium mb-1">
                      {language === "bs" ? "Posebna dova" : "Besonderer Vers"}
                    </p>
                    <p className="text-lg font-semibold text-foreground">Ayat al-Kursi</p>
                    <p className="text-sm text-muted-foreground font-arabic mt-1">آية الكرسي</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-amber-600" />
                </div>
              </motion.button>
            </div>

            {/* Juz Amma Quick Access */}
            <div className="px-4 pt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                {language === "bs" ? "Juz 'Amma (Kratke sure)" : "Juz 'Amma (Kurze Suren)"}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allSurahs.slice(77).map((surah) => (
                  <button
                    key={surah.number}
                    onClick={() => setSelectedSurah(surah)}
                    className="flex-shrink-0 px-3 py-2 bg-primary/10 rounded-xl text-sm font-medium text-primary"
                  >
                    {surah.name}
                  </button>
                ))}
              </div>
            </div>

            {/* All Surahs */}
            <div className="mt-4 bg-card mx-4 rounded-2xl overflow-hidden border border-border">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">
                  {language === "bs" ? "Sve sure" : "Alle Suren"} ({filteredSurahs.length})
                </p>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {filteredSurahs.map((surah) => (
                  <motion.button
                    key={surah.number}
                    whileTap={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    onClick={() => setSelectedSurah(surah)}
                    className="w-full flex items-center px-4 py-3 border-b border-border/50 last:border-b-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-primary">{surah.number}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-foreground">{surah.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {surah.verses} {language === "bs" ? "ajeta" : "Verse"} • {surah.revelationType}
                      </p>
                    </div>
                    <p className="text-lg text-muted-foreground font-arabic mr-2">{surah.arabicName}</p>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Ayat al-Kursi View */}
        {showAyatKursi && (
          <motion.div
            key="ayat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 pb-32"
          >
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-4">
                  {language === "bs" ? "Sura Al-Baqarah, Ajet" : "Sure Al-Baqarah, Vers"} 255
                </p>
                <p className="text-2xl text-foreground leading-[2.5] font-arabic text-right mb-6">
                  {ayatAlKursi.arabic}
                </p>
              </div>
              <div className="border-t border-border p-5 bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">
                  {language === "bs" ? "Prijevod" : "Übersetzung"}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {ayatAlKursi.translation}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Surah Detail View */}
        {selectedSurah && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pb-32"
          >
            {/* Surah Header */}
            <div className="text-center py-6 px-4">
              <p className="text-4xl font-arabic text-foreground mb-2">{selectedSurah.arabicName}</p>
              <p className="text-muted-foreground text-sm">
                {selectedSurah.verses} {language === "bs" ? "ajeta" : "Verse"} • {selectedSurah.revelationType}
              </p>
            </div>

            {/* Bismillah */}
            {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
              <div className="text-center py-4 mx-4 mb-4 bg-primary/5 rounded-2xl">
                <p className="text-2xl text-foreground font-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {language === "bs" ? "U ime Allaha, Milostivog, Samilosnog" : "Im Namen Allahs, des Allerbarmers, des Barmherzigen"}
                </p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            )}

            {/* Verses */}
            {!isLoading && verses.length > 0 && (
              <div className="px-4 space-y-3">
                {verses.map((verse, index) => {
                  const isCurrentVerse = currentVerseIndex === index;
                  return (
                    <motion.div
                      key={verse.number}
                      ref={(el) => { verseRefs.current[index] = el; }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: isCurrentVerse ? 1.02 : 1,
                      }}
                      transition={{ 
                        duration: 0.3,
                        scale: { duration: 0.2 }
                      }}
                      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                        isCurrentVerse 
                          ? "bg-gradient-to-br from-primary/10 to-accent/10 border-primary shadow-lg shadow-primary/20" 
                          : "bg-card border-border"
                      }`}
                    >
                      <div className="p-4">
                        {/* Verse Number & Play Button */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                              isCurrentVerse 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-primary/10 text-primary"
                            }`}>
                              {verse.number}
                            </span>
                            {isCurrentVerse && isPlaying && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-0.5"
                              >
                                {[1, 2, 3].map((bar) => (
                                  <motion.div
                                    key={bar}
                                    className="w-1 bg-primary rounded-full"
                                    animate={{
                                      height: [8, 16, 8],
                                    }}
                                    transition={{
                                      duration: 0.5,
                                      repeat: Infinity,
                                      delay: bar * 0.1,
                                    }}
                                  />
                                ))}
                              </motion.div>
                            )}
                          </div>
                          <button
                            onClick={() => playSingleVerse(index)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              isCurrentVerse 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {isCurrentVerse && isPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        
                        {/* Arabic Text */}
                        <motion.p 
                          className={`text-xl font-arabic text-right leading-[2.2] mb-4 transition-colors ${
                            isCurrentVerse ? "text-foreground" : "text-foreground"
                          }`}
                          animate={{
                            textShadow: isCurrentVerse ? "0 0 20px rgba(var(--primary), 0.3)" : "none"
                          }}
                        >
                          {verse.arabic}
                        </motion.p>
                        
                        {/* Translation */}
                        <div className={`pt-3 border-t transition-colors ${
                          isCurrentVerse ? "border-primary/30" : "border-border"
                        }`}>
                          <p className={`text-sm leading-relaxed ${
                            isCurrentVerse ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {verse.translation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Player */}
      {(selectedSurah || showAyatKursi) && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border"
        >
          <div className="safe-area-inset-bottom" />
          
          {/* Progress Bar */}
          {selectedSurah && currentVerseIndex >= 0 && (
            <div className="px-5 pt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>{language === "bs" ? "Ajet" : "Vers"} {currentVerseIndex + 1}</span>
                <span>{verses.length} {language === "bs" ? "ajeta" : "Verse"}</span>
              </div>
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentVerseIndex + 1) / verses.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground truncate">
                  {showAyatKursi ? "Ayat al-Kursi" : selectedSurah?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentVerseIndex >= 0 
                    ? `${language === "bs" ? "Ajet" : "Vers"} ${currentVerseIndex + 1}` 
                    : "Mishary Rashid Alafasy"}
                </p>
              </div>
            </div>
            
            {/* Playback Controls */}
            <div className="flex items-center gap-1">
              {selectedSurah && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={skipToPreviousVerse}
                  disabled={currentVerseIndex <= 0}
                  className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30"
                >
                  <SkipBack className="w-5 h-5 text-foreground" />
                </motion.button>
              )}
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayPause}
                className="w-14 h-14 rounded-full bg-primary flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <Play className="w-6 h-6 text-primary-foreground ml-1" />
                )}
              </motion.button>

              {selectedSurah && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={skipToNextVerse}
                  disabled={currentVerseIndex >= verses.length - 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-30"
                >
                  <SkipForward className="w-5 h-5 text-foreground" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuranPage;
