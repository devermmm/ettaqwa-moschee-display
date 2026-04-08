import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Printer, Clock, Sun, Moon } from "lucide-react";

const Oeffnungszeiten = () => {
  const handlePrint = () => {
    window.print();
  };

  const tage = [
    { tag: "Montag", von: "08:00", bis: "20:00" },
    { tag: "Dienstag", von: "08:00", bis: "20:00" },
    { tag: "Mittwoch", von: "08:00", bis: "20:00" },
    { tag: "Donnerstag", von: "08:00", bis: "20:00" },
    { tag: "Freitag", von: "08:00", bis: "21:00" },
    { tag: "Samstag", von: "09:00", bis: "20:00" },
    { tag: "Sonntag", von: "09:00", bis: "20:00" },
  ];

  const today = new Date().getDay();
  // JS: 0=Sun, we want Mon=0
  const todayIndex = today === 0 ? 6 : today - 1;

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
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-emerald-900 flex items-center justify-center p-4 print:p-0 print:m-0 print:bg-white">
        
        {/* Print Button */}
        <div className="fixed top-4 right-4 z-50 no-print">
          <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
            <Printer className="w-4 h-4 mr-2" />
            Drucken / PDF
          </Button>
        </div>

        {/* A4 Container */}
        <div className="print-container w-[210mm] h-[297mm] bg-gradient-to-b from-emerald-50 via-white to-emerald-50 shadow-2xl print:shadow-none relative overflow-hidden">
          
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 left-10 text-[200px] font-arabic text-emerald-900 leading-none select-none">☪</div>
            <div className="absolute bottom-20 right-10 text-[200px] font-arabic text-emerald-900 leading-none select-none rotate-180">☪</div>
          </div>

          {/* Outer Border */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-4 border-[5px] border-emerald-700 rounded-2xl" />
            <div className="absolute inset-7 border-2 border-emerald-400/60 rounded-xl" />
            
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 w-14 h-14 border-l-4 border-t-4 border-emerald-600 rounded-tl-2xl" />
            <div className="absolute top-2 right-2 w-14 h-14 border-r-4 border-t-4 border-emerald-600 rounded-tr-2xl" />
            <div className="absolute bottom-2 left-2 w-14 h-14 border-l-4 border-b-4 border-emerald-600 rounded-bl-2xl" />
            <div className="absolute bottom-2 right-2 w-14 h-14 border-r-4 border-b-4 border-emerald-600 rounded-br-2xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full px-14 py-10 flex flex-col items-center text-center">
            
            {/* Header */}
            <img src={logo} alt="Et-Taqwa" className="h-20 mb-2" />
            <h1 className="text-2xl font-bold text-emerald-800 tracking-[0.2em]">DŽEMAT ET-TAQWA</h1>
            <p className="text-xl font-arabic text-emerald-600 mb-3">مسجد التقوى</p>

            {/* Decorative Divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent to-emerald-500" />
              <span className="text-emerald-600 text-2xl">☪</span>
              <div className="w-24 h-[2px] bg-gradient-to-l from-transparent to-emerald-500" />
            </div>

            {/* Bismillah */}
            <p className="text-3xl font-arabic text-emerald-700 mb-6">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            {/* Main Title */}
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-8 h-8 text-emerald-600" />
              <h2 className="text-4xl font-bold text-emerald-800 tracking-wide">
                ÖFFNUNGSZEITEN
              </h2>
              <Clock className="w-8 h-8 text-emerald-600" />
            </div>

            {/* Opening Hours Table */}
            <div className="w-full max-w-[140mm] mb-8">
              {tage.map((item, index) => {
                const isToday = index === todayIndex;
                const isFriday = index === 4;
                return (
                  <div
                    key={item.tag}
                    className={`
                      flex items-center justify-between px-6 py-3.5
                      ${index === 0 ? 'rounded-t-2xl' : ''}
                      ${index === tage.length - 1 ? 'rounded-b-2xl' : ''}
                      ${isToday 
                        ? 'bg-emerald-600 text-white shadow-lg scale-[1.02]' 
                        : isFriday 
                          ? 'bg-emerald-100 border-x-2 border-emerald-300'
                          : index % 2 === 0 
                            ? 'bg-white border-x-2 border-emerald-200' 
                            : 'bg-emerald-50/80 border-x-2 border-emerald-200'
                      }
                      ${index === 0 ? 'border-t-2 border-emerald-300' : ''}
                      ${index === tage.length - 1 ? 'border-b-2 border-emerald-300' : ''}
                      transition-all
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {isFriday && !isToday && (
                        <span className="text-emerald-600 text-sm">☪</span>
                      )}
                      <span className={`text-xl font-bold ${isToday ? 'text-white' : 'text-emerald-800'}`}>
                        {item.tag}
                      </span>
                      {isFriday && !isToday && (
                        <span className="text-sm text-emerald-500 font-medium">(Džuma)</span>
                      )}
                      {isFriday && isToday && (
                        <span className="text-sm text-emerald-200 font-medium">(Džuma)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className={`w-4 h-4 ${isToday ? 'text-emerald-200' : 'text-emerald-400'}`} />
                      <span className={`text-2xl font-bold tabular-nums ${isToday ? 'text-white' : 'text-emerald-700'}`}>
                        {item.von}
                      </span>
                      <span className={`text-lg mx-1 ${isToday ? 'text-emerald-200' : 'text-emerald-400'}`}>–</span>
                      <span className={`text-2xl font-bold tabular-nums ${isToday ? 'text-white' : 'text-emerald-700'}`}>
                        {item.bis}
                      </span>
                      <Moon className={`w-4 h-4 ${isToday ? 'text-emerald-200' : 'text-emerald-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note */}
            <div className="bg-emerald-100/60 rounded-xl px-8 py-4 mb-5 max-w-[140mm]">
              <p className="text-lg text-emerald-700">
                🕌 Die Moschee ist zu allen <span className="font-bold">fünf Gebetszeiten</span> geöffnet.
              </p>
              <p className="text-base text-emerald-600 mt-1">
                An Feiertagen können abweichende Zeiten gelten.
              </p>
            </div>

            {/* Three Languages */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-[150mm] mb-5">
              <div className="text-center">
                <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">العربية</p>
                <p className="text-lg font-arabic text-emerald-800 font-bold">أوقات الدوام</p>
              </div>
              <div className="text-center border-x-2 border-emerald-200 px-3">
                <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">Bosanski</p>
                <p className="text-lg text-emerald-800 font-bold">Radno vrijeme</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">Deutsch</p>
                <p className="text-lg text-emerald-800 font-bold">Öffnungszeiten</p>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="mt-auto">
              <div className="flex items-center gap-3 justify-center mb-2">
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-emerald-400" />
                <span className="text-emerald-500 text-lg">☪</span>
                <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-emerald-400" />
              </div>
              <p className="text-lg font-bold text-emerald-800 mb-1">EUER ET-TAQWA TEAM</p>
              <p className="text-xl font-arabic text-emerald-600">
                السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Oeffnungszeiten;
