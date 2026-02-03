import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, BookOpen, GraduationCap, Volume2, CheckCircle2, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface TajweedLesson {
  id: number;
  title: string;
  titleBs: string;
  arabicTitle: string;
  description: string;
  descriptionBs: string;
  category: string;
  rules: TajweedRule[];
  completed: boolean;
}

interface TajweedRule {
  name: string;
  nameBs: string;
  arabicName: string;
  explanation: string;
  explanationBs: string;
  example: string;
  exampleTranslation: string;
  color: string;
}

const tajweedLessons: TajweedLesson[] = [
  {
    id: 1,
    title: "Einführung in Tajweed",
    titleBs: "Uvod u Tedžvid",
    arabicTitle: "مقدمة في التجويد",
    description: "Grundlagen und Bedeutung der korrekten Quran-Rezitation",
    descriptionBs: "Osnove i značaj pravilnog učenja Kur'ana",
    category: "basics",
    completed: false,
    rules: [
      {
        name: "Was ist Tajweed?",
        nameBs: "Šta je Tedžvid?",
        arabicName: "ما هو التجويد؟",
        explanation: "Tajweed bedeutet wörtlich 'Verschönerung' oder 'Verbesserung'. Es bezeichnet die Wissenschaft der korrekten Aussprache der arabischen Buchstaben beim Quran-Rezitieren.",
        explanationBs: "Tedžvid doslovno znači 'uljepšavanje' ili 'poboljšanje'. Označava nauku o pravilnom izgovoru arapskih slova pri učenju Kur'ana.",
        example: "قَالَ رَسُولُ اللَّهِ",
        exampleTranslation: "Der Gesandte Allahs sagte",
        color: "bg-blue-500"
      },
      {
        name: "Warum Tajweed lernen?",
        nameBs: "Zašto učiti Tedžvid?",
        arabicName: "لماذا نتعلم التجويد؟",
        explanation: "Allah sagt im Quran: 'Und rezitiere den Quran mit bedächtiger Rezitation' (73:4). Tajweed hilft uns, den Quran so zu rezitieren, wie er offenbart wurde.",
        explanationBs: "Allah u Kur'anu kaže: 'I Kur'an izgovaraj polahko, razgovjetno' (73:4). Tedžvid nam pomaže da Kur'an učimo onako kako je objavljen.",
        example: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
        exampleTranslation: "Und rezitiere den Quran mit bedächtiger Rezitation",
        color: "bg-green-500"
      }
    ]
  },
  {
    id: 2,
    title: "Artikulationspunkte (Makharij)",
    titleBs: "Mjesta izlaska harfova (Meharidž)",
    arabicTitle: "مخارج الحروف",
    description: "Lerne, woher die arabischen Buchstaben kommen",
    descriptionBs: "Nauči odakle dolaze arapska slova",
    category: "makharij",
    completed: false,
    rules: [
      {
        name: "Kehle (Halq)",
        nameBs: "Grlo (Halk)",
        arabicName: "الحلق",
        explanation: "Sechs Buchstaben kommen aus der Kehle: ء ه ع ح غ خ - Von tief bis zur Oberseite der Kehle.",
        explanationBs: "Šest harfova izlazi iz grla: ء ه ع ح غ خ - Od dubine do vrha grla.",
        example: "أَعُوذُ بِاللَّهِ",
        exampleTranslation: "Ich suche Zuflucht bei Allah",
        color: "bg-red-500"
      },
      {
        name: "Zunge (Lisan)",
        nameBs: "Jezik (Lisan)",
        arabicName: "اللسان",
        explanation: "Die meisten Buchstaben kommen von der Zunge. Die Position der Zunge bestimmt den Buchstaben.",
        explanationBs: "Većina harfova izlazi iz jezika. Položaj jezika određuje harf.",
        example: "لَا إِلَٰهَ إِلَّا اللَّهُ",
        exampleTranslation: "Es gibt keinen Gott außer Allah",
        color: "bg-orange-500"
      },
      {
        name: "Lippen (Shafatain)",
        nameBs: "Usne (Šefetejn)",
        arabicName: "الشفتان",
        explanation: "Vier Buchstaben kommen von den Lippen: ب م و ف",
        explanationBs: "Četiri harfa izlaze iz usana: ب م و ف",
        example: "بِسْمِ اللَّهِ",
        exampleTranslation: "Im Namen Allahs",
        color: "bg-pink-500"
      }
    ]
  },
  {
    id: 3,
    title: "Eigenschaften der Buchstaben (Sifaat)",
    titleBs: "Svojstva harfova (Sifat)",
    arabicTitle: "صفات الحروف",
    description: "Die besonderen Eigenschaften jedes Buchstabens",
    descriptionBs: "Posebna svojstva svakog harfa",
    category: "sifaat",
    completed: false,
    rules: [
      {
        name: "Stärke (Qalqala)",
        nameBs: "Vibriranje (Kalkale)",
        arabicName: "القلقلة",
        explanation: "Fünf Buchstaben haben eine vibrierende Eigenschaft wenn sie Sukun haben: ق ط ب ج د (Qutub Jad)",
        explanationBs: "Pet harfova imaju vibriranje kad su sa sukunom: ق ط ب ج د (Kutub Džed)",
        example: "الْحَمْدُ لِلَّهِ",
        exampleTranslation: "Alles Lob gebührt Allah",
        color: "bg-purple-500"
      },
      {
        name: "Dehnung (Madd)",
        nameBs: "Dužina (Med)",
        arabicName: "المد",
        explanation: "Dehnung der Vokale. Der natürliche Madd ist 2 Harakaat lang.",
        explanationBs: "Produžavanje vokala. Prirodni med je 2 hareketa.",
        example: "قَالَ",
        exampleTranslation: "Er sagte",
        color: "bg-indigo-500"
      }
    ]
  },
  {
    id: 4,
    title: "Nun Sakinah & Tanwin",
    titleBs: "Nun Sakin i Tenvin",
    arabicTitle: "النون الساكنة والتنوين",
    description: "Regeln für Nun mit Sukun und Tanwin",
    descriptionBs: "Pravila za Nun sa sukunom i Tenvin",
    category: "nun-rules",
    completed: false,
    rules: [
      {
        name: "Izhar (Deutlich)",
        nameBs: "Izhar (Jasno)",
        arabicName: "الإظهار",
        explanation: "Klare Aussprache ohne Nasalierung bei 6 Kehlebuchstaben: ء ه ع ح غ خ",
        explanationBs: "Jasan izgovor bez nazalizacije kod 6 grlenih harfova: ء ه ع ح غ خ",
        example: "مَنْ آمَنَ",
        exampleTranslation: "Wer glaubt",
        color: "bg-emerald-500"
      },
      {
        name: "Idgham (Verschmelzung)",
        nameBs: "Idgam (Stapanje)",
        arabicName: "الإدغام",
        explanation: "Verschmelzung des Nun in den folgenden Buchstaben: ي ر م ل و ن (Yarmulun)",
        explanationBs: "Stapanje Nuna u sljedeći harf: ي ر م ل و ن (Jermelun)",
        example: "مِن رَّبِّهِمْ",
        exampleTranslation: "Von ihrem Herrn",
        color: "bg-teal-500"
      },
      {
        name: "Iqlab (Umwandlung)",
        nameBs: "Iklab (Pretvaranje)",
        arabicName: "الإقلاب",
        explanation: "Nun wird zu Mim umgewandelt vor dem Buchstaben Ba (ب)",
        explanationBs: "Nun se pretvara u Mim ispred harfa Ba (ب)",
        example: "مِنْ بَعْدِ",
        exampleTranslation: "Nach",
        color: "bg-cyan-500"
      },
      {
        name: "Ikhfa (Verbergen)",
        nameBs: "Ihfa (Skrivanje)",
        arabicName: "الإخفاء",
        explanation: "Nasale Aussprache bei den restlichen 15 Buchstaben",
        explanationBs: "Nazalni izgovor kod preostalih 15 harfova",
        example: "مِنْ قَبْلُ",
        exampleTranslation: "Vorher",
        color: "bg-sky-500"
      }
    ]
  },
  {
    id: 5,
    title: "Mim Sakinah",
    titleBs: "Mim Sakin",
    arabicTitle: "الميم الساكنة",
    description: "Regeln für Mim mit Sukun",
    descriptionBs: "Pravila za Mim sa sukunom",
    category: "mim-rules",
    completed: false,
    rules: [
      {
        name: "Ikhfa Shafawi",
        nameBs: "Ihfa Šefevi",
        arabicName: "الإخفاء الشفوي",
        explanation: "Mim wird leicht verborgen vor dem Buchstaben Ba (ب)",
        explanationBs: "Mim se lagano skriva ispred harfa Ba (ب)",
        example: "أَنتُمْ بِهِ",
        exampleTranslation: "Ihr damit",
        color: "bg-amber-500"
      },
      {
        name: "Idgham Mimi",
        nameBs: "Idgam Mimi",
        arabicName: "الإدغام الميمي",
        explanation: "Mim verschmilzt mit folgendem Mim",
        explanationBs: "Mim se stapa sa sljedećim Mimom",
        example: "لَكُمْ مَا",
        exampleTranslation: "Für euch was",
        color: "bg-yellow-500"
      },
      {
        name: "Izhar Shafawi",
        nameBs: "Izhar Šefevi",
        arabicName: "الإظهار الشفوي",
        explanation: "Klare Aussprache bei allen anderen Buchstaben",
        explanationBs: "Jasan izgovor kod svih ostalih harfova",
        example: "الْحَمْدُ لِلَّهِ",
        exampleTranslation: "Alles Lob gebührt Allah",
        color: "bg-lime-500"
      }
    ]
  },
  {
    id: 6,
    title: "Madd (Dehnung)",
    titleBs: "Med (Dužina)",
    arabicTitle: "أحكام المد",
    description: "Verschiedene Arten der Vokaldehnung",
    descriptionBs: "Različite vrste produžavanja vokala",
    category: "madd",
    completed: false,
    rules: [
      {
        name: "Madd Tabii (Natürlich)",
        nameBs: "Med Tabii (Prirodni)",
        arabicName: "المد الطبيعي",
        explanation: "Natürliche Dehnung von 2 Harakaat bei Alif, Waw, Ya",
        explanationBs: "Prirodno produžavanje od 2 hareketa kod Elifa, Vava, Ya",
        example: "قَالُوا",
        exampleTranslation: "Sie sagten",
        color: "bg-rose-500"
      },
      {
        name: "Madd Muttasil (Verbunden)",
        nameBs: "Med Muttasil (Povezani)",
        arabicName: "المد المتصل",
        explanation: "Dehnung von 4-5 Harakaat wenn Hamza im selben Wort folgt",
        explanationBs: "Produžavanje od 4-5 hareketa kad slijedi Hemze u istoj riječi",
        example: "جَاءَ",
        exampleTranslation: "Er kam",
        color: "bg-fuchsia-500"
      },
      {
        name: "Madd Munfasil (Getrennt)",
        nameBs: "Med Munfasil (Odvojeni)",
        arabicName: "المد المنفصل",
        explanation: "Dehnung von 4-5 Harakaat wenn Hamza im nächsten Wort folgt",
        explanationBs: "Produžavanje od 4-5 hareketa kad slijedi Hemze u sljedećoj riječi",
        example: "فِي أَنفُسِهِمْ",
        exampleTranslation: "In ihren Seelen",
        color: "bg-violet-500"
      }
    ]
  }
];

const TajweedPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedLesson, setSelectedLesson] = useState<TajweedLesson | null>(null);
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    const saved = localStorage.getItem("tajweed-completed");
    return saved ? JSON.parse(saved) : [];
  });

  const markLessonComplete = (lessonId: number) => {
    const updated = [...completedLessons, lessonId];
    setCompletedLessons(updated);
    localStorage.setItem("tajweed-completed", JSON.stringify(updated));
  };

  const goBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
      setCurrentRuleIndex(0);
    } else {
      navigate("/app");
    }
  };

  const nextRule = () => {
    if (selectedLesson && currentRuleIndex < selectedLesson.rules.length - 1) {
      setCurrentRuleIndex(currentRuleIndex + 1);
    } else if (selectedLesson) {
      markLessonComplete(selectedLesson.id);
      setSelectedLesson(null);
      setCurrentRuleIndex(0);
    }
  };

  const prevRule = () => {
    if (currentRuleIndex > 0) {
      setCurrentRuleIndex(currentRuleIndex - 1);
    }
  };

  const progressPercentage = (completedLessons.length / tajweedLessons.length) * 100;

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
            {selectedLesson 
              ? (language === "bs" ? selectedLesson.titleBs : selectedLesson.title)
              : (language === "bs" ? "Tedžvid Kurs" : "Tajweed Kurs")
            }
          </h1>
          <div className="w-16" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Lesson List */}
        {!selectedLesson && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 pb-8"
          >
            {/* Header Card */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {language === "bs" ? "Nauči Tedžvid" : "Lerne Tajweed"}
                  </h2>
                  <p className="text-white/70 text-sm">
                    {language === "bs" ? "Pravilno učenje Kur'ana" : "Korrekte Quran-Rezitation"}
                  </p>
                </div>
              </div>
              
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-white text-sm">
                  <span>{language === "bs" ? "Napredak" : "Fortschritt"}</span>
                  <span>{completedLessons.length}/{tajweedLessons.length} {language === "bs" ? "lekcija" : "Lektionen"}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Lessons */}
            <div className="space-y-3">
              {tajweedLessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id);
                return (
                  <motion.button
                    key={lesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedLesson(lesson)}
                    className="w-full bg-card rounded-2xl border border-border p-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCompleted ? "bg-green-500/20" : "bg-primary/10"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <span className="text-lg font-bold text-primary">{lesson.id}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {language === "bs" ? lesson.titleBs : lesson.title}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {language === "bs" ? lesson.descriptionBs : lesson.description}
                        </p>
                        <p className="text-xs text-primary mt-1">
                          {lesson.rules.length} {language === "bs" ? "pravila" : "Regeln"}
                        </p>
                      </div>
                      <p className="text-xl font-arabic text-muted-foreground">{lesson.arabicTitle}</p>
                      <ChevronRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Lesson Detail / Learning Mode */}
        {selectedLesson && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-4 pb-32"
          >
            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {selectedLesson.rules.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentRuleIndex 
                      ? "w-8 bg-primary" 
                      : index < currentRuleIndex 
                        ? "w-2 bg-primary/50" 
                        : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Current Rule Card */}
            {selectedLesson.rules[currentRuleIndex] && (
              <motion.div
                key={currentRuleIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                {/* Rule Header */}
                <div className={`p-5 ${selectedLesson.rules[currentRuleIndex].color}`}>
                  <p className="text-white/70 text-xs mb-1">
                    {language === "bs" ? "Pravilo" : "Regel"} {currentRuleIndex + 1}/{selectedLesson.rules.length}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {language === "bs" 
                      ? selectedLesson.rules[currentRuleIndex].nameBs 
                      : selectedLesson.rules[currentRuleIndex].name
                    }
                  </h3>
                  <p className="text-2xl font-arabic text-white/90">
                    {selectedLesson.rules[currentRuleIndex].arabicName}
                  </p>
                </div>

                {/* Rule Content */}
                <div className="p-5 space-y-5">
                  {/* Explanation */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      {language === "bs" ? "Objašnjenje" : "Erklärung"}
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {language === "bs" 
                        ? selectedLesson.rules[currentRuleIndex].explanationBs 
                        : selectedLesson.rules[currentRuleIndex].explanation
                      }
                    </p>
                  </div>

                  {/* Example */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      {language === "bs" ? "Primjer" : "Beispiel"}
                    </p>
                    <p className="text-3xl font-arabic text-center text-foreground mb-2 leading-loose">
                      {selectedLesson.rules[currentRuleIndex].example}
                    </p>
                    <p className="text-sm text-center text-muted-foreground">
                      {selectedLesson.rules[currentRuleIndex].exampleTranslation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={prevRule}
                disabled={currentRuleIndex === 0}
                className="flex-1 py-4 rounded-xl border border-border bg-card font-medium text-foreground disabled:opacity-30"
              >
                {language === "bs" ? "Prethodno" : "Zurück"}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={nextRule}
                className="flex-1 py-4 rounded-xl bg-primary font-medium text-primary-foreground"
              >
                {currentRuleIndex < selectedLesson.rules.length - 1 
                  ? (language === "bs" ? "Sljedeće" : "Weiter")
                  : (language === "bs" ? "Završi" : "Fertig")
                }
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TajweedPage;
