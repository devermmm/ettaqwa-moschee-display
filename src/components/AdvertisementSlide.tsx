import { Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-6 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Card className="relative w-full max-w-6xl h-[80vh] bg-card/95 backdrop-blur-xl border-2 border-primary shadow-xl animate-scale-in overflow-hidden">
        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-6 h-full p-8">
          {/* Left Column */}
          <div className="flex flex-col justify-between">
            {/* Header with Logo */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <img 
                  src={logo} 
                  alt="Et-Taqwa Logo" 
                  className="h-16 drop-shadow-lg animate-fade-in"
                />
              </div>
              <h1 className="text-2xl font-semibold text-primary font-inter mb-1">
                DŽEMAT ET-TAQWA
              </h1>
              <p className="text-lg text-muted-foreground font-inter">Wien</p>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h2 className="text-5xl font-bold text-primary font-inter leading-tight">
                ŠKOLA
              </h2>
              <h2 className="text-5xl font-bold text-primary font-inter leading-tight">
                KUR&apos;ANA ČASNOG
              </h2>
              <p className="text-3xl font-semibold text-accent font-inter mt-4">
                ORGANIZUJE
              </p>
            </div>

            {/* UPIS Section */}
            <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl p-5 border-2 border-accent">
              <h3 className="text-6xl font-bold text-center text-accent mb-3 font-inter">
                UPIS
              </h3>
              <p className="text-2xl text-center text-foreground font-inter font-medium">
                za Djecu, Omladinu, Odrasle
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Schedule */}
            <Card className="bg-primary/10 border-2 border-primary p-6">
              <h4 className="text-xl font-semibold text-primary mb-3 font-inter">
                TERMIN ODRŽAVANJA:
              </h4>
              <p className="text-3xl font-bold text-foreground font-inter">
                SUBOTA I NEDELJA
              </p>
            </Card>

            {/* Contact */}
            <Card className="bg-accent/10 border-2 border-accent p-6 space-y-5">
              <div>
                <h4 className="text-xl font-semibold text-accent mb-2 font-inter flex items-center gap-2">
                  <Phone className="w-6 h-6" />
                  ZA MUŠKARCE:
                </h4>
                <p className="text-3xl font-bold text-foreground font-inter">
                  +43 660 5515940
                </p>
              </div>
              <div className="pt-3 border-t-2 border-accent/30">
                <h4 className="text-xl font-semibold text-accent mb-2 font-inter flex items-center gap-2">
                  <Phone className="w-6 h-6" />
                  ZA ŽENE:
                </h4>
                <p className="text-3xl font-bold text-foreground font-inter">
                  +43 660 2001711
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Decorative Islamic Pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      </Card>
    </div>
  );
};

export default AdvertisementSlide;
