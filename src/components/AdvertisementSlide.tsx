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

      <Card className="relative w-full max-w-7xl h-[85vh] bg-card/95 backdrop-blur-xl border-4 border-primary shadow-2xl animate-scale-in overflow-hidden">
        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-8 h-full p-8">
          {/* Left Column */}
          <div className="flex flex-col justify-between">
            {/* Header with Logo */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img 
                  src={logo} 
                  alt="Et-Taqwa Logo" 
                  className="h-24 drop-shadow-2xl animate-fade-in"
                />
              </div>
              <h1 className="text-4xl font-bold text-primary font-inter mb-2">
                DŽEMAT ET-TAQWA
              </h1>
              <p className="text-2xl text-muted-foreground font-inter">Wien</p>
            </div>

            {/* Title */}
            <div className="text-center space-y-4">
              <h2 className="text-7xl font-bold text-primary font-inter leading-tight">
                ŠKOLA
              </h2>
              <h2 className="text-7xl font-bold text-primary font-inter leading-tight">
                KUR&apos;ANA
              </h2>
              <h2 className="text-7xl font-bold text-primary font-inter leading-tight">
                ČASNOG
              </h2>
              <p className="text-5xl font-bold text-accent font-inter mt-6">
                ORGANIZUJE
              </p>
            </div>

            {/* UPIS Section */}
            <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl p-6 border-4 border-accent">
              <h3 className="text-8xl font-bold text-center text-accent mb-4 font-inter">
                UPIS
              </h3>
              <p className="text-4xl text-center text-foreground font-inter font-semibold">
                za Djecu, Omladinu, Odrasle
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Schedule */}
            <Card className="bg-primary/10 border-4 border-primary p-8">
              <h4 className="text-3xl font-bold text-primary mb-6 font-inter">
                TERMIN ODRŽAVANJA:
              </h4>
              <p className="text-5xl font-bold text-foreground font-inter">
                SUBOTA I NEDELJA
              </p>
            </Card>

            {/* Contact */}
            <Card className="bg-accent/10 border-4 border-accent p-8 space-y-6">
              <div>
                <h4 className="text-3xl font-bold text-accent mb-4 font-inter flex items-center gap-3">
                  <Phone className="w-10 h-10" />
                  ZA MUŠKARCE:
                </h4>
                <p className="text-5xl font-bold text-foreground font-inter">
                  +43 660 5515940
                </p>
              </div>
              <div className="pt-4 border-t-4 border-accent/30">
                <h4 className="text-3xl font-bold text-accent mb-4 font-inter flex items-center gap-3">
                  <Phone className="w-10 h-10" />
                  ZA ŽENE:
                </h4>
                <p className="text-5xl font-bold text-foreground font-inter">
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
