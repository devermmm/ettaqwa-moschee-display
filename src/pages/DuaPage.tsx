import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Heart, 
  Copy, 
  Check, 
  Moon, 
  Sun, 
  Utensils, 
  Home, 
  Car, 
  Bed,
  Shield,
  Sparkles,
  BookOpen,
  Coffee,
  Droplets,
  Clock,
  Baby,
  HeartHandshake,
  Stethoscope,
  Volume2,
  ChevronRight
} from "lucide-react";
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
  source?: string;
}

const duas: Dua[] = [
  // Morning & Evening
  {
    id: "morning-1",
    title: "Morgengebet",
    titleBs: "Jutarnja dova",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    transliteration: "Asbahna wa asbahal-mulku lillahi, walhamdu lillahi, la ilaha illallahu wahdahu la sharika lah",
    translation: "Wir sind in den Morgen gekommen und die Herrschaft gehört Allah. Alles Lob gebührt Allah. Es gibt keinen Gott außer Allah, Er ist einzig, ohne Partner.",
    translationBs: "Osvanuli smo, a i vlast pripada Allahu. Hvala Allahu. Nema boga osim Allaha, Jedinog, koji nema sudruga.",
    category: "morning",
    icon: Sun,
    source: "Muslim"
  },
  {
    id: "morning-2",
    title: "Schutzgebet (Morgen)",
    titleBs: "Zaštitna dova (jutro)",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un fil-ardi wa la fis-sama'i wa huwas-sami'ul-'alim",
    translation: "Im Namen Allahs, mit dessen Namen nichts auf der Erde und im Himmel schaden kann. Er ist der Allhörende, der Allwissende.",
    translationBs: "U ime Allaha, s čijim imenom ništa na Zemlji niti na nebu ne može nauditi. On je Onaj koji sve čuje i sve zna.",
    category: "morning",
    icon: Shield,
    source: "Abu Dawud, Tirmidhi"
  },
  {
    id: "evening-1",
    title: "Abendgebet",
    titleBs: "Večernja dova",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    transliteration: "Amsayna wa amsal-mulku lillahi, walhamdu lillahi, la ilaha illallahu wahdahu la sharika lah",
    translation: "Wir sind in den Abend gekommen und die Herrschaft gehört Allah. Alles Lob gebührt Allah. Es gibt keinen Gott außer Allah, Er ist einzig.",
    translationBs: "Omrknuli smo, a i vlast pripada Allahu. Hvala Allahu. Nema boga osim Allaha, Jedinog.",
    category: "evening",
    icon: Moon,
    source: "Muslim"
  },
  {
    id: "evening-2",
    title: "Ayatul Kursi (Abends)",
    titleBs: "Ajetul Kursi (večer)",
    arabic: "اللَّهُ لاَ إِلَٰهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...",
    transliteration: "Allahu la ilaha illa huwal-hayyul-qayyum...",
    translation: "Allah - es gibt keinen Gott außer Ihm, dem Lebendigen, dem Beständigen...",
    translationBs: "Allah je - nema boga osim Njega - Živi i Vječni...",
    category: "evening",
    icon: Sparkles,
    source: "Al-Baqarah 2:255"
  },
  // Food & Drink
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
    source: "Abu Dawud"
  },
  {
    id: "after-eating",
    title: "Nach dem Essen",
    titleBs: "Poslije jela",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
    translation: "Alles Lob gebührt Allah, der uns speiste, uns tränkte und uns zu Muslimen machte.",
    translationBs: "Hvala Allahu koji nas je nahranio, napojio i učinio muslimanima.",
    category: "food",
    icon: Coffee,
    source: "Tirmidhi"
  },
  {
    id: "drinking-water",
    title: "Nach dem Trinken",
    titleBs: "Poslije pića",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي سَقَانَا عَذْبًا فُرَاتًا بِرَحْمَتِهِ",
    transliteration: "Alhamdu lillahil-ladhi saqana 'adhban furatan birahmatih",
    translation: "Alles Lob gebührt Allah, der uns durch Seine Barmherzigkeit süßes, wohlschmeckendes Wasser zu trinken gab.",
    translationBs: "Hvala Allahu koji nas je Svojom milošću napojio slatkom vodom.",
    category: "food",
    icon: Droplets,
    source: "Ibn Majah"
  },
  // Home
  {
    id: "entering-home",
    title: "Beim Betreten des Hauses",
    titleBs: "Pri ulasku u kuću",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'alallahi rabbina tawakkalna",
    translation: "Im Namen Allahs treten wir ein, im Namen Allahs gehen wir hinaus, und auf Allah, unseren Herrn, vertrauen wir.",
    translationBs: "U ime Allaha ulazimo, u ime Allaha izlazimo, i na Allaha, Gospodara našeg, se oslanjamo.",
    category: "home",
    icon: Home,
    source: "Abu Dawud"
  },
  {
    id: "leaving-home",
    title: "Beim Verlassen des Hauses",
    titleBs: "Pri izlasku iz kuće",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
    transliteration: "Bismillahi, tawakkaltu 'alallahi, wa la hawla wa la quwwata illa billah",
    translation: "Im Namen Allahs. Ich vertraue auf Allah. Es gibt keine Macht und keine Kraft außer bei Allah.",
    translationBs: "U ime Allaha. Oslanjam se na Allaha. Nema snage ni moći osim uz Allahovu pomoć.",
    category: "home",
    icon: Home,
    source: "Tirmidhi"
  },
  // Travel
  {
    id: "travel-1",
    title: "Reisegebet",
    titleBs: "Dova za putovanje",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَـٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
    transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun",
    translation: "Gepriesen sei Der, Der uns dies dienstbar gemacht hat, wir hätten es nicht bezwingen können. Und zu unserem Herrn werden wir gewiss zurückkehren.",
    translationBs: "Slavljen neka je Onaj koji nam je ovo potčinio, mi to sami ne bismo mogli učiniti. I mi ćemo se Gospodaru našem sigurno vratiti.",
    category: "travel",
    icon: Car,
    source: "Az-Zukhruf 43:13-14"
  },
  // Sleep
  {
    id: "before-sleep-1",
    title: "Vor dem Schlafen",
    titleBs: "Prije spavanja",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Deinem Namen, o Allah, sterbe ich und lebe ich.",
    translationBs: "U Tvoje ime, Allahu, umirem i živim.",
    category: "sleep",
    icon: Bed,
    source: "Bukhari"
  },
  {
    id: "waking-up",
    title: "Beim Aufwachen",
    titleBs: "Pri buđenju",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    translation: "Alles Lob gebührt Allah, der uns lebendig gemacht hat, nachdem Er uns hat sterben lassen. Und zu Ihm ist die Auferstehung.",
    translationBs: "Hvala Allahu koji nas je oživio nakon što nas je usmrtio. Njemu se vraćamo.",
    category: "sleep",
    icon: Clock,
    source: "Bukhari"
  },
  // Health & Protection
  {
    id: "sick-person",
    title: "Für einen Kranken",
    titleBs: "Za bolesnika",
    arabic: "أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ، وَاشْفِ أَنْتَ الشَّافِي، لاَ شِفَاءَ إِلاَّ شِفَاؤُكَ، شِفَاءً لاَ يُغَادِرُ سَقَمًا",
    transliteration: "Adhhibil-ba'sa rabban-nasi, washfi antash-shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqama",
    translation: "Nimm das Leid weg, Herr der Menschen, und heile. Du bist der Heilende. Es gibt keine Heilung außer Deiner Heilung, eine Heilung, die keine Krankheit zurücklässt.",
    translationBs: "Otkloni bol, Gospodaru ljudi, i izliječi. Ti si Onaj koji liječi. Nema lijeka osim Tvog lijeka, lijeka koji ne ostavlja bolest.",
    category: "health",
    icon: Stethoscope,
    source: "Bukhari, Muslim"
  },
  {
    id: "protection",
    title: "Schutzgebet",
    titleBs: "Dova za zaštitu",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'udhu bikalimatil-lahit-tammati min sharri ma khalaq",
    translation: "Ich suche Zuflucht bei den vollkommenen Worten Allahs vor dem Übel dessen, was Er erschaffen hat.",
    translationBs: "Tražim zaštitu u Allahovim savršenim riječima od zla onoga što je stvorio.",
    category: "health",
    icon: Shield,
    source: "Muslim"
  },
  // Special Occasions
  {
    id: "newborn",
    title: "Für ein Neugeborenes",
    titleBs: "Za novorođenče",
    arabic: "بَارَكَ اللَّهُ لَكَ فِي الْمَوْهُوبِ لَكَ، وَشَكَرْتَ الْوَاهِبَ، وَبَلَغَ أَشُدَّهُ، وَرُزِقْتَ بِرَّهُ",
    transliteration: "Barakallahu laka fil-mawhubi lak, wa shakarta al-wahib, wa balagha ashuddahu, wa ruziqta birrah",
    translation: "Möge Allah dir Segen geben in dem, was dir geschenkt wurde. Mögest du dem Schenkenden dankbar sein, möge es stark werden und mögest du mit seiner Fürsorge gesegnet werden.",
    translationBs: "Neka ti Allah da berićet u onome što ti je darovano. Zahvali se Onome koji daruje, neka dostigne zrelost i neka ti bude podaren njegov dobrota.",
    category: "special",
    icon: Baby,
    source: "An-Nawawi"
  },
  {
    id: "gratitude",
    title: "Dankgebet",
    titleBs: "Dova zahvalnosti",
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    translation: "O Allah, hilf mir, Deiner zu gedenken, Dir zu danken und Dich auf beste Weise anzubeten.",
    translationBs: "Allahu, pomozi mi da Te spominjem, da Ti zahvaljujem i da Te na najbolji način obožavam.",
    category: "special",
    icon: HeartHandshake,
    source: "Abu Dawud"
  },
  {
    id: "knowledge",
    title: "Gebet für Wissen",
    titleBs: "Dova za znanje",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "Mein Herr, mehre mir mein Wissen.",
    translationBs: "Gospodaru moj, povećaj mi znanje.",
    category: "special",
    icon: BookOpen,
    source: "Ta-Ha 20:114"
  },
];

const categories = [
  { id: "all", label: "Alle", labelBs: "Sve", icon: Heart },
  { id: "morning", label: "Morgen", labelBs: "Jutro", icon: Sun },
  { id: "evening", label: "Abend", labelBs: "Večer", icon: Moon },
  { id: "food", label: "Essen", labelBs: "Jelo", icon: Utensils },
  { id: "home", label: "Zuhause", labelBs: "Kuća", icon: Home },
  { id: "travel", label: "Reise", labelBs: "Put", icon: Car },
  { id: "sleep", label: "Schlaf", labelBs: "San", icon: Bed },
  { id: "health", label: "Gesundheit", labelBs: "Zdravlje", icon: Shield },
  { id: "special", label: "Besondere", labelBs: "Posebne", icon: Sparkles },
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
          <button onClick={goBack} className="flex items-center gap-1 text-primary font-medium">
            <ChevronLeft className="w-5 h-5" />
            <span>{language === "bs" ? "Nazad" : "Zurück"}</span>
          </button>
          <h1 className="font-semibold text-foreground">
            {selectedDua 
              ? (language === "bs" ? selectedDua.titleBs : selectedDua.title)
              : (language === "bs" ? "Dove" : "Bittgebete")}
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
            {/* Category Filter - Grid Style */}
            <div className="px-4 pt-4">
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border text-foreground"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      <span className="text-xs font-medium">
                        {language === "bs" ? cat.labelBs : cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dua Count */}
            <div className="px-4 pt-4">
              <p className="text-xs text-muted-foreground">
                {filteredDuas.length} {language === "bs" ? "dova" : "Duas"}
              </p>
            </div>

            {/* Dua List */}
            <div className="mt-2 space-y-2 px-4">
              {filteredDuas.map((dua) => {
                const Icon = dua.icon;
                return (
                  <motion.button
                    key={dua.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDua(dua)}
                    className="w-full bg-card rounded-2xl border border-border p-4 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">
                          {language === "bs" ? dua.titleBs : dua.title}
                        </p>
                        <p className="text-sm text-muted-foreground font-arabic mt-1 line-clamp-1">
                          {dua.arabic}
                        </p>
                        {dua.source && (
                          <p className="text-xs text-muted-foreground/60 mt-1">
                            {dua.source}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                    </div>
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
            {/* Header Card */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = selectedDua.icon;
                  return (
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  );
                })()}
                <div>
                  <p className="text-white font-semibold text-lg">
                    {language === "bs" ? selectedDua.titleBs : selectedDua.title}
                  </p>
                  {selectedDua.source && (
                    <p className="text-white/70 text-sm">{selectedDua.source}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Arabic */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden mb-3">
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {language === "bs" ? "Arapski" : "Arabisch"}
                  </p>
                  <button
                    onClick={() => copyToClipboard(selectedDua.arabic, `${selectedDua.id}-ar`)}
                    className="flex items-center gap-1.5 text-primary text-sm font-medium"
                  >
                    {copiedId === `${selectedDua.id}-ar` ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {language === "bs" ? "Kopiraj" : "Kopieren"}
                  </button>
                </div>
                <p className="text-2xl text-foreground font-arabic text-right leading-[2.2]">
                  {selectedDua.arabic}
                </p>
              </div>
            </div>

            {/* Transliteration */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden mb-3">
              <div className="p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  {language === "bs" ? "Izgovor" : "Aussprache"}
                </p>
                <p className="text-foreground italic leading-relaxed">
                  {selectedDua.transliteration}
                </p>
              </div>
            </div>

            {/* Translation */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  {language === "bs" ? "Prijevod" : "Übersetzung"}
                </p>
                <p className="text-foreground leading-relaxed">
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
