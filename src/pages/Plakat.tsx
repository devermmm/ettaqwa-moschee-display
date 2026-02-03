import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const Plakat = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          @page {
            margin: 0;
            size: A4 portrait;
          }
          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-container {
            width: 210mm !important;
            height: 297mm !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-emerald-900 flex items-center justify-center p-4 print:p-0 print:m-0 print:bg-white">
        
        {/* Print Button */}
        <div className="fixed top-4 right-4 z-50 print:hidden">
          <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
            <Printer className="w-4 h-4 mr-2" />
            Drucken / PDF
          </Button>
        </div>

        {/* A4 Container */}
        <div className="print-container w-[210mm] h-[297mm] bg-white shadow-2xl print:shadow-none relative overflow-hidden">
          
          {/* Decorative Islamic Border */}
          <div className="absolute inset-0">
            {/* Outer colored border */}
            <div className="absolute inset-3 border-[6px] border-emerald-600 rounded-xl" />
            {/* Gold accent line */}
            <div className="absolute inset-5 border-2 border-amber-400 rounded-lg" />
            {/* Inner subtle border */}
            <div className="absolute inset-7 border border-emerald-200 rounded" />
            
            {/* Corner Decorations */}
            <svg className="absolute top-1 left-1 w-14 h-14 text-emerald-600" viewBox="0 0 100 100">
              <path d="M10 50 Q10 10 50 10" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="10" r="4" fill="currentColor"/>
              <circle cx="10" cy="50" r="4" fill="currentColor"/>
              <path d="M25 25 L35 15 L45 25 L35 35 Z" fill="currentColor"/>
            </svg>
            <svg className="absolute top-1 right-1 w-14 h-14 text-emerald-600 rotate-90" viewBox="0 0 100 100">
              <path d="M10 50 Q10 10 50 10" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="10" r="4" fill="currentColor"/>
              <circle cx="10" cy="50" r="4" fill="currentColor"/>
              <path d="M25 25 L35 15 L45 25 L35 35 Z" fill="currentColor"/>
            </svg>
            <svg className="absolute bottom-1 left-1 w-14 h-14 text-emerald-600 -rotate-90" viewBox="0 0 100 100">
              <path d="M10 50 Q10 10 50 10" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="10" r="4" fill="currentColor"/>
              <circle cx="10" cy="50" r="4" fill="currentColor"/>
              <path d="M25 25 L35 15 L45 25 L35 35 Z" fill="currentColor"/>
            </svg>
            <svg className="absolute bottom-1 right-1 w-14 h-14 text-emerald-600 rotate-180" viewBox="0 0 100 100">
              <path d="M10 50 Q10 10 50 10" fill="none" stroke="currentColor" strokeWidth="3"/>
              <circle cx="50" cy="10" r="4" fill="currentColor"/>
              <circle cx="10" cy="50" r="4" fill="currentColor"/>
              <path d="M25 25 L35 15 L45 25 L35 35 Z" fill="currentColor"/>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full px-12 py-10 flex flex-col items-center text-center">
            
            {/* Header */}
            <img src={logo} alt="Et-Taqwa" className="h-16 mb-1" />
            <h1 className="text-xl font-bold text-emerald-800 tracking-wider">DŽEMAT ET-TAQWA</h1>
            <p className="text-lg font-arabic text-emerald-600 mb-2">مسجد التقوى</p>

            {/* Decorative Divider */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-emerald-400" />
              <span className="text-amber-500 text-xl">☪</span>
              <div className="w-16 h-[2px] bg-gradient-to-l from-transparent via-emerald-400 to-emerald-400" />
            </div>

            {/* Bismillah */}
            <p className="text-2xl font-arabic text-emerald-700 mb-4">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            {/* Main Title */}
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">
              MOSCHEE GESCHLOSSEN
            </h2>

            {/* Time Box */}
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl px-8 py-4 mb-4">
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-800">Samstag</p>
                  <p className="text-base text-emerald-600">8. Februar</p>
                  <p className="text-4xl font-bold text-emerald-700 mt-1">7:30</p>
                </div>
                <div className="text-4xl text-emerald-400 font-light">→</div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-800">Sonntag</p>
                  <p className="text-base text-emerald-600">9. Februar</p>
                  <p className="text-4xl font-bold text-emerald-700 mt-1">6:00</p>
                </div>
              </div>
            </div>

            {/* Reason */}
            <p className="text-xl text-emerald-700 mb-5">
              🧹 <span className="font-semibold">Teppichreinigung</span> ✨
            </p>

            {/* Three Languages */}
            <div className="grid grid-cols-3 gap-5 w-full mb-5">
              <div className="text-center">
                <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">العربية</p>
                <p className="text-lg font-arabic text-emerald-800 font-bold">المسجد مغلق</p>
                <p className="text-sm font-arabic text-emerald-600">بسبب تنظيف السجاد</p>
              </div>
              <div className="text-center border-x border-emerald-200 px-3">
                <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">Bosanski</p>
                <p className="text-lg text-emerald-800 font-bold">Džamija zatvorena</p>
                <p className="text-sm text-emerald-600">zbog čišćenja tepiha</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">Deutsch</p>
                <p className="text-lg text-emerald-800 font-bold">Moschee geschlossen</p>
                <p className="text-sm text-emerald-600">wegen Teppichreinigung</p>
              </div>
            </div>

            {/* Quran Verse */}
            <div className="bg-emerald-50/50 rounded-lg px-6 py-3 mb-4">
              <p className="text-xl font-arabic text-emerald-700 mb-1">
                إِنَّ اللَّهَ يُحِبُّ الْمُتَطَهِّرِينَ
              </p>
              <p className="text-sm text-emerald-600 italic">
                "Wahrlich, Allah liebt die sich Reinigenden." – Qur'an 2:222
              </p>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="mt-auto">
              <div className="flex items-center gap-2 justify-center mb-2">
                <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-amber-400" />
                <span className="text-amber-500 text-sm">☪</span>
                <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-amber-400" />
              </div>
              <p className="text-xl font-bold text-emerald-800 mb-1">LIEBE GRÜSSE</p>
              <p className="text-lg text-emerald-700 mb-2">Euer ET-TAQWA TEAM</p>
              <p className="text-lg font-arabic text-emerald-600">
                السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plakat;
