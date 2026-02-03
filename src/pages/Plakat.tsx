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
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-emerald-900 flex items-center justify-center p-4 print:p-0 print:m-0 print:bg-white">
        
        {/* Print Button */}
        <div className="fixed top-4 right-4 z-50 print:hidden">
          <Button 
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
          >
            <Printer className="w-4 h-4 mr-2" />
            Drucken / PDF
          </Button>
          <p className="text-[10px] text-white/60 mt-2 text-center">
            Kopf-/Fußzeilen deaktivieren
          </p>
        </div>

        {/* A4 Container - Exact dimensions */}
        <div className="print-container w-[210mm] h-[297mm] bg-white shadow-2xl print:shadow-none flex flex-col overflow-hidden">
          
          {/* Top Border */}
          <div className="h-3 bg-emerald-600 shrink-0" />
          
          {/* Content */}
          <div className="flex-1 px-8 py-4 flex flex-col items-center text-center min-h-0">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="Et-Taqwa" className="h-12" />
              <div className="text-left">
                <h1 className="text-xl font-bold text-emerald-800">DŽEMAT ET-TAQWA</h1>
                <p className="text-lg font-arabic text-emerald-600">مسجد التقوى</p>
              </div>
            </div>

            {/* Bismillah */}
            <p className="text-2xl font-arabic text-emerald-700 mb-4">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            {/* Main Announcement */}
            <div className="w-full max-w-md bg-emerald-50 border-3 border-emerald-500 rounded-xl p-5 mb-4">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center">
                  <span className="text-4xl">🕌</span>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-emerald-800 mb-3">
                MOSCHEE GESCHLOSSEN
              </h2>
              
              <div className="bg-white rounded-lg p-3 mb-3 border border-emerald-200">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-emerald-800">Samstag</p>
                    <p className="text-base font-semibold text-emerald-600">8. Februar</p>
                    <p className="text-3xl font-bold text-emerald-700">7:30</p>
                  </div>
                  <span className="text-4xl text-emerald-400">→</span>
                  <div className="text-center">
                    <p className="text-xl font-bold text-emerald-800">Sonntag</p>
                    <p className="text-base font-semibold text-emerald-600">9. Februar</p>
                    <p className="text-3xl font-bold text-emerald-700">6:00</p>
                  </div>
                </div>
              </div>

              <p className="text-xl text-emerald-700 flex items-center justify-center gap-2">
                <span>🧹</span>
                <span className="font-semibold">Teppichreinigung</span>
                <span>✨</span>
              </p>
            </div>

            {/* Three Languages */}
            <div className="w-full grid grid-cols-3 gap-4 mb-4 px-4">
              <div className="text-center">
                <p className="text-sm text-emerald-500 mb-1">العربية</p>
                <p className="text-lg font-arabic text-emerald-800 font-bold">المسجد مغلق</p>
                <p className="text-sm font-arabic text-emerald-600">بسبب تنظيف السجاد</p>
              </div>
              <div className="text-center border-x border-emerald-200 px-2">
                <p className="text-sm text-emerald-500 mb-1">Bosanski</p>
                <p className="text-lg text-emerald-800 font-bold">Džamija zatvorena</p>
                <p className="text-sm text-emerald-600">zbog čišćenja tepiha</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-emerald-500 mb-1">Deutsch</p>
                <p className="text-lg text-emerald-800 font-bold">Moschee geschlossen</p>
                <p className="text-sm text-emerald-600">wegen Teppichreinigung</p>
              </div>
            </div>

            {/* Islamic Quote */}
            <div className="bg-emerald-50 rounded-lg px-6 py-3 mb-3">
              <p className="text-xl font-arabic text-emerald-700 mb-1">
                إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ
              </p>
              <p className="text-sm text-emerald-600 italic">
                "Allah liebt die Reumütigen und die sich Reinigenden." — Qur'an 2:222
              </p>
            </div>

            {/* Thank You */}
            <p className="text-xl font-arabic text-emerald-700 mb-1">جزاكم الله خيراً</p>
            <p className="text-base text-emerald-600">
              Hvala na razumijevanju • Vielen Dank für Ihr Verständnis
            </p>

            {/* Spacer */}
            <div className="flex-1 min-h-2" />

            {/* Footer */}
            <div className="pt-3 border-t border-emerald-200 w-full">
              <p className="text-xl font-bold text-emerald-800 mb-1">
                ❤️ LIEBE GRÜSSE ❤️
              </p>
              <p className="text-lg text-emerald-700 mb-2">Euer ET-TAQWA TEAM</p>
              <p className="text-lg font-arabic text-emerald-600">
                السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </p>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="h-3 bg-emerald-600 shrink-0" />
        </div>
      </div>
    </>
  );
};

export default Plakat;
