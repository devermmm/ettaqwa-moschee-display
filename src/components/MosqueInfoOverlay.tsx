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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex items-center justify-center animate-in fade-in duration-500">
      <Card className="max-w-4xl w-[90%] p-12 bg-gradient-to-br from-background via-background to-primary/5 border-2 border-primary shadow-2xl">
        {/* Mosque Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
            <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L6 7v7c0 3.3 2.7 6 6 6s6-2.7 6-6V7l-6-5zm0 2.5L16 8v6c0 2.2-1.8 4-4 4s-4-1.8-4-4V8l4-3.5z"/>
              <circle cx="12" cy="12" r="1.5"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-2 font-inter tracking-tight">
            {currentContent.title}
          </h1>
          <p className="text-2xl text-muted-foreground font-inter">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Prayer Times */}
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
            <h2 className="text-3xl font-bold text-primary mb-2 font-inter text-center">
              {currentContent.announcement}
            </h2>
            <p className="text-xl text-center text-foreground font-inter">
              {currentContent.schedule}
            </p>
          </div>

          {/* Courses */}
          <div className="bg-accent/10 rounded-lg p-6 border border-accent/30">
            <h2 className="text-3xl font-bold text-accent mb-2 font-inter text-center">
              {currentContent.courses}
            </h2>
            <p className="text-xl text-center text-foreground mb-3 font-inter">
              {currentContent.courseTarget}
            </p>
            <p className="text-lg text-center text-muted-foreground font-inter">
              {currentContent.courseTime}
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-secondary/10 rounded-lg p-6 border border-secondary/30">
            <h3 className="text-2xl font-bold text-secondary mb-4 font-inter text-center">
              {currentContent.contact}
            </h3>
            <div className="space-y-2 text-center">
              <p className="text-lg text-foreground font-inter font-semibold">
                {currentContent.men}
              </p>
              <p className="text-lg text-foreground font-inter font-semibold">
                {currentContent.women}
              </p>
              <p className="text-lg text-muted-foreground font-inter mt-4">
                {currentContent.address}
              </p>
            </div>
          </div>
        </div>

        {/* Language Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-inter ${
              currentLanguage === 'de' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              Deutsch
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-inter ${
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
