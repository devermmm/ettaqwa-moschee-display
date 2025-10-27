import { Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import quranBg from "@/assets/quran-school-bg.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-8 animate-fade-in">
      {/* Main Card Container */}
      <Card className="w-full max-w-6xl h-[90vh] bg-gradient-to-br from-card via-background to-card border-2 border-primary/30 shadow-2xl overflow-hidden animate-scale-in">
        {/* Content Container */}
        <div className="relative h-full flex flex-col p-10">
          {/* Header with Logo */}
          <div className="text-center mb-6">
            <img 
              src={logo} 
              alt="Et-Taqwa Logo" 
              className="h-20 mx-auto drop-shadow-lg mb-3"
            />
            <h1 className="text-2xl font-bold text-primary font-inter">
              DŽEMAT ET-TAQWA
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 grid grid-cols-2 gap-8">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-between space-y-6">
              {/* Title Section */}
              <div className="space-y-3">
                <h2 className="text-5xl font-bold text-primary font-inter leading-tight">
                  ŠKOLA KUR&apos;ANA
                </h2>
                <h2 className="text-5xl font-bold text-primary font-inter leading-tight">
                  ČASNOG
                </h2>
                <p className="text-3xl font-bold text-accent font-inter mt-4">
                  ORGANIZUJE
                </p>
              </div>

              {/* UPIS Section */}
              <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl p-8 border-2 border-accent/40">
                <h3 className="text-7xl font-bold text-accent font-inter text-center mb-4">
                  UPIS
                </h3>
                <p className="text-2xl text-foreground font-inter text-center font-semibold">
                  za Djecu, Omladinu, Odrasle
                </p>
              </div>

              {/* Schedule */}
              <Card className="bg-primary/10 border-2 border-primary/30 p-6">
                <h4 className="text-lg font-semibold text-primary/80 font-inter uppercase tracking-wide mb-3">
                  Termin održavanja:
                </h4>
                <p className="text-3xl font-bold text-foreground font-inter">
                  SUBOTA I NEDELJA
                </p>
              </Card>

              {/* Contact Info */}
              <div className="space-y-3">
                <Card className="bg-accent/10 border-2 border-accent/30 p-5">
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-accent/80 font-inter uppercase tracking-wide">
                        Za muškarce:
                      </h4>
                      <p className="text-2xl font-bold text-foreground font-inter">
                        +43 660 5515940
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-accent/10 border-2 border-accent/30 p-5">
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-accent flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-accent/80 font-inter uppercase tracking-wide">
                        Za žene:
                      </h4>
                      <p className="text-2xl font-bold text-foreground font-inter">
                        +43 660 2001711
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={quranBg}
                  alt="Kur'an"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdvertisementSlide;
