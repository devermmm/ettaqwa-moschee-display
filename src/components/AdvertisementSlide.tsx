import { Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const AdvertisementSlide = () => {
  return (
    <div className="fixed inset-0 z-40 bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 flex items-center justify-center p-12 animate-fade-in">
      {/* Islamic Geometric Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern-ad" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="white" strokeWidth="0.5"/>
              <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="0.5"/>
              <path d="M15 15L45 15L45 45L15 45Z" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern-ad)"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-8">
        {/* Header with Logo */}
        <div className="space-y-2">
          <img 
            src={logo} 
            alt="Et-Taqwa Logo" 
            className="h-20 mx-auto drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold text-emerald-200 tracking-wide">
            DŽEMAT ET-TAQWA
          </h1>
          <p className="text-emerald-300 text-lg font-arabic">مسجد التقوى</p>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-wide">
            ŠKOLA KUR'ANA
          </h2>
          <p className="text-2xl font-semibold text-emerald-300">
            ORGANIZUJE
          </p>
        </div>

        {/* UPIS - Main CTA */}
        <div className="inline-block px-16 py-8 rounded-2xl bg-emerald-800/40 backdrop-blur-sm border border-emerald-500/30">
          <h3 className="text-7xl md:text-8xl font-bold text-white mb-3">
            UPIS
          </h3>
          <p className="text-2xl text-emerald-200">
            za Djecu, Omladinu, Odrasle
          </p>
        </div>

        {/* Details Grid */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {/* Schedule */}
          <div className="px-8 py-5 rounded-xl bg-emerald-900/40 backdrop-blur-sm border border-emerald-500/20">
            <h4 className="text-sm font-semibold text-emerald-300/70 uppercase tracking-wide mb-2">
              Termin održavanja:
            </h4>
            <p className="text-2xl font-bold text-white">
              SUBOTA I NEDELJA
            </p>
          </div>

          {/* Contact Men */}
          <div className="px-8 py-5 rounded-xl bg-emerald-900/40 backdrop-blur-sm border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-emerald-400" />
              <div className="text-left">
                <h4 className="text-xs font-semibold text-emerald-300/70 uppercase">
                  Za muškarce:
                </h4>
                <p className="text-xl font-bold text-white">
                  +43 660 5515940
                </p>
              </div>
            </div>
          </div>

          {/* Contact Women */}
          <div className="px-8 py-5 rounded-xl bg-emerald-900/40 backdrop-blur-sm border border-emerald-500/20">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-emerald-400" />
              <div className="text-left">
                <h4 className="text-xs font-semibold text-emerald-300/70 uppercase">
                  Za žene:
                </h4>
                <p className="text-xl font-bold text-white">
                  +43 660 2001711
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSlide;
