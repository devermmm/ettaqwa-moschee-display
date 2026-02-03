import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const Plakat = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print-specific styles to remove browser headers/footers */}
      <style>{`
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 flex items-center justify-center p-4 print:p-0 print:bg-white relative">
        
        {/* Print Button */}
        <div className="fixed top-4 right-4 z-50 print:hidden">
          <Button 
            onClick={handlePrint}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
          >
            <Printer className="w-4 h-4 mr-2" />
            Drucken / PDF
          </Button>
          <p className="text-xs text-white/70 mt-2 text-center max-w-[200px]">
            Tipp: Im Druckdialog "Kopf- und Fußzeilen" deaktivieren
          </p>
        </div>

        {/* A4 Container */}
        <div className="w-[210mm] h-[297mm] bg-white shadow-2xl print:shadow-none relative overflow-hidden flex flex-col">
          
          {/* Top Border */}
          <div className="h-4 bg-emerald-600 shrink-0" />
          
          {/* Content */}
          <div className="flex-1 px-12 py-6 flex flex-col items-center text-center">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <img src={logo} alt="Et-Taqwa" className="h-16" />
              <div className="text-left">
                <h1 className="text-2xl font-bold text-emerald-800">DŽEMAT ET-TAQWA</h1>
                <p className="text-xl font-arabic text-emerald-600">مسجد التقوى</p>
              </div>
            </div>

            {/* Bismillah */}
            <p className="text-3xl font-arabic text-emerald-700 mb-6">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            {/* Main Announcement */}
            <div className="w-full max-w-lg bg-emerald-50 border-4 border-emerald-500 rounded-2xl p-6 mb-6">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center">
                  <span className="text-5xl">🕌</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-emerald-800 mb-4">
                MOSCHEE GESCHLOSSEN
              </h2>
              
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-800">Samstag</p>
                    <p className="text-xl font-semibold text-emerald-600">8. Februar</p>
                    <p className="text-4xl font-bold text-emerald-700">7:30</p>
                  </div>
                  <span className="text-5xl text-emerald-400">→</span>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-800">Sonntag</p>
                    <p className="text-xl font-semibold text-emerald-600">9. Februar</p>
                    <p className="text-4xl font-bold text-emerald-700">6:00</p>
                  </div>
                </div>
              </div>

              <p className="text-2xl text-emerald-700 flex items-center justify-center gap-3">
                <span>🧹</span>
                <span className="font-semibold">Teppichreinigung</span>
                <span>✨</span>
              </p>
            </div>

            {/* Three Languages */}
            <div className="w-full grid grid-cols-3 gap-6 mb-6">
              <div className="text-center border-r-2 border-emerald-200 pr-4">
                <p className="text-lg text-emerald-500 mb-2">العربية</p>
                <p className="text-2xl font-arabic text-emerald-800 font-bold">المسجد مغلق</p>
                <p className="text-lg font-arabic text-emerald-600">بسبب تنظيف السجاد</p>
              </div>
              <div className="text-center border-r-2 border-emerald-200 pr-4">
                <p className="text-lg text-emerald-500 mb-2">Bosanski</p>
                <p className="text-2xl text-emerald-800 font-bold">Džamija zatvorena</p>
                <p className="text-lg text-emerald-600">zbog čišćenja tepiha</p>
              </div>
              <div className="text-center">
                <p className="text-lg text-emerald-500 mb-2">Deutsch</p>
                <p className="text-2xl text-emerald-800 font-bold">Moschee geschlossen</p>
                <p className="text-lg text-emerald-600">wegen Teppichreinigung</p>
              </div>
            </div>

            {/* Islamic Quote */}
            <div className="bg-emerald-50 rounded-xl px-8 py-4 mb-4">
              <p className="text-2xl font-arabic text-emerald-700 mb-2">
                إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ
              </p>
              <p className="text-lg text-emerald-600 italic">
                "Allah liebt die Reumütigen und die sich Reinigenden." — Qur'an 2:222
              </p>
            </div>

            {/* Thank You */}
            <p className="text-2xl font-arabic text-emerald-700 mb-1">جزاكم الله خيراً</p>
            <p className="text-lg text-emerald-600">
              Hvala na razumijevanju • Vielen Dank für Ihr Verständnis
            </p>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="mt-auto pt-4 border-t-2 border-emerald-200 w-full">
              <p className="text-2xl font-bold text-emerald-800 mb-1">
                ❤️ LIEBE GRÜSSE ❤️
              </p>
              <p className="text-xl text-emerald-700 mb-3">Euer ET-TAQWA TEAM</p>
              <p className="text-xl font-arabic text-emerald-600">
                السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </p>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="h-4 bg-emerald-600 shrink-0" />
        </div>
      </div>
    </>
  );
};

export default Plakat;
