import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Play, Pause, BookOpen, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface Surah {
  number: number;
  name: string;
  arabicName: string;
  verses: number;
}

interface Verse {
  number: number;
  arabic: string;
  translation: string;
}

const surahs: Surah[] = [
  { number: 1, name: "Al-Fatiha", arabicName: "الفاتحة", verses: 7 },
  { number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", verses: 4 },
  { number: 113, name: "Al-Falaq", arabicName: "الفلق", verses: 5 },
  { number: 114, name: "An-Nas", arabicName: "الناس", verses: 6 },
  { number: 36, name: "Ya-Sin", arabicName: "يس", verses: 83 },
  { number: 55, name: "Ar-Rahman", arabicName: "الرحمن", verses: 78 },
  { number: 67, name: "Al-Mulk", arabicName: "الملك", verses: 30 },
];

const alFatihaVerses: Verse[] = [
  { number: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "Im Namen Allahs, des Allerbarmers, des Barmherzigen" },
  { number: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "Alles Lob gebührt Allah, dem Herrn der Welten" },
  { number: 3, arabic: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "dem Allerbarmer, dem Barmherzigen" },
  { number: 4, arabic: "مَالِكِ يَوْمِ الدِّينِ", translation: "dem Herrscher am Tag des Gerichts" },
  { number: 5, arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "Dir allein dienen wir, und Dich allein bitten wir um Hilfe" },
  { number: 6, arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Führe uns den geraden Weg" },
  { number: 7, arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "den Weg derer, denen Du Gnade erwiesen hast" },
];

const alIkhlasVerses: Verse[] = [
  { number: 1, arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Sprich: Er ist Allah, ein Einziger" },
  { number: 2, arabic: "اللَّهُ الصَّمَدُ", translation: "Allah, der Absolute" },
  { number: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "Er zeugt nicht und ist nicht gezeugt worden" },
  { number: 4, arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", translation: "und Ihm ebenbürtig ist keiner" },
];

const ayatAlKursi: Verse = { 
  number: 255, 
  arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", 
  translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist." 
};

const QuranPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [showAyatKursi, setShowAyatKursi] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const getVersesForSurah = (surahNumber: number): Verse[] => {
    switch (surahNumber) {
      case 1: return alFatihaVerses;
      case 112: return alIkhlasVerses;
      default: return alFatihaVerses;
    }
  };

  const goBack = () => {
    if (showAyatKursi) {
      setShowAyatKursi(false);
    } else if (selectedSurah) {
      setSelectedSurah(null);
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
          <button onClick={goBack} className="flex items-center gap-1 text-primary">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-[17px]">{language === "bs" ? "Nazad" : "Zurück"}</span>
          </button>
          <h1 className="font-semibold text-[17px] text-foreground absolute left-1/2 -translate-x-1/2">
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

            {/* Surah List */}
            <div className="mt-6 bg-card mx-4 rounded-2xl overflow-hidden border border-border">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground">{language === "bs" ? "Sure" : "Suren"}</p>
              </div>
              {surahs.map((surah, index) => (
                <motion.button
                  key={surah.number}
                  whileTap={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                  onClick={() => setSelectedSurah(surah)}
                  className="w-full flex items-center px-4 py-3.5 border-b border-border/50 last:border-b-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-primary">{surah.number}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{surah.name}</p>
                    <p className="text-xs text-muted-foreground">{surah.verses} {language === "bs" ? "ajeta" : "Verse"}</p>
                  </div>
                  <p className="text-lg text-muted-foreground font-arabic mr-2">{surah.arabicName}</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                </motion.button>
              ))}
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
            <div className="bg-card rounded-2xl border border-border p-5">
              <p className="text-xs text-muted-foreground mb-4">
                {language === "bs" ? "Sura Al-Baqarah, Ajet" : "Sure Al-Baqarah, Vers"} 255
              </p>
              <p className="text-xl text-foreground leading-loose font-arabic text-right mb-6">
                {ayatAlKursi.arabic}
              </p>
              <div className="border-t border-border pt-4">
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
            className="p-4 pb-32"
          >
            {/* Bismillah */}
            {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
              <div className="text-center py-4 mb-4">
                <p className="text-xl text-foreground font-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              </div>
            )}

            {/* Verses */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {getVersesForSurah(selectedSurah.number).map((verse, index) => (
                <div
                  key={verse.number}
                  className="p-4 border-b border-border/50 last:border-b-0"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                      {verse.number}
                    </span>
                  </div>
                  <p className="text-lg text-foreground font-arabic text-right leading-loose mb-3">
                    {verse.arabic}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {verse.translation}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Player - iOS style */}
      {(selectedSurah || showAyatKursi) && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border"
        >
          <div className="safe-area-inset-bottom" />
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {showAyatKursi ? "Ayat al-Kursi" : selectedSurah?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === "bs" ? "Tilavat" : "Rezitation"}
                </p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary-foreground" />
              ) : (
                <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuranPage;
