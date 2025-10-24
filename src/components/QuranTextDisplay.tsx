import { useState, useEffect } from "react";
import { Card } from "./ui/card";

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

  const currentVerse = verses.arabic[currentVerseIndex];

  return (
    <Card className="p-6 bg-card/30 backdrop-blur-sm border-2 border-border h-full flex flex-col">
      <div className="mb-5 text-center border-b-2 border-border pb-4">
        <h3 className="text-3xl font-amiri text-primary mb-2">{surahArabicName}</h3>
        <p className="text-lg font-inter text-muted-foreground">
          Surah {surahNumber}: {surahName}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full animate-fade-in">
          <div className="p-8 rounded-lg border-2 border-primary bg-primary/10 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <span className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center text-lg font-inter font-bold">
                {currentVerse.numberInSurah}
              </span>
              <p
                className="text-4xl font-amiri text-right leading-loose text-primary"
                dir="rtl"
              >
                {currentVerse.text}
              </p>
            </div>

            <div className="space-y-4 mt-8 border-t-2 border-border/30 pt-6">
              <p className="text-xl font-inter leading-relaxed text-primary">
                <span className="font-semibold text-lg">DE:</span> {verses.german[currentVerseIndex]?.text}
              </p>
              <p className="text-xl font-inter leading-relaxed text-primary">
                <span className="font-semibold text-lg">BS:</span> {verses.bosnian[currentVerseIndex]?.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuranTextDisplay;
