import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Phone, MapPin, Calendar, Users } from "lucide-react";

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
    <div className="fixed inset-0 bg-gradient-to-br from-black via-primary/20 to-black z-[200] flex items-center justify-center animate-fade-in p-8">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="relative w-full max-w-[95%] h-[85vh] p-12 bg-gradient-to-br from-background/95 via-primary/5 to-accent/5 border-4 border-primary/50 shadow-[0_0_80px_rgba(var(--primary),0.3)] backdrop-blur-xl overflow-hidden">
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
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
              <h1 className="text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent mb-3 font-inter tracking-tight drop-shadow-lg animate-fade-in">
                {currentContent.title}
              </h1>
              <p className="text-4xl text-foreground/80 font-inter font-semibold animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {currentContent.subtitle}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 grid grid-cols-2 gap-8">
            {/* Left Column - Prayer Times */}
            <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-10 border-2 border-primary/30 shadow-2xl h-full flex flex-col justify-center hover:scale-[1.02] transition-transform duration-300">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4">
                      <Calendar className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent font-inter">
                      {currentContent.announcement}
                    </h2>
                    <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                    <p className="text-4xl text-foreground font-inter font-semibold">
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
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/50 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-accent/30 shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-2">
                      <Users className="w-10 h-10 text-accent" />
                    </div>
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent font-inter">
                      {currentContent.courses}
                    </h2>
                    <p className="text-2xl text-foreground font-inter">
                      {currentContent.courseTarget}
                    </p>
                    <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                    <p className="text-xl text-muted-foreground font-inter font-semibold bg-accent/5 rounded-full px-6 py-2 inline-block">
                      {currentContent.courseTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/50 rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border-2 border-secondary/30 shadow-2xl hover:scale-[1.02] transition-transform duration-300">
                  <div className="space-y-5">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Phone className="w-8 h-8 text-secondary" />
                      <h3 className="text-3xl font-bold text-secondary font-inter">
                        {currentContent.contact}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20">
                        <p className="text-xl text-foreground font-inter font-bold">
                          {currentContent.men}
                        </p>
                      </div>
                      <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20">
                        <p className="text-xl text-foreground font-inter font-bold">
                          {currentContent.women}
                        </p>
                      </div>
                      <div className="flex items-start gap-3 mt-5 pt-5 border-t border-border/50">
                        <MapPin className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-1" />
                        <p className="text-lg text-muted-foreground font-inter">
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
            <div className="inline-flex gap-4 bg-card/30 backdrop-blur-sm rounded-full p-2 border border-border/50">
              <span className={`px-8 py-3 rounded-full text-xl font-inter font-bold transition-all duration-300 ${
                currentLanguage === 'de' 
                  ? 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg scale-110' 
                  : 'bg-transparent text-muted-foreground hover:bg-muted/50'
              }`}>
                Deutsch
              </span>
              <span className={`px-8 py-3 rounded-full text-xl font-inter font-bold transition-all duration-300 ${
                currentLanguage === 'bs' 
                  ? 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg scale-110' 
                  : 'bg-transparent text-muted-foreground hover:bg-muted/50'
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
