import { useRef } from "react";
import logo from "@/assets/logo.png";
import { Phone } from "lucide-react";
import PosterExportActions from "@/components/poster/PosterExportActions";

const Oeffnungszeiten = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col items-center justify-center p-4 gap-4">
      <PosterExportActions
        captureRef={posterRef}
        filename="restaurant-oeffnungszeiten-et-taqwa.png"
      />

      <div className="w-full overflow-auto">
        <div
          ref={posterRef}
          className="mx-auto w-[210mm] h-[297mm] bg-gradient-to-b from-emerald-50 to-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-3 border-[5px] border-emerald-700 rounded-2xl" />
            <div className="absolute inset-6 border-2 border-emerald-400/60 rounded-xl" />
            <div className="absolute top-1.5 left-1.5 w-12 h-12 border-l-4 border-t-4 border-emerald-600 rounded-tl-2xl" />
            <div className="absolute top-1.5 right-1.5 w-12 h-12 border-r-4 border-t-4 border-emerald-600 rounded-tr-2xl" />
            <div className="absolute bottom-1.5 left-1.5 w-12 h-12 border-l-4 border-b-4 border-emerald-600 rounded-bl-2xl" />
            <div className="absolute bottom-1.5 right-1.5 w-12 h-12 border-r-4 border-b-4 border-emerald-600 rounded-br-2xl" />
          </div>

          <div className="relative z-10 h-full px-12 py-10 flex flex-col items-center text-center justify-center">
            <img src={logo} alt="Et-Taqwa" className="h-24 mb-3" />
            <h1 className="text-3xl font-bold text-emerald-800 tracking-[0.2em]">DŽEMAT ET-TAQWA</h1>
            <p className="text-2xl font-arabic text-emerald-600 mb-2">مسجد التقوى</p>
            <h2 className="text-5xl font-bold text-emerald-800 tracking-wide mb-6">RESTAURANT</h2>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent to-emerald-500" />
              <span className="text-emerald-600 text-2xl">☪</span>
              <div className="w-24 h-[2px] bg-gradient-to-l from-transparent to-emerald-500" />
            </div>

            <div className="bg-white border-[3px] border-emerald-500 rounded-2xl px-12 py-8 mb-8 shadow-lg w-full max-w-[150mm]">
              <p className="text-2xl font-bold text-emerald-800 mb-2">Montag – Sonntag</p>
              <p className="text-6xl font-bold text-emerald-700 tabular-nums">8:00 – 18:00</p>
            </div>

            <div className="bg-red-50 border-2 border-red-400 rounded-2xl px-12 py-6 mb-10 w-full max-w-[150mm]">
              <p className="text-2xl font-bold text-red-700 mb-2">Dienstag</p>
              <p className="text-5xl font-bold text-red-600">GESCHLOSSEN</p>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-emerald-400" />
              <span className="text-emerald-500 text-lg">☪</span>
              <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-emerald-400" />
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-7 h-7 text-emerald-600" />
              <p className="text-3xl font-bold text-emerald-800 tracking-wide">+43 664 486 1236</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oeffnungszeiten;
