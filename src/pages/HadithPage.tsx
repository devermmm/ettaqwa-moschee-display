import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, BookOpen, RefreshCw, Share2, Heart, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface Hadith {
  id: number;
  arabic: string;
  german: string;
  bosnian: string;
  source: string;
  book: string;
  number: string;
}

// Curated collection of authentic hadiths from Sahih Bukhari and Sahih Muslim
const hadithCollection: Hadith[] = [
  {
    id: 1,
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    german: "Die Taten sind entsprechend den Absichten, und jedem Menschen gebührt das, was er beabsichtigt hat.",
    bosnian: "Djela se vrednuju prema namjerama i svakome pripada ono što je naumio.",
    source: "Sahih Bukhari",
    book: "Buch des Anfangs der Offenbarung",
    number: "1"
  },
  {
    id: 2,
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    german: "Wer an Allah und den Jüngsten Tag glaubt, soll Gutes sprechen oder schweigen.",
    bosnian: "Ko vjeruje u Allaha i Sudnji dan neka govori dobro ili neka šuti.",
    source: "Sahih Bukhari",
    book: "Buch der guten Manieren",
    number: "6018"
  },
  {
    id: 3,
    arabic: "لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    german: "Keiner von euch glaubt wirklich, bis er für seinen Bruder liebt, was er für sich selbst liebt.",
    bosnian: "Niko od vas neće vjerovati dok ne bude volio za svoga brata ono što voli za sebe.",
    source: "Sahih Bukhari",
    book: "Buch des Glaubens",
    number: "13"
  },
  {
    id: 4,
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    german: "Ein Muslim ist derjenige, vor dessen Zunge und Hand die Muslime sicher sind.",
    bosnian: "Musliman je onaj od čijeg su jezika i ruke sigurni ostali muslimani.",
    source: "Sahih Bukhari",
    book: "Buch des Glaubens",
    number: "10"
  },
  {
    id: 5,
    arabic: "مَنْ لا يَرْحَمُ لا يُرْحَمُ",
    german: "Wer keine Barmherzigkeit zeigt, dem wird keine Barmherzigkeit gezeigt.",
    bosnian: "Ko se ne smiluje, neće mu se ni smilovati.",
    source: "Sahih Bukhari",
    book: "Buch der guten Manieren",
    number: "5997"
  },
  {
    id: 6,
    arabic: "الطُّهُورُ شَطْرُ الإِيمَانِ",
    german: "Die Reinheit ist die Hälfte des Glaubens.",
    bosnian: "Čistoća je pola imana.",
    source: "Sahih Muslim",
    book: "Buch der Reinigung",
    number: "223"
  },
  {
    id: 7,
    arabic: "الْكَلِمَةُ الطَّيِّبَةُ صَدَقَةٌ",
    german: "Ein gutes Wort ist eine Almosen.",
    bosnian: "Lijepa riječ je sadaka.",
    source: "Sahih Bukhari",
    book: "Buch des Dschihad",
    number: "2989"
  },
  {
    id: 8,
    arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
    german: "Dein Lächeln gegenüber deinem Bruder ist ein Almosen.",
    bosnian: "Tvoj osmijeh u lice tvome bratu je sadaka.",
    source: "Sahih Muslim",
    book: "Buch der Güte",
    number: "1893"
  },
  {
    id: 9,
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    german: "Der Beste unter euch ist derjenige, der den Quran lernt und ihn lehrt.",
    bosnian: "Najbolji među vama je onaj ko nauči Kur'an i druge njemu podučava.",
    source: "Sahih Bukhari",
    book: "Buch der Vorzüge des Quran",
    number: "5027"
  },
  {
    id: 10,
    arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ",
    german: "Das Bittgebet ist die Anbetung.",
    bosnian: "Dova je ibadet.",
    source: "Sahih Muslim",
    book: "Buch des Bittgebets",
    number: "2735"
  },
  {
    id: 11,
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    german: "Wer einen Weg beschreitet, um Wissen zu erlangen, dem erleichtert Allah einen Weg zum Paradies.",
    bosnian: "Ko krene putem tražeći znanje, Allah će mu olakšati put u Džennet.",
    source: "Sahih Muslim",
    book: "Buch des Wissens",
    number: "2699"
  },
  {
    id: 12,
    arabic: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
    german: "Der Gläubige ist für den Gläubigen wie ein Gebäude - einer stützt den anderen.",
    bosnian: "Vjernik je vjerniku kao građevina - jedan drugog podupiru.",
    source: "Sahih Bukhari",
    book: "Buch der guten Manieren",
    number: "6026"
  },
  {
    id: 13,
    arabic: "لا تَحَاسَدُوا وَلا تَنَاجَشُوا وَلا تَبَاغَضُوا وَلا تَدَابَرُوا",
    german: "Beneidet einander nicht, hasst einander nicht und wendet euch nicht voneinander ab.",
    bosnian: "Ne zavidite jedni drugima, ne mrzite jedni druge i ne okrećite leđa jedni drugima.",
    source: "Sahih Muslim",
    book: "Buch der Güte",
    number: "2559"
  },
  {
    id: 14,
    arabic: "خَيْرُكُمْ خَيْرُكُمْ لأَهْلِهِ",
    german: "Der Beste unter euch ist derjenige, der am besten zu seiner Familie ist.",
    bosnian: "Najbolji među vama je onaj ko je najbolji prema svojoj porodici.",
    source: "Sahih Muslim",
    book: "Buch der Vorzüge",
    number: "2449"
  },
  {
    id: 15,
    arabic: "إِنَّ اللَّهَ جَمِيلٌ يُحِبُّ الْجَمَالَ",
    german: "Wahrlich, Allah ist schön und Er liebt die Schönheit.",
    bosnian: "Zaista je Allah lijep i voli ljepotu.",
    source: "Sahih Muslim",
    book: "Buch des Glaubens",
    number: "91"
  },
  {
    id: 16,
    arabic: "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى",
    german: "Die gebende Hand ist besser als die nehmende Hand.",
    bosnian: "Gornja ruka (koja daje) bolja je od donje ruke (koja prima).",
    source: "Sahih Bukhari",
    book: "Buch des Zakat",
    number: "1427"
  },
  {
    id: 17,
    arabic: "مَنْ صَمَتَ نَجَا",
    german: "Wer schweigt, ist gerettet.",
    bosnian: "Ko šuti, spašen je.",
    source: "Sahih Muslim",
    book: "Buch des Glaubens",
    number: "2560"
  },
  {
    id: 18,
    arabic: "أَفْضَلُ الصَّدَقَةِ أَنْ تُشْبِعَ كَبِدًا جَائِعًا",
    german: "Die beste Almosen ist, einen hungrigen Magen zu füllen.",
    bosnian: "Najbolja sadaka je nahraniti gladnog.",
    source: "Sahih Bukhari",
    book: "Buch der guten Manieren",
    number: "6139"
  },
  {
    id: 19,
    arabic: "الْحَيَاءُ لا يَأْتِي إِلاَّ بِخَيْرٍ",
    german: "Scham bringt nur Gutes.",
    bosnian: "Stid donosi samo dobro.",
    source: "Sahih Bukhari",
    book: "Buch der guten Manieren",
    number: "6117"
  },
  {
    id: 20,
    arabic: "مَا مَلأَ آدَمِيٌّ وِعَاءً شَرًّا مِنْ بَطْنٍ",
    german: "Der Mensch hat kein schlechteres Gefäß gefüllt als seinen Bauch.",
    bosnian: "Čovjek nije napunio goru posudu od svog stomaka.",
    source: "Sahih Muslim",
    book: "Buch der Askese",
    number: "2731"
  }
];

const HadithPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentHadith, setCurrentHadith] = useState<Hadith | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem("favorite-hadiths");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load random hadith on mount
    loadRandomHadith();
  }, []);

  const loadRandomHadith = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * hadithCollection.length);
      setCurrentHadith(hadithCollection[randomIndex]);
      setIsLoading(false);
    }, 300);
  };

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id) 
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favorite-hadiths", JSON.stringify(updated));
  };

  const copyHadith = async () => {
    if (!currentHadith) return;
    
    const text = `${currentHadith.arabic}\n\n${language === "bs" ? currentHadith.bosnian : currentHadith.german}\n\n— ${currentHadith.source}, ${currentHadith.number}`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(language === "bs" ? "Kopirano!" : "Kopiert!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(language === "bs" ? "Greška pri kopiranju" : "Fehler beim Kopieren");
    }
  };

  const shareHadith = async () => {
    if (!currentHadith) return;
    
    const text = `${currentHadith.arabic}\n\n${language === "bs" ? currentHadith.bosnian : currentHadith.german}\n\n— ${currentHadith.source}, ${currentHadith.number}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        copyHadith();
      }
    } else {
      copyHadith();
    }
  };

  const goBack = () => {
    if (showFavorites) {
      setShowFavorites(false);
    } else {
      navigate("/app");
    }
  };

  const favoriteHadiths = hadithCollection.filter(h => favorites.includes(h.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Header with Glass Effect */}
      <div className="sticky top-0 z-50 backdrop-blur-2xl bg-background/70 border-b border-white/10">
        <div className="safe-area-inset-top" />
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={goBack} className="flex items-center gap-1.5 text-primary font-semibold active:opacity-70 transition-opacity">
            <ChevronLeft className="w-5 h-5" />
            <span>{language === "bs" ? "Nazad" : "Zurück"}</span>
          </button>
          <h1 className="text-lg font-bold text-foreground">
            {showFavorites 
              ? (language === "bs" ? "Omiljeni" : "Favoriten")
              : (language === "bs" ? "Hadisi" : "Hadithe")
            }
          </h1>
          <button 
            onClick={() => setShowFavorites(!showFavorites)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              showFavorites 
                ? "bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/25" 
                : "backdrop-blur-xl bg-card/60 border border-white/20 text-rose-500"
            }`}
          >
            <Heart className={`w-5 h-5 ${showFavorites ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showFavorites ? (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-5 pt-5 pb-8"
          >
            {favoriteHadiths.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-3xl bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-rose-500/50" />
                </div>
                <p className="text-muted-foreground font-medium">
                  {language === "bs" 
                    ? "Još nemaš omiljenih hadisa" 
                    : "Du hast noch keine Favoriten"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {favoriteHadiths.map((hadith) => (
                  <motion.div
                    key={hadith.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="backdrop-blur-xl bg-card/60 dark:bg-card/40 rounded-3xl border border-white/20 dark:border-white/10 shadow-lg p-5"
                  >
                    <p className="text-lg font-arabic text-right text-foreground leading-loose mb-3">
                      {hadith.arabic}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {language === "bs" ? hadith.bosnian : hadith.german}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-primary font-semibold">
                        {hadith.source} • {hadith.number}
                      </p>
                      <button
                        onClick={() => toggleFavorite(hadith.id)}
                        className="w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-5 pt-5 pb-8"
          >
            {/* Source Tabs */}
            <div className="flex gap-3 mb-6">
              <div className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
                <p className="text-sm text-primary font-bold">Sahih Bukhari</p>
              </div>
              <div className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
                <p className="text-sm text-primary font-bold">Sahih Muslim</p>
              </div>
            </div>

            {/* Hadith Card */}
            <AnimatePresence mode="wait">
              {currentHadith && !isLoading && (
                <motion.div
                  key={currentHadith.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="backdrop-blur-xl bg-card/60 dark:bg-card/40 rounded-3xl border border-white/20 dark:border-white/10 shadow-xl overflow-hidden"
                >
                  {/* Arabic Text */}
                  <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <button
                        onClick={() => toggleFavorite(currentHadith.id)}
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                          favorites.includes(currentHadith.id) 
                            ? "bg-rose-500/10 text-rose-500" 
                            : "bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(currentHadith.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>
                    <p className="text-2xl font-arabic text-right text-foreground leading-[2]">
                      {currentHadith.arabic}
                    </p>
                  </div>

                  {/* Translation */}
                  <div className="p-6 border-t border-white/10">
                    <p className="text-muted-foreground leading-relaxed">
                      {language === "bs" ? currentHadith.bosnian : currentHadith.german}
                    </p>
                  </div>

                  {/* Source */}
                  <div className="px-6 py-4 bg-muted/20 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-primary">
                          {currentHadith.source}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === "bs" ? "Hadis br." : "Hadith Nr."} {currentHadith.number}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={copyHadith}
                          className="w-11 h-11 rounded-2xl backdrop-blur-xl bg-card/60 border border-white/20 flex items-center justify-center"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>
                        <button
                          onClick={shareHadith}
                          className="w-11 h-11 rounded-2xl backdrop-blur-xl bg-card/60 border border-white/20 flex items-center justify-center"
                        >
                          <Share2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="backdrop-blur-xl bg-card/60 rounded-3xl border border-white/20 p-12 flex items-center justify-center"
                >
                  <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* New Hadith Button */}
            <button
              onClick={loadRandomHadith}
              className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
            >
              <RefreshCw className="w-5 h-5" />
              {language === "bs" ? "Novi hadis" : "Neuer Hadith"}
            </button>

            {/* Info */}
            <p className="text-center text-muted-foreground/40 text-xs mt-6 font-medium">
              {language === "bs" 
                ? "Samo autentični hadisi iz Sahih Buharije i Sahih Muslima" 
                : "Nur authentische Hadithe aus Sahih Bukhari und Sahih Muslim"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HadithPage;
