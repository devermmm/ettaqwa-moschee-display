import { Phone, Calendar, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-background via-background to-secondary/20 animate-fade-in">
      {/* Progress Bar Space */}
      <div className="h-2" />
      
      <div className="h-full max-w-[1920px] mx-auto flex flex-col p-3">
        {/* Header with Logo - Same as main page */}
        <header className="text-center py-3 border-b border-border/30 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <img 
              src={logo} 
              alt="Et-Taqwa Moschee Logo" 
              className="h-16 drop-shadow-lg"
            />
            <div className="text-left">
              <h1 className="text-2xl font-bold text-primary font-inter leading-tight">
                Et-Taqwa Moschee
              </h1>
              <p className="text-xl text-primary font-amiri leading-tight">
                مسجد التقوى - Wien
              </p>
            </div>
          </div>
        </header>

        {/* Main Content - Same grid structure */}
        <div className="flex-1 grid grid-cols-12 gap-4 py-4 overflow-hidden">
          {/* Left Column - Title & Info */}
          <div className="col-span-5 flex flex-col justify-center space-y-4 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <Card className="p-8 bg-gradient-to-br from-primary via-primary to-primary/90 border-2 border-primary-glow shadow-2xl">
              <div className="text-center space-y-4">
                <h2 className="text-6xl font-bold text-primary-foreground font-inter leading-tight">
                  ŠKOLA KUR&apos;ANA ČASNOG
                </h2>
                <div className="h-1 w-32 bg-primary-foreground/50 mx-auto rounded-full" />
                <p className="text-3xl font-semibold text-primary-foreground/90 font-inter">
                  organizuje
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border">
              <div className="flex items-center gap-4">
                <Calendar className="w-12 h-12 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground font-inter uppercase tracking-wide mb-2">
                    Termin održavanja
                  </h3>
                  <p className="text-3xl font-bold text-foreground font-inter">
                    Subota i Nedelja
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-accent/10 border-2 border-accent/30 hover:border-accent transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Phone className="w-8 h-8 text-accent" />
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground font-inter uppercase tracking-wide mb-2">
                      Za muškarce
                    </h4>
                    <p className="text-lg font-bold text-foreground font-inter">
                      +43 660<br />5515940
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-accent/10 border-2 border-accent/30 hover:border-accent transition-all duration-300">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Phone className="w-8 h-8 text-accent" />
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground font-inter uppercase tracking-wide mb-2">
                      Za žene
                    </h4>
                    <p className="text-lg font-bold text-foreground font-inter">
                      +43 660<br />2001711
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Center Column - Main CTA */}
          <div className="col-span-3 flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Card className="w-full bg-gradient-to-br from-accent via-accent to-primary p-8 border-4 border-accent/50 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="text-center space-y-6">
                <div className="inline-block p-4 bg-accent-foreground/20 rounded-full">
                  <Users className="w-16 h-16 text-accent-foreground" />
                </div>
                <h3 className="text-8xl font-bold text-accent-foreground font-inter">
                  UPIS
                </h3>
                <div className="h-1 w-24 bg-accent-foreground/50 mx-auto rounded-full" />
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-accent-foreground font-inter">
                    za Djecu
                  </p>
                  <p className="text-3xl font-bold text-accent-foreground font-inter">
                    Omladinu
                  </p>
                  <p className="text-3xl font-bold text-accent-foreground font-inter">
                    Odrasle
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Additional Info */}
          <div className="col-span-4 flex flex-col justify-center space-y-4 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <Card className="p-8 bg-card border-2 border-primary/30 shadow-lg">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-primary font-inter uppercase tracking-wide">
                  Programm
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-lg text-foreground font-inter">
                      Kur&apos;an Rezitacija
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-lg text-foreground font-inter">
                      Tajvid
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <p className="text-lg text-foreground font-inter">
                      Islamske nauke
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-muted/30 to-muted/50 border border-border/50">
              <p className="text-2xl text-center text-foreground font-amiri mb-3">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </p>
              <p className="text-4xl text-center text-primary font-amiri mb-3">
                ٱقْرَأْ بِٱسْمِ رَبِّكَ
              </p>
              <p className="text-sm text-center text-muted-foreground font-inter">
                Lies im Namen deines Herrn
              </p>
            </Card>
          </div>
        </div>

        {/* Footer - Same as main page */}
        <footer className="text-center text-muted-foreground font-inter text-xs py-2 border-t border-border/30 animate-fade-in">
          <p className="text-xs">اللهم بارك لنا - Allah segne uns alle</p>
        </footer>
      </div>
    </div>
  );
};

export default AdvertisementSlide;
