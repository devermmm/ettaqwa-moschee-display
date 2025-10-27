import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Phone, MapPin, Calendar, Users } from "lucide-react";

interface MosqueInfoOverlayProps {
  show: boolean;
}

const MosqueInfoOverlay = ({ show }: MosqueInfoOverlayProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<'de' | 'bs'>('bs');

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
    <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center animate-fade-in p-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="relative w-full max-w-[95%] h-[85vh] p-12 bg-gradient-to-br from-card via-card to-card/95 border-4 border-primary shadow-[0_0_100px_rgba(var(--primary),0.5)] overflow-hidden">
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--primary)) 2%, transparent 0%), radial-gradient(circle at 75px 75px, hsl(var(--primary)) 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col">
          {/* Header with Logo and Title */}
          <div className="flex items-center justify-center gap-8 mb-10 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center border-4 border-primary-foreground/20 shadow-2xl">
                <svg className="w-20 h-20 text-primary-foreground drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L6 7v7c0 3.3 2.7 6 6 6s6-2.7 6-6V7l-6-5zm0 2.5L16 8v6c0 2.2-1.8 4-4 4s-4-1.8-4-4V8l4-3.5z"/>
                  <circle cx="12" cy="12" r="1.5"/>
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-7xl font-bold text-primary mb-3 font-inter tracking-tight drop-shadow-2xl animate-fade-in">
                {currentContent.title}
              </h1>
              <p className="text-4xl text-foreground font-inter font-semibold animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {currentContent.subtitle}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 grid grid-cols-2 gap-8">
            {/* Left Column - Prayer Times */}
            <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow rounded-3xl opacity-20"></div>
                <div className="relative bg-primary/10 backdrop-blur-sm rounded-3xl p-10 border-4 border-primary shadow-2xl h-full flex flex-col justify-center">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/30 rounded-full mb-4 shadow-lg">
                      <Calendar className="w-14 h-14 text-primary-foreground" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-7xl font-bold text-primary font-inter drop-shadow-lg">
                      {currentContent.announcement}
                    </h2>
                    <div className="h-2 w-40 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                    <p className="text-5xl text-foreground font-inter font-bold drop-shadow-md">
                      {currentContent.schedule}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Courses and Contact */}
            <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
              {/* Courses */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/50 rounded-3xl opacity-20"></div>
                <div className="relative bg-accent/15 backdrop-blur-sm rounded-3xl p-8 border-4 border-accent shadow-2xl">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/40 rounded-full mb-2 shadow-lg">
                      <Users className="w-12 h-12 text-accent-foreground" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-5xl font-bold text-accent font-inter drop-shadow-lg">
                      {currentContent.courses}
                    </h2>
                    <p className="text-2xl text-foreground font-inter font-semibold">
                      {currentContent.courseTarget}
                    </p>
                    <div className="h-2 w-32 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
                    <p className="text-xl text-foreground font-inter font-bold bg-accent/20 rounded-full px-8 py-3 inline-block border-2 border-accent/40">
                      {currentContent.courseTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/50 rounded-3xl opacity-20"></div>
                <div className="relative bg-secondary/15 backdrop-blur-sm rounded-3xl p-8 border-4 border-secondary shadow-2xl">
                  <div className="space-y-5">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="p-3 bg-secondary/30 rounded-full shadow-lg">
                        <Phone className="w-10 h-10 text-secondary-foreground" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-4xl font-bold text-secondary font-inter drop-shadow-lg">
                        {currentContent.contact}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-secondary/20 rounded-xl p-5 border-2 border-secondary/40 shadow-lg">
                        <p className="text-xl text-foreground font-inter font-bold">
                          {currentContent.men}
                        </p>
                      </div>
                      <div className="bg-secondary/20 rounded-xl p-5 border-2 border-secondary/40 shadow-lg">
                        <p className="text-xl text-foreground font-inter font-bold">
                          {currentContent.women}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 mt-5 pt-5 border-t-2 border-secondary/40">
                        <MapPin className="w-7 h-7 text-foreground flex-shrink-0 mt-1" strokeWidth={2.5} />
                        <p className="text-lg text-foreground font-inter font-semibold">
                          {currentContent.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Language Indicator */}
          <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="inline-flex gap-4 bg-card/80 backdrop-blur-sm rounded-full p-3 border-2 border-primary/30 shadow-xl">
              <span className={`px-10 py-4 rounded-full text-xl font-inter font-bold transition-all duration-300 ${
                currentLanguage === 'de' 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-110 border-2 border-primary-foreground/20' 
                  : 'bg-transparent text-foreground/60'
              }`}>
                Deutsch
              </span>
              <span className={`px-10 py-4 rounded-full text-xl font-inter font-bold transition-all duration-300 ${
                currentLanguage === 'bs' 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-110 border-2 border-primary-foreground/20' 
                  : 'bg-transparent text-foreground/60'
              }`}>
                Bosanski
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MosqueInfoOverlay;
