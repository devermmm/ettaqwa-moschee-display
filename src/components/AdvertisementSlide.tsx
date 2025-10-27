import { Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-12 animate-slide-in-right">
      {/* Main Card Container */}
      <Card className="w-full max-w-4xl bg-card border-2 border-primary/30 shadow-2xl overflow-hidden animate-scale-in transition-all duration-500">
        <div className="p-8 space-y-6">
          {/* Header with Logo */}
          <div className="text-center">
            <img 
              src={logo} 
              alt="Et-Taqwa Logo" 
              className="h-16 mx-auto drop-shadow-lg mb-3"
            />
            <h1 className="text-xl font-bold text-primary font-inter">
              DŽEMAT ET-TAQWA
            </h1>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-primary font-inter leading-tight">
              ŠKOLA KUR&apos;ANA ČASNOG
            </h2>
            <p className="text-2xl font-semibold text-accent font-inter">
              ORGANIZUJE
            </p>
          </div>

          {/* UPIS - Main CTA */}
          <div className="bg-gradient-to-br from-accent to-accent/80 rounded-xl p-6 text-center">
            <h3 className="text-6xl font-bold text-accent-foreground font-inter mb-3">
              UPIS
            </h3>
            <p className="text-xl text-accent-foreground/90 font-inter font-medium">
              za Djecu, Omladinu, Odrasle
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Schedule */}
            <Card className="bg-primary/10 border border-primary/30 p-5">
              <h4 className="text-sm font-semibold text-primary/70 font-inter uppercase tracking-wide mb-2">
                Termin održavanja:
              </h4>
              <p className="text-2xl font-bold text-foreground font-inter">
                SUBOTA I NEDELJA
              </p>
            </Card>

            {/* Contact - Split in two rows */}
            <div className="space-y-4">
              <Card className="bg-accent/10 border border-accent/30 p-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-accent/70 font-inter uppercase">
                      Za muškarce:
                    </h4>
                    <p className="text-lg font-bold text-foreground font-inter">
                      +43 660 5515940
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-accent/10 border border-accent/30 p-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-accent/70 font-inter uppercase">
                      Za žene:
                    </h4>
                    <p className="text-lg font-bold text-foreground font-inter">
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
