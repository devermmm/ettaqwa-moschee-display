import { useRef } from "react";
import logo from "@/assets/logo.png";
import PosterExportActions from "@/components/poster/PosterExportActions";

const Gebetswaschung = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  const translations = [
    { lang: "العربية", text: "يُمنع الوضوء هنا", isArabic: true },
    { lang: "Türkçe", text: "BURADA ABDEST ALMAK YASAKTIR", isArabic: false },
    { lang: "Bosanski", text: "UZIMANJE ABDESTA OVDJE ZABRANJENO", isArabic: false },
    { lang: "Shqip", text: "MARRJA E ABDESTIT KËTU ËSHTË E NDALUAR", isArabic: false },
  ];

  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col items-center justify-center p-4 gap-4">
      <PosterExportActions
        captureRef={posterRef}
        filename="gebetswaschung-verbot-et-taqwa.png"
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
            <p className="text-2xl font-arabic text-emerald-600 mb-4">مسجد التقوى</p>

            <div className="flex items-center gap-3 mb-10">
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent to-emerald-500" />
              <span className="text-emerald-600 text-2xl">☪</span>
              <div className="w-24 h-[2px] bg-gradient-to-l from-transparent to-emerald-500" />
            </div>

            <div className="bg-red-600 rounded-2xl px-10 py-6 mb-10 w-full max-w-[160mm] shadow-lg">
              <p className="text-4xl font-bold text-white tracking-wider leading-tight">
                ⛔ GEBETSWASCHUNG
                <br />
                HIER VERBOTEN ⛔
              </p>
            </div>

            <div className="w-full max-w-[160mm] flex flex-col gap-3">
              {translations.map((item) => (
                <div
                  key={item.lang}
                  className="flex items-center justify-between bg-white border-2 border-emerald-200 rounded-xl px-6 py-4 shadow-sm"
                >
                  <span className="text-lg font-semibold text-emerald-500 uppercase tracking-wider min-w-[90px] text-left">
                    {item.lang}
                  </span>
                  <span className={`text-2xl font-bold text-emerald-800 text-right ${item.isArabic ? "font-arabic text-4xl" : ""}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-10">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-emerald-400" />
              <span className="text-emerald-500 text-lg">☪</span>
              <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gebetswaschung;
