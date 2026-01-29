import { useRef } from "react";
import { motion } from "framer-motion";

// Ayat al-Kursi (The Throne Verse) - Surah Al-Baqarah 2:255
const ayatAlKursi = {
  arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
  german: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen. Ihn überkommt weder Schlummer noch Schlaf. Ihm gehört, was in den Himmeln und was auf der Erde ist. Wer ist es, der bei Ihm Fürsprache einlegen könnte außer mit Seiner Erlaubnis? Er weiß, was vor ihnen und was hinter ihnen liegt, und sie umfassen nichts von Seinem Wissen, außer was Er will. Sein Thron umfasst die Himmel und die Erde, und ihre Bewahrung fällt Ihm nicht schwer. Er ist der Erhabene, der Gewaltige.",
  bosnian: "Allah je – nema boga osim Njega – Živi i Vječni! Ne obuzima Ga ni drijemež ni san! Njegovo je ono što je na nebesima i ono što je na Zemlji! Ko se može pred Njim zauzimati za nekoga bez dopuštenja Njegova?! On zna šta je bilo i prije njih i šta će biti poslije njih, a oni ne mogu obuhvatiti od Njegova znanja osim koliko On želi. Njegova Kursija obuhvaća i nebesa i Zemlju i Njemu ne dojadi njihovo čuvanje; On je Svevišnji, Veličanstveni!"
};

const QuranSlideshow = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
          آية الكرسي
        </h2>
        <p className="text-emerald-300/70 text-lg">
          Ayat al-Kursi (Al-Baqarah 2:255)
        </p>
      </motion.div>

      {/* Verse Container */}
      <div ref={containerRef} className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Arabic Text */}
          <p
            className="text-3xl md:text-4xl lg:text-5xl font-amiri text-white leading-loose mb-8 px-4"
            dir="rtl"
          >
            {ayatAlKursi.arabic}
          </p>

          {/* Translations Container */}
          <div className="space-y-4 mt-8 px-4">
            {/* German Translation */}
            <div className="p-4 rounded-xl bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wide">DE</span>
              <p className="text-lg md:text-xl text-emerald-100 mt-2 leading-relaxed">
                {ayatAlKursi.german}
              </p>
            </div>

            {/* Bosnian Translation */}
            <div className="p-4 rounded-xl bg-emerald-800/30 backdrop-blur-sm border border-emerald-500/20">
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wide">BS</span>
              <p className="text-lg md:text-xl text-emerald-100 mt-2 leading-relaxed">
                {ayatAlKursi.bosnian}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

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
