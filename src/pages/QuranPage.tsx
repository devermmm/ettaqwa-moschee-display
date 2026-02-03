import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause, BookOpen, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface Surah {
  number: number;
  name: string;
  arabicName: string;
  verses: number;
  type: "Meccan" | "Medinan";
}

interface Verse {
  number: number;
  arabic: string;
  translation: string;
}

// Popular Surahs for the app
const surahs: Surah[] = [
  { number: 1, name: "Al-Fatiha", arabicName: "الفاتحة", verses: 7, type: "Meccan" },
  { number: 2, name: "Al-Baqarah", arabicName: "البقرة", verses: 286, type: "Medinan" },
  { number: 36, name: "Ya-Sin", arabicName: "يس", verses: 83, type: "Meccan" },
  { number: 55, name: "Ar-Rahman", arabicName: "الرحمن", verses: 78, type: "Medinan" },
  { number: 56, name: "Al-Waqi'ah", arabicName: "الواقعة", verses: 96, type: "Meccan" },
  { number: 67, name: "Al-Mulk", arabicName: "الملك", verses: 30, type: "Meccan" },
  { number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", verses: 4, type: "Meccan" },
  { number: 113, name: "Al-Falaq", arabicName: "الفلق", verses: 5, type: "Meccan" },
  { number: 114, name: "An-Nas", arabicName: "الناس", verses: 6, type: "Meccan" },
];

// Sample verses for Al-Fatiha
const alFatihaVerses: Verse[] = [
  { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "Im Namen Allahs, des Allerbarmers, des Barmherzigen" },
  { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "Alles Lob gebührt Allah, dem Herrn der Welten" },
  { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "dem Allerbarmer, dem Barmherzigen" },
  { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", translation: "dem Herrscher am Tag des Gerichts" },
  { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "Dir allein dienen wir, und Dich allein bitten wir um Hilfe" },
  { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Führe uns den geraden Weg" },
  { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "den Weg derer, denen Du Gnade erwiesen hast, nicht derer, die Deinen Zorn erregt haben, und nicht der Irregehenden" },
];

// Sample verses for Al-Ikhlas
const alIkhlasVerses: Verse[] = [
  { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Sprich: Er ist Allah, ein Einziger" },
  { number: 2, arabic: "اللَّهُ الصَّمَدُ", translation: "Allah, der Absolute" },
  { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "Er zeugt nicht und ist nicht gezeugt worden" },
  { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", translation: "und Ihm ebenbürtig ist keiner" },
];

// Ayat al-Kursi
const ayatAlKursi: Verse[] = [
  { 
    number: 255, 
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", 
    translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist. Wer ist es, der bei Ihm Fürsprache einlegen könnte außer mit Seiner Erlaubnis? Er weiß, was vor ihnen und was hinter ihnen liegt, und sie umfassen nichts von Seinem Wissen, außer was Er will. Sein Thron umfasst die Himmel und die Erde, und ihre Behütung beschwert Ihn nicht. Und Er ist der Erhabene, der Gewaltige." 
  },
];

const QuranPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [showAyatKursi, setShowAyatKursi] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const getVersesForSurah = (surahNumber: number): Verse[] => {
    switch (surahNumber) {
      case 1: return alFatihaVerses;
      case 112: return alIkhlasVerses;
      default: return alFatihaVerses; // Fallback
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Audio playback would be implemented with actual Quran audio API
  };

  const goBack = () => {
    if (showAyatKursi) {
      setShowAyatKursi(false);
    } else if (selectedSurah) {
      setSelectedSurah(null);
      setCurrentVerse(0);
    } else {
      navigate("/app");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary/95 to-accent">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-primary/95 backdrop-blur-xl border-b border-white/10 px-4 py-4"
      >
        <div className="flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
            className="p-2 rounded-full bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-white">
              {showAyatKursi ? "Ayat al-Kursi" : selectedSurah ? selectedSurah.name : (language === "bs" ? "Kur'an" : "Quran")}
            </h1>
            {selectedSurah && (
              <p className="text-white/70 text-sm font-arabic">{selectedSurah.arabicName}</p>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Surah List View */}
        {!selectedSurah && !showAyatKursi && (
          <motion.div
            key="surah-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 pb-24"
          >
            {/* Ayat al-Kursi Special Card */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAyatKursi(true)}
              className="w-full mb-6 p-5 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/20 border border-amber-400/30 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-xs mb-1">{language === "bs" ? "Posebna Ajeta" : "Besonderer Vers"}</p>
                  <h3 className="text-xl font-bold text-white">Ayat al-Kursi</h3>
                  <p className="text-white/70 text-sm font-arabic mt-1">آية الكرسي</p>
                </div>
                <div className="p-3 rounded-full bg-amber-500/30">
                  <BookOpen className="w-6 h-6 text-amber-200" />
                </div>
              </div>
            </motion.button>

            <h2 className="text-white/80 font-semibold mb-4 px-1">
              {language === "bs" ? "Sure" : "Suren"}
            </h2>

            <div className="space-y-3">
              {surahs.map((surah, index) => (
                <motion.button
                  key={surah.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSurah(surah)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <span className="text-white font-bold">{surah.number}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-semibold">{surah.name}</h3>
                    <p className="text-white/60 text-xs">
                      {surah.verses} {language === "bs" ? "ajeta" : "Verse"} • {surah.type}
                    </p>
                  </div>
                  <p className="text-white/80 text-lg font-arabic">{surah.arabicName}</p>
                  <ChevronRight className="w-5 h-5 text-white/40" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Ayat al-Kursi View */}
        {showAyatKursi && (
          <motion.div
            key="ayat-kursi"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 pb-24"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <p className="text-xs text-white/50 mb-2">
                {language === "bs" ? "Sura Al-Baqarah, Ajet" : "Sure Al-Baqarah, Vers"} 255
              </p>
              {ayatAlKursi.map((verse) => (
                <div key={verse.number} className="space-y-6">
                  <p className="text-2xl text-white leading-loose font-arabic text-right">
                    {verse.arabic}
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white/80 text-base leading-relaxed">
                      {verse.translation}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Audio Controls */}
            <div className="mt-6 flex justify-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayPause}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/20"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
                <span className="text-white font-medium">
                  {isPlaying 
                    ? (language === "bs" ? "Pauziraj" : "Pause") 
                    : (language === "bs" ? "Slušaj" : "Anhören")}
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Surah Detail View */}
        {selectedSurah && (
          <motion.div
            key="surah-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 pb-32"
          >
            {/* Bismillah */}
            {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
              <div className="text-center py-6">
                <p className="text-2xl text-white/90 font-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              </div>
            )}

            {/* Verses */}
            <div className="space-y-6">
              {getVersesForSurah(selectedSurah.number).map((verse, index) => (
                <motion.div
                  key={verse.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-5 rounded-2xl border transition-all ${
                    currentVerse === index 
                      ? "bg-white/20 border-white/30" 
                      : "bg-white/10 border-white/10"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {verse.number}
                    </span>
                  </div>
                  <p className="text-xl text-white leading-loose font-arabic text-right mb-4">
                    {verse.arabic}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {verse.translation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Player Bar - Fixed at bottom when surah is selected */}
      {(selectedSurah || showAyatKursi) && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border p-4 safe-area-inset-bottom"
        >
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">
                  {showAyatKursi ? "Ayat al-Kursi" : selectedSurah?.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {language === "bs" ? "Tilavat" : "Rezitation"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuranPage;
