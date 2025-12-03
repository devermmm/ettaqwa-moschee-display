import { Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-8 animate-slide-in-right">
      {/* Main Card Container */}
      <Card className="w-full max-w-3xl bg-card border border-border/50 shadow-2xl overflow-hidden animate-scale-in rounded-2xl">
        <div className="p-10 space-y-8">
          {/* Header with Logo */}
          <div className="text-center">
            <img 
              src={logo} 
              alt="Et-Taqwa Logo" 
              className="h-20 mx-auto drop-shadow-lg mb-4"
            />
            <h1 className="text-lg font-bold text-primary tracking-wide">
              DŽEMAT ET-TAQWA
            </h1>
          </div>

          {/* Title */}
          <div className="text-center space-y-3">
            <h2 className="text-5xl font-bold text-foreground tracking-tight">
              ŠKOLA KUR'ANA
            </h2>
            <p className="text-xl font-semibold text-accent">
              ORGANIZUJE
            </p>
          </div>

          {/* UPIS - Main CTA */}
          <div className="bg-gradient-to-br from-accent to-accent/90 rounded-2xl p-8 text-center shadow-gold">
            <h3 className="text-6xl font-bold text-accent-foreground mb-4 tracking-tight">
              UPIS
            </h3>
            <p className="text-xl text-accent-foreground/90 font-medium">
              za Djecu, Omladinu, Odrasle
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Schedule */}
            <Card className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
              <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                Termin održavanja:
              </h4>
              <p className="text-2xl font-bold text-foreground">
                SUBOTA I NEDELJA
              </p>
            </Card>

            {/* Contact */}
            <div className="space-y-4">
              <Card className="bg-accent/5 border border-accent/20 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-accent uppercase tracking-wider">
                      Za muškarce:
                    </h4>
                    <p className="text-lg font-bold text-foreground">
                      +43 660 5515940
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-accent/5 border border-accent/20 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-accent uppercase tracking-wider">
                      Za žene:
                    </h4>
                    <p className="text-lg font-bold text-foreground">
                      +43 660 2001711
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdvertisementSlide;