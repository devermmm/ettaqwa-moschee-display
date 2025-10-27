import { Phone, Calendar, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8 animate-fade-in">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-7xl h-[85vh] bg-gradient-to-br from-card/50 via-card/70 to-card/50 backdrop-blur-2xl rounded-2xl border border-primary/20 shadow-2xl overflow-hidden">
        {/* Decorative Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary animate-slide-in-right" />
        
        <div className="grid grid-cols-12 gap-8 h-full p-12">
          {/* Left Side - Branding */}
          <div className="col-span-4 flex flex-col justify-between animate-fade-in">
            {/* Logo & Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={logo} 
                  alt="Et-Taqwa Logo" 
                  className="h-20 drop-shadow-2xl animate-scale-in"
                />
                <div>
                  <h1 className="text-2xl font-bold text-primary font-inter">
                    DŽEMAT
                  </h1>
                  <h1 className="text-2xl font-bold text-primary font-inter">
                    ET-TAQWA
                  </h1>
                  <p className="text-sm text-muted-foreground font-inter mt-1">Wien</p>
                </div>
              </div>
              
              {/* Decorative Line */}
              <div className="h-px bg-gradient-to-r from-primary to-transparent" />
            </div>

            {/* Main Title */}
            <div className="space-y-3 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-r from-primary/20 to-transparent p-4 rounded-r-lg border-l-4 border-primary">
                <h2 className="text-3xl font-bold text-primary font-inter leading-tight">
                  ŠKOLA KUR&apos;ANA
                </h2>
                <h2 className="text-3xl font-bold text-primary font-inter leading-tight">
                  ČASNOG
                </h2>
              </div>
              <p className="text-xl text-accent font-inter font-semibold pl-4">
                organizuje
              </p>
            </div>

            {/* Quote or Islamic Pattern */}
            <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-2xl text-primary/60 font-amiri">
                ٱقْرَأْ بِٱسْمِ رَبِّكَ
              </p>
              <p className="text-xs text-muted-foreground mt-1">Lies im Namen deines Herrn</p>
            </div>
          </div>

          {/* Center - Main CTA */}
          <div className="col-span-5 flex items-center justify-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full">
              {/* UPIS Card */}
              <Card className="bg-gradient-to-br from-accent via-accent/90 to-primary p-10 border-4 border-accent/50 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center space-y-6">
                  <div className="inline-block p-3 bg-background/20 rounded-full mb-2">
                    <Users className="w-12 h-12 text-background" />
                  </div>
                  <h3 className="text-7xl font-bold text-background font-inter tracking-tight">
                    UPIS
                  </h3>
                  <div className="h-1 w-24 bg-background/40 mx-auto rounded-full" />
                  <p className="text-2xl text-background/90 font-inter font-medium leading-relaxed">
                    za Djecu,<br />Omladinu,<br />Odrasle
                  </p>
                </div>
                
                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-background/30 rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-background/30 rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-background/30 rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-background/30 rounded-br-lg" />
              </Card>
            </div>
          </div>

          {/* Right Side - Info Cards */}
          <div className="col-span-3 flex flex-col justify-center space-y-6">
            {/* Schedule Card */}
            <Card className="bg-primary/10 backdrop-blur-sm border-2 border-primary/30 p-6 hover:border-primary/60 transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-start gap-3 mb-3">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-semibold text-primary/80 font-inter uppercase tracking-wide mb-2">
                    Termin
                  </h4>
                  <p className="text-2xl font-bold text-foreground font-inter leading-tight">
                    Subota i<br />Nedelja
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Card - Men */}
            <Card className="bg-accent/10 backdrop-blur-sm border-2 border-accent/30 p-6 hover:border-accent/60 transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-start gap-3 mb-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-accent/80 font-inter uppercase tracking-wide mb-2">
                    Za muškarce
                  </h4>
                  <p className="text-lg font-bold text-foreground font-inter">
                    +43 660 5515940
                  </p>
                </div>
              </div>
            </Card>

            {/* Contact Card - Women */}
            <Card className="bg-accent/10 backdrop-blur-sm border-2 border-accent/30 p-6 hover:border-accent/60 transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-start gap-3 mb-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-accent/80 font-inter uppercase tracking-wide mb-2">
                    Za žene
                  </h4>
                  <p className="text-lg font-bold text-foreground font-inter">
                    +43 660 2001711
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Decorative Footer Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary" />
      </div>
    </div>
  );
};

export default AdvertisementSlide;
