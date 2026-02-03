import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Heart, Copy, Check, Moon, Sun, Utensils, Home, Car, Bed } from "lucide-react";
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
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah",
    translation: "Wir sind in den Morgen gekommen und die Herrschaft gehört Allah.",
    translationBs: "Osvanuli smo, a i vlast pripada Allahu. Hvala Allahu.",
    category: "morning",
    icon: Sun,
  },
  {
    id: "evening",
    title: "Abendgebet",
    titleBs: "Večernja dova",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah",
    translation: "Wir sind in den Abend gekommen und die Herrschaft gehört Allah.",
    translationBs: "Omrknuli smo, a i vlast pripada Allahu.",
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
    id: "entering-home",
    title: "Beim Betreten des Hauses",
    titleBs: "Pri ulasku u kuću",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna",
    translation: "Im Namen Allahs treten wir ein, im Namen Allahs gehen wir hinaus.",
    translationBs: "U ime Allaha ulazimo, u ime Allaha izlazimo.",
    category: "home",
    icon: Home,
  },
  {
    id: "travel",
    title: "Reisegebet",
    titleBs: "Dova za putovanje",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَـٰذَا",
    transliteration: "Subhanal-ladhi sakhkhara lana hadha",
    translation: "Gepriesen sei Der, Der uns dies dienstbar gemacht hat.",
    translationBs: "Slavljen neka je Onaj koji nam je ovo potčinio.",
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
];

const categories = [
  { id: "all", label: "Alle", labelBs: "Sve" },
  { id: "morning", label: "Morgen", labelBs: "Jutro" },
  { id: "evening", label: "Abend", labelBs: "Večer" },
  { id: "food", label: "Essen", labelBs: "Jelo" },
  { id: "home", label: "Zuhause", labelBs: "Kuća" },
  { id: "travel", label: "Reise", labelBs: "Put" },
  { id: "sleep", label: "Schlaf", labelBs: "San" },
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
            {selectedDua 
              ? (language === "bs" ? selectedDua.titleBs : selectedDua.title)
              : (language === "bs" ? "Dove" : "Duas")}
          </h1>
          <div className="w-16" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Dua List */}
        {!selectedDua && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-8"
          >
            {/* Category Filter - iOS Segmented Control Style */}
            <div className="px-4 pt-4 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {language === "bs" ? cat.labelBs : cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dua List */}
            <div className="mt-4 bg-card mx-4 rounded-2xl overflow-hidden border border-border">
              {filteredDuas.map((dua, index) => {
                const Icon = dua.icon;
                return (
                  <motion.button
                    key={dua.id}
                    whileTap={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    onClick={() => setSelectedDua(dua)}
                    className="w-full flex items-center px-4 py-4 border-b border-border/50 last:border-b-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mr-3">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-foreground">
                        {language === "bs" ? dua.titleBs : dua.title}
                      </p>
                      <p className="text-xs text-muted-foreground font-arabic truncate mt-0.5">
                        {dua.arabic.substring(0, 30)}...
                      </p>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-muted-foreground/50 rotate-180" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Dua Detail */}
        {selectedDua && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 pb-8"
          >
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {/* Arabic */}
              <div className="p-5 border-b border-border">
                <p className="text-xs text-muted-foreground mb-3">{language === "bs" ? "Arapski" : "Arabisch"}</p>
                <p className="text-xl text-foreground font-arabic text-right leading-loose">
                  {selectedDua.arabic}
                </p>
                <button
                  onClick={() => copyToClipboard(selectedDua.arabic, `${selectedDua.id}-ar`)}
                  className="mt-3 flex items-center gap-2 text-primary text-sm"
                >
                  {copiedId === `${selectedDua.id}-ar` ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {language === "bs" ? "Kopiraj" : "Kopieren"}
                </button>
              </div>

              {/* Transliteration */}
              <div className="p-5 border-b border-border">
                <p className="text-xs text-muted-foreground mb-2">{language === "bs" ? "Izgovor" : "Aussprache"}</p>
                <p className="text-foreground italic">{selectedDua.transliteration}</p>
              </div>

              {/* Translation */}
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-2">{language === "bs" ? "Prijevod" : "Übersetzung"}</p>
                <p className="text-muted-foreground leading-relaxed">
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
