import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface MosqueInfoOverlayProps {
  show: boolean;
}

const MosqueInfoOverlay = ({ show }: MosqueInfoOverlayProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<'de' | 'bs'>('de');

  useEffect(() => {
    const langInterval = setInterval(() => {
      setCurrentLanguage(prev => prev === 'de' ? 'bs' : 'de');
    }, 5000); // Wechselt alle 5 Sekunden zwischen Deutsch und Bosnisch

    return () => clearInterval(langInterval);
  }, []);

  const content = {
    de: {
      title: "DZEMAT ET-TAQWA",
      subtitle: "MOSCHEE WIEN",
      announcement: "GEBETSZEITEN",
      schedule: "Täglich",
      courses: "QUR'AN UNTERRICHT",
      courseTarget: "für Kinder, Jugendliche, Erwachsene",
      courseTime: "Samstag & Sonntag",
      contact: "KONTAKT",
      men: "Für Männer: +43 660 5515940",
      women: "Für Frauen: +43 660 2001711",
      address: "Adresse: Braunhubergasse 11, 1110 Wien"
    },
    bs: {
      title: "DZEMAT ET-TAQWA",
      subtitle: "DŽAMIJA BEČ",
      announcement: "VRIJEME NAMAZA",
      schedule: "Svaki Dan",
      courses: "ŠKOLA KUR'ANA ČASNOG",
      courseTarget: "za Djecu, Omladinu, Odrasle",
      courseTime: "Subota i Nedjelja",
      contact: "KONTAKT",
      men: "Za Muškarce: +43 660 5515940",
      women: "Za Žene: +43 660 2001711",
      address: "Adresa: Braunhubergasse 11, 1110 Wien"
    }
  };

  const currentContent = content[currentLanguage];

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center animate-in fade-in duration-500 p-8">
      <Card className="w-full max-w-7xl h-full max-h-[90vh] p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5 border-4 border-primary shadow-2xl flex flex-col">
        {/* Header with Logo and Title */}
        <div className="flex items-center justify-center gap-6 mb-8 pb-6 border-b-2 border-primary/30">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-3 border-primary shadow-lg">
            <svg className="w-16 h-16 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L6 7v7c0 3.3 2.7 6 6 6s6-2.7 6-6V7l-6-5zm0 2.5L16 8v6c0 2.2-1.8 4-4 4s-4-1.8-4-4V8l4-3.5z"/>
              <circle cx="12" cy="12" r="1.5"/>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-6xl font-bold text-primary mb-2 font-inter tracking-tight">
              {currentContent.title}
            </h1>
            <p className="text-3xl text-muted-foreground font-inter">
              {currentContent.subtitle}
            </p>
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="flex-1 grid grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Prayer Times */}
            <div className="bg-primary/10 rounded-2xl p-8 border-2 border-primary/30 shadow-lg h-full flex flex-col justify-center">
              <h2 className="text-5xl font-bold text-primary mb-4 font-inter text-center">
                {currentContent.announcement}
              </h2>
              <p className="text-3xl text-center text-foreground font-inter font-semibold">
                {currentContent.schedule}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Courses */}
            <div className="bg-accent/10 rounded-2xl p-8 border-2 border-accent/30 shadow-lg">
              <h2 className="text-4xl font-bold text-accent mb-3 font-inter text-center">
                {currentContent.courses}
              </h2>
              <p className="text-2xl text-center text-foreground mb-2 font-inter">
                {currentContent.courseTarget}
              </p>
              <p className="text-xl text-center text-muted-foreground font-inter font-semibold">
                {currentContent.courseTime}
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-secondary/10 rounded-2xl p-8 border-2 border-secondary/30 shadow-lg">
              <h3 className="text-3xl font-bold text-secondary mb-4 font-inter text-center">
                {currentContent.contact}
              </h3>
              <div className="space-y-2 text-center">
                <p className="text-xl text-foreground font-inter font-bold">
                  {currentContent.men}
                </p>
                <p className="text-xl text-foreground font-inter font-bold">
                  {currentContent.women}
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-lg text-muted-foreground font-inter">
                    {currentContent.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Indicator */}
        <div className="mt-6 text-center pt-4 border-t-2 border-primary/30">
          <div className="inline-flex gap-3">
            <span className={`px-6 py-2 rounded-full text-lg font-inter font-semibold ${
              currentLanguage === 'de' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              Deutsch
            </span>
            <span className={`px-6 py-2 rounded-full text-lg font-inter font-semibold ${
              currentLanguage === 'bs' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              Bosanski
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MosqueInfoOverlay;
