import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuranVerse {
  arabic: string;
  german: string;
  bosnian: string;
  verseNumber: number;
}

// Surah Al-Fatiha with translations
const alFatiha: QuranVerse[] = [
  {
    verseNumber: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    german: "Im Namen Allahs, des Allerbarmers, des Barmherzigen.",
    bosnian: "U ime Allaha, Milostivog, Samilosnog!"
  },
  {
    verseNumber: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    german: "Alles Lob gebührt Allah, dem Herrn der Welten,",
    bosnian: "Tebe, Allaha, Gospodara svjetova, hvalimo,"
  },
  {
    verseNumber: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    german: "dem Allerbarmer, dem Barmherzigen,",
    bosnian: "Milostivog, Samilosnog,"
  },
  {
    verseNumber: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    german: "dem Herrscher am Tage des Gerichts.",
    bosnian: "Vladara Dana sudnjeg,"
  },
  {
    verseNumber: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    german: "Dir allein dienen wir, und Dich allein bitten wir um Hilfe.",
    bosnian: "Tebi se klanjamo i od Tebe pomoć tražimo!"
  },
  {
    verseNumber: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    german: "Führe uns den geraden Weg,",
    bosnian: "Uputi nas na Pravi put,"
  },
  {
    verseNumber: 7,
    arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    german: "den Weg derer, denen Du Gnade erwiesen hast, nicht derer, die Deinen Zorn erregt haben, und nicht der Irregehenden.",
    bosnian: "put onih kojima si milost Svoju darovao, a ne onih koji su protiv sebe srdžbu izazvali, niti onih koji su zalutali!"
  }
];

const QuranSlideshow = () => {
  const { language } = useLanguage();
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-advance verses every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % alFatiha.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentVerse = alFatiha[currentVerseIndex];

  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 flex flex-col items-center justify-center overflow-hidden p-8">
      {/* Islamic Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="quran-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0L80 40L40 80L0 40Z" fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="0.5"/>
              <path d="M20 20L60 20L60 60L20 60Z" fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="40" cy="40" r="10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quran-pattern)"/>
        </svg>
      </div>

      {/* Surah Name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-200 mb-2">
          سورة الفاتحة
        </h2>
        <p className="text-emerald-300/70 text-lg">
          {language === "bs" ? "Sura El-Fatiha" : "Surah Al-Fatiha"}
        </p>
      </motion.div>

      {/* Current Verse Container */}
      <div ref={containerRef} className="relative z-10 w-full max-w-5xl">
        <motion.div
          key={currentVerseIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Verse Number Badge */}
          <div className="flex justify-center mb-6">
            <span className="w-14 h-14 rounded-full bg-emerald-700/50 border border-emerald-400/30 flex items-center justify-center text-emerald-200 text-xl font-bold">
              {currentVerse.verseNumber}
            </span>
          </div>

          {/* Arabic Text */}
          <p
            className="text-4xl md:text-5xl lg:text-6xl font-amiri text-white leading-relaxed mb-8 px-4"
            dir="rtl"
          >
            {currentVerse.arabic}
          </p>

          {/* Translations Container */}
          <div className="space-y-4 mt-8 px-4">
            {/* German Translation */}
            <div className="p-4 rounded-xl bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wide">DE</span>
              <p className="text-xl md:text-2xl text-emerald-100 mt-2 leading-relaxed">
                {currentVerse.german}
              </p>
            </div>

            {/* Bosnian Translation */}
            <div className="p-4 rounded-xl bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wide">BS</span>
              <p className="text-xl md:text-2xl text-emerald-100 mt-2 leading-relaxed">
                {currentVerse.bosnian}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Verse Progress Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-2 mt-8 relative z-10"
      >
        {alFatiha.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentVerseIndex 
                ? "w-8 bg-emerald-400" 
                : index < currentVerseIndex 
                  ? "w-3 bg-emerald-500/50" 
                  : "w-3 bg-emerald-700/50"
            }`}
          />
        ))}
      </motion.div>

      {/* Mosque Name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-emerald-300/60 text-sm font-semibold">
          DŽEMAT ET-TAQWA
        </p>
      </motion.div>
    </div>
  );
};

export default QuranSlideshow;
