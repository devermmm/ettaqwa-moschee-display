import { Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-8 animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Card className="relative w-full max-w-5xl bg-card/95 backdrop-blur-xl border-4 border-primary shadow-2xl p-12 animate-scale-in">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src={logo} 
              alt="Et-Taqwa Logo" 
              className="h-20 drop-shadow-2xl animate-fade-in"
            />
          </div>
          <h1 className="text-3xl font-bold text-primary font-inter mb-2">
            DŽEMAT ET-TAQWA
          </h1>
          <p className="text-xl text-muted-foreground font-inter">Wien</p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-6xl font-bold text-primary mb-4 font-inter leading-tight">
              ŠKOLA KUR'ANA
            </h2>
            <h2 className="text-6xl font-bold text-primary mb-6 font-inter leading-tight">
              ČASNOG
            </h2>
            <p className="text-4xl font-bold text-accent font-inter">
              ORGANIZUJE
            </p>
          </div>

          {/* UPIS Section */}
          <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl p-8 border-4 border-accent">
            <h3 className="text-7xl font-bold text-center text-accent mb-6 font-inter">
              UPIS
            </h3>
            <p className="text-4xl text-center text-foreground font-inter font-semibold">
              za Djecu, Omladinu, Odrasle
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left: Schedule */}
            <Card className="bg-primary/10 border-4 border-primary p-6">
              <h4 className="text-2xl font-bold text-primary mb-4 font-inter">
                TERMIN ODRŽAVANJA:
              </h4>
              <p className="text-3xl font-bold text-foreground font-inter">
                SUBOTA I NEDELJA
              </p>
            </Card>

            {/* Right: Contact */}
            <Card className="bg-accent/10 border-4 border-accent p-6 space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-accent mb-3 font-inter flex items-center gap-2">
                  <Phone className="w-8 h-8" />
                  ZA MUŠKARCE:
                </h4>
                <p className="text-3xl font-bold text-foreground font-inter">
                  +43 660 5515940
                </p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-accent mb-3 font-inter flex items-center gap-2">
                  <Phone className="w-8 h-8" />
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
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      </Card>
    </div>
  );
};

export default AdvertisementSlide;
