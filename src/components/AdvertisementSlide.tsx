import { Phone, Calendar, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8 animate-fade-in">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-6xl bg-card/95 backdrop-blur-xl rounded-xl border-2 border-primary/30 shadow-2xl overflow-hidden animate-scale-in">
        {/* Decorative Header Bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <div className="p-10">
          {/* Header with Centered Logo */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img 
                src={logo} 
                alt="Et-Taqwa Logo" 
                className="h-20 drop-shadow-lg"
              />
            </div>
            <h1 className="text-3xl font-bold text-foreground font-inter mb-2">
              DŽEMAT ET-TAQWA
            </h1>
            <p className="text-lg text-foreground/80 font-inter">Wien</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-3 rounded-full" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Left - Title */}
            <Card className="col-span-1 bg-primary/90 backdrop-blur-sm border-2 border-primary p-6 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-bold text-background font-inter mb-3 leading-tight">
                ŠKOLA<br />KUR&apos;ANA<br />ČASNOG
              </h2>
              <div className="w-16 h-1 bg-background/50 mx-auto my-3 rounded-full" />
              <p className="text-xl text-background/90 font-inter font-medium">
                organizuje
              </p>
            </Card>

            {/* Center - UPIS */}
            <Card className="col-span-1 bg-gradient-to-br from-accent via-accent to-accent/90 backdrop-blur-sm border-2 border-accent p-6 text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <Users className="w-12 h-12 text-background" />
                <h3 className="text-5xl font-bold text-background font-inter">
                  UPIS
                </h3>
                <div className="w-20 h-1 bg-background/50 rounded-full" />
                <p className="text-xl text-background/90 font-inter font-medium leading-relaxed">
                  za Djecu,<br />Omladinu,<br />Odrasle
                </p>
              </div>
            </Card>

            {/* Right - Schedule */}
            <Card className="col-span-1 bg-primary/90 backdrop-blur-sm border-2 border-primary p-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Calendar className="w-10 h-10 text-background mx-auto mb-4" />
              <h4 className="text-sm font-semibold text-background/80 font-inter uppercase tracking-wide mb-3">
                Termin
              </h4>
              <p className="text-2xl font-bold text-background font-inter leading-tight">
                Subota<br />i<br />Nedelja
              </p>
            </Card>
          </div>

          {/* Bottom Contact Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Contact - Men */}
            <Card className="bg-foreground/10 backdrop-blur-sm border-2 border-foreground/20 p-6 text-center hover:border-accent/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Phone className="w-8 h-8 text-foreground mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-foreground/80 font-inter uppercase tracking-wide mb-3">
                Za muškarce
              </h4>
              <p className="text-2xl font-bold text-foreground font-inter">
                +43 660 5515940
              </p>
            </Card>

            {/* Contact - Women */}
            <Card className="bg-foreground/10 backdrop-blur-sm border-2 border-foreground/20 p-6 text-center hover:border-accent/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Phone className="w-8 h-8 text-foreground mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-foreground/80 font-inter uppercase tracking-wide mb-3">
                Za žene
              </h4>
              <p className="text-2xl font-bold text-foreground font-inter">
                +43 660 2001711
              </p>
            </Card>
          </div>
        </div>

        {/* Decorative Footer Bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      </div>
    </div>
  );
};

export default AdvertisementSlide;
