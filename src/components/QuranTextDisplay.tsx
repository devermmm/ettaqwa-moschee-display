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
  currentVerseIndex?: number;
}

const QuranTextDisplay = ({ surahNumber, surahName, surahArabicName, currentVerseIndex = 0 }: QuranTextDisplayProps) => {
  const [verses, setVerses] = useState<QuranTranslation | null>(null);
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
      } catch (error) {
        console.error("Error fetching Quran text:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuranText();
  }, [surahNumber]);


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
    <Card className="p-4 bg-card/30 backdrop-blur-sm border border-border h-full flex flex-col overflow-hidden">
      <div className="mb-4 text-center border-b border-border pb-3 flex-shrink-0">
        <h3 className="text-xl font-amiri text-primary mb-1">{surahArabicName}</h3>
        <p className="text-sm font-inter text-muted-foreground">
          Surah {surahNumber}: {surahName}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="w-full animate-fade-in pb-4 px-2">
          <div className="p-4 md:p-6 rounded-lg border border-primary bg-primary/10 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs md:text-sm font-inter font-bold">
                {currentVerse.numberInSurah}
              </span>
              <p
                className="text-2xl md:text-3xl font-amiri text-right leading-loose text-primary break-words"
                dir="rtl"
              >
                {currentVerse.text}
              </p>
            </div>

            <div className="space-y-2 md:space-y-3 mt-4 md:mt-6 border-t border-border/30 pt-3 md:pt-4">
              <p className="text-sm md:text-base font-inter leading-relaxed text-primary break-words">
                <span className="font-semibold">DE:</span> {verses.german[currentVerseIndex]?.text}
              </p>
              <p className="text-sm md:text-base font-inter leading-relaxed text-primary break-words">
                <span className="font-semibold">BS:</span> {verses.bosnian[currentVerseIndex]?.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuranTextDisplay;
