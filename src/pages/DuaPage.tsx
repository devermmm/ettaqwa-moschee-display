import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Copy, Check, Moon, Sun, Utensils, Home, Car, Bed, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { LucideIcon } from "lucide-react";

interface Dua {
  id: string;
  title: string;
  titleBs: string;
  arabic: string;
  transliteration: string;
  translation: string;
  translationBs: string;
  category: string;
  icon: LucideIcon;
}

const duas: Dua[] = [
  {
    id: "morning",
    title: "Morgengebet",
    titleBs: "Jutarnja dova",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah",
    translation: "Wir sind in den Morgen gekommen und die Herrschaft gehört Allah. Alles Lob gebührt Allah. Es gibt keinen Gott außer Allah, dem Einzigen, der keinen Partner hat.",
    translationBs: "Osvanuli smo, a i vlast pripada Allahu. Hvala Allahu. Nema boga osim Allaha, Jedinog, koji nema sudruga.",
    category: "morning",
    icon: Sun,
  },
  {
    id: "evening",
    title: "Abendgebet",
    titleBs: "Večernja dova",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah",
    translation: "Wir sind in den Abend gekommen und die Herrschaft gehört Allah. Alles Lob gebührt Allah. Es gibt keinen Gott außer Allah, dem Einzigen, der keinen Partner hat.",
    translationBs: "Omrknuli smo, a i vlast pripada Allahu. Hvala Allahu. Nema boga osim Allaha, Jedinog, koji nema sudruga.",
    category: "evening",
    icon: Moon,
  },
  {
    id: "before-eating",
    title: "Vor dem Essen",
    titleBs: "Prije jela",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    transliteration: "Bismillahi wa 'ala barakatillah",
    translation: "Im Namen Allahs und mit dem Segen Allahs.",
    translationBs: "U ime Allaha i uz Allahov blagoslov.",
    category: "food",
    icon: Utensils,
  },
  {
    id: "after-eating",
    title: "Nach dem Essen",
    titleBs: "Poslije jela",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
    translation: "Alles Lob gebührt Allah, Der uns gespeist und getränkt und uns zu Muslimen gemacht hat.",
    translationBs: "Hvala Allahu koji nas je nahranio i napojio i učinio muslimanima.",
    category: "food",
    icon: Utensils,
  },
  {
    id: "entering-home",
    title: "Beim Betreten des Hauses",
    titleBs: "Pri ulasku u kuću",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi rabbina tawakkalna",
    translation: "Im Namen Allahs treten wir ein, im Namen Allahs gehen wir hinaus, und auf Allah, unseren Herrn, vertrauen wir.",
    translationBs: "U ime Allaha ulazimo, u ime Allaha izlazimo, i na Allaha, Gospodara našeg, oslanjamo se.",
    category: "home",
    icon: Home,
  },
  {
    id: "leaving-home",
    title: "Beim Verlassen des Hauses",
    titleBs: "Pri izlasku iz kuće",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
    transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
    translation: "Im Namen Allahs. Ich vertraue auf Allah. Es gibt keine Macht und keine Kraft außer bei Allah.",
    translationBs: "U ime Allaha. Oslanjam se na Allaha. Nema snage ni moći osim Allahove.",
    category: "home",
    icon: Home,
  },
  {
    id: "travel",
    title: "Reisegebet",
    titleBs: "Dova za putovanje",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَـٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
    transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila Rabbina lamunqalibun",
    translation: "Gepriesen sei Der, Der uns dies dienstbar gemacht hat, denn wir hätten es nicht selbst bezwingen können. Und zu unserem Herrn werden wir gewiss zurückkehren.",
    translationBs: "Slavljen neka je Onaj koji nam je ovo potčinio, mi to sami ne bismo mogli učiniti. I mi ćemo se, zaista, Gospodaru svome vratiti.",
    category: "travel",
    icon: Car,
  },
  {
    id: "before-sleep",
    title: "Vor dem Schlafen",
    titleBs: "Prije spavanja",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Deinem Namen, o Allah, sterbe ich und lebe ich.",
    translationBs: "U Tvoje ime, Allahu, umirem i živim.",
    category: "sleep",
    icon: Bed,
  },
  {
    id: "waking-up",
    title: "Beim Aufwachen",
    titleBs: "Pri buđenju",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    translation: "Alles Lob gebührt Allah, Der uns zum Leben erweckt hat, nachdem Er uns hat sterben lassen, und zu Ihm ist die Auferstehung.",
    translationBs: "Hvala Allahu koji nas je oživio nakon što nas je usmrtio i Njemu se vraćamo.",
    category: "sleep",
    icon: Bed,
  },
];

const categories = [
  { id: "all", label: "Alle", labelBs: "Sve" },
  { id: "morning", label: "Morgen", labelBs: "Jutro" },
  { id: "evening", label: "Abend", labelBs: "Večer" },
  { id: "food", label: "Essen", labelBs: "Jelo" },
  { id: "home", label: "Zuhause", labelBs: "Kuća" },
  { id: "travel", label: "Reise", labelBs: "Putovanje" },
  { id: "sleep", label: "Schlaf", labelBs: "Spavanje" },
];

const DuaPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredDuas = selectedCategory === "all" 
    ? duas 
    : duas.filter(d => d.category === selectedCategory);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(language === "bs" ? "Kopirano!" : "Kopiert!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const goBack = () => {
    if (selectedDua) {
      setSelectedDua(null);
    } else {
      navigate("/app");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent via-accent/95 to-primary">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-accent/95 backdrop-blur-xl border-b border-white/10 px-4 py-4"
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
              {selectedDua 
                ? (language === "bs" ? selectedDua.titleBs : selectedDua.title)
                : (language === "bs" ? "Dove" : "Duas")}
            </h1>
            <p className="text-white/70 text-sm">
              {selectedDua 
                ? (language === "bs" ? "Bittgebet" : "Dua")
                : (language === "bs" ? "Dnevne dove" : "Tägliche Bittgebete")}
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Dua List View */}
        {!selectedDua && (
          <motion.div
            key="dua-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 pb-24"
          >
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-white text-accent"
                      : "bg-white/10 text-white/80"
                  }`}
                >
                  {language === "bs" ? cat.labelBs : cat.label}
                </motion.button>
              ))}
            </div>

            {/* Dua Cards */}
            <div className="space-y-3 mt-4">
              {filteredDuas.map((dua, index) => {
                const Icon = dua.icon;
                return (
                  <motion.button
                    key={dua.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDua(dua)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">
                        {language === "bs" ? dua.titleBs : dua.title}
                      </h3>
                      <p className="text-white/60 text-sm truncate font-arabic">
                        {dua.arabic.substring(0, 40)}...
                      </p>
                    </div>
                    <Heart className="w-5 h-5 text-white/30 shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Dua Detail View */}
        {selectedDua && (
          <motion.div
            key="dua-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 pb-24"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10 space-y-6">
              {/* Arabic Text */}
              <div>
                <p className="text-white/50 text-xs mb-2">{language === "bs" ? "Arapski" : "Arabisch"}</p>
                <p className="text-2xl text-white leading-loose font-arabic text-right">
                  {selectedDua.arabic}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(selectedDua.arabic, `${selectedDua.id}-arabic`)}
                  className="mt-2 flex items-center gap-2 text-white/50 text-sm"
                >
                  {copiedId === `${selectedDua.id}-arabic` ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {language === "bs" ? "Kopiraj" : "Kopieren"}
                </motion.button>
              </div>

              {/* Transliteration */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/50 text-xs mb-2">{language === "bs" ? "Transliteracija" : "Transliteration"}</p>
                <p className="text-white/90 text-base italic">
                  {selectedDua.transliteration}
                </p>
              </div>

              {/* Translation */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/50 text-xs mb-2">{language === "bs" ? "Prijevod" : "Übersetzung"}</p>
                <p className="text-white/80 text-base leading-relaxed">
                  {language === "bs" ? selectedDua.translationBs : selectedDua.translation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DuaPage;
