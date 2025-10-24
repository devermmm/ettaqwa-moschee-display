import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface QuranVerse {
  number: number;
  text: string;
  numberInSurah: number;
}

interface QuranTranslation {
  arabic: QuranVerse[];
  german: QuranVerse[];
  bosnian: QuranVerse[];
}

interface QuranTextDisplayProps {
  surahNumber: number;
  surahName: string;
  surahArabicName: string;
}

const QuranTextDisplay = ({ surahNumber, surahName, surahArabicName }: QuranTextDisplayProps) => {
  const [verses, setVerses] = useState<QuranTranslation | null>(null);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuranText = async () => {
      setLoading(true);
      try {
        // Fetch Arabic text
        const arabicResponse = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}`
        );
        const arabicData = await arabicResponse.json();

        // Fetch German translation
        const germanResponse = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/de.bubenheim`
        );
        const germanData = await germanResponse.json();

        // Fetch Bosnian translation
        const bosnianResponse = await fetch(
          `https://api.alquran.cloud/v1/surah/${surahNumber}/bs.korkut`
        );
        const bosnianData = await bosnianResponse.json();

        setVerses({
          arabic: arabicData.data.ayahs,
          german: germanData.data.ayahs,
          bosnian: bosnianData.data.ayahs,
        });
        setCurrentVerseIndex(0);
      } catch (error) {
        console.error("Error fetching Quran text:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuranText();
  }, [surahNumber]);

  // Auto-advance verses (approximate timing)
  useEffect(() => {
    if (!verses) return;

    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => {
        if (prev < verses.arabic.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 8000); // Advance every 8 seconds (approximate)

    return () => clearInterval(interval);
  }, [verses]);

  if (loading) {
    return (
      <Card className="p-6 bg-card/30 backdrop-blur-sm border border-border">
        <div className="text-center text-muted-foreground">
          <p className="font-inter">Lädt Quran-Text...</p>
        </div>
      </Card>
    );
  }

  if (!verses) {
    return null;
  }

  return (
    <Card className="p-4 bg-card/30 backdrop-blur-sm border border-border h-full">
      <div className="mb-4 text-center border-b border-border pb-3">
        <h3 className="text-xl font-amiri text-primary mb-1">{surahArabicName}</h3>
        <p className="text-sm font-inter text-muted-foreground">
          Surah {surahNumber}: {surahName}
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-6 pr-4">
          {verses.arabic.map((verse, index) => (
            <div
              key={verse.numberInSurah}
              className={`p-4 rounded-lg border transition-all duration-500 ${
                index === currentVerseIndex
                  ? "bg-primary/10 border-primary shadow-lg"
                  : "bg-card/50 border-border/50"
              }`}
            >
              <div className="flex items-start gap-2 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-inter font-bold">
                  {verse.numberInSurah}
                </span>
                <p
                  className={`text-2xl font-amiri text-right leading-loose transition-colors duration-500 ${
                    index === currentVerseIndex ? "text-primary" : "text-foreground"
                  }`}
                  dir="rtl"
                >
                  {verse.text}
                </p>
              </div>

              <div className="space-y-2 mt-4 border-t border-border/30 pt-3">
                <p
                  className={`text-sm font-inter leading-relaxed transition-colors duration-500 ${
                    index === currentVerseIndex ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <span className="font-semibold">DE:</span> {verses.german[index]?.text}
                </p>
                <p
                  className={`text-sm font-inter leading-relaxed transition-colors duration-500 ${
                    index === currentVerseIndex ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <span className="font-semibold">BS:</span> {verses.bosnian[index]?.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default QuranTextDisplay;
