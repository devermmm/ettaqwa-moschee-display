import { Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
      <Card className="w-full max-w-2xl bg-card border border-border/50 shadow-xl overflow-hidden animate-scale-in rounded-xl">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <img 
              src={logo} 
              alt="Et-Taqwa Logo" 
              className="h-16 mx-auto mb-3"
            />
            <p className="text-sm font-medium text-primary tracking-wide">
              DŽEMAT ET-TAQWA
            </p>
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-foreground">
              ŠKOLA KUR'ANA
            </h2>
            <p className="text-lg font-medium text-accent">
              ORGANIZUJE
            </p>
          </div>

          {/* Main CTA */}
          <div className="bg-accent rounded-xl p-6 text-center">
            <h3 className="text-5xl font-bold text-accent-foreground mb-2">
              UPIS
            </h3>
            <p className="text-accent-foreground/90">
              za Djecu, Omladinu, Odrasle
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-primary/5 border border-primary/15 p-5 rounded-lg">
              <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
                Termin:
              </p>
              <p className="text-xl font-bold text-foreground">
                SUBOTA I NEDELJA
              </p>
            </Card>

            <div className="space-y-3">
              <Card className="bg-accent/5 border border-accent/15 p-3 rounded-lg">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-accent">Za muškarce:</p>
                    <p className="font-bold text-foreground">+43 660 5515940</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-accent/5 border border-accent/15 p-3 rounded-lg">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-accent">Za žene:</p>
                    <p className="font-bold text-foreground">+43 660 2001711</p>
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