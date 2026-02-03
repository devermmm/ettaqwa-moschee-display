import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

const Plakat = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 flex items-center justify-center p-4 print:p-0 print:bg-white relative">
      
      {/* Download/Print Buttons - Hidden when printing */}
      <div className="fixed top-4 right-4 flex gap-2 z-50 print:hidden">
        <Button 
          onClick={handlePrint}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
        >
          <Printer className="w-4 h-4 mr-2" />
          Drucken / PDF
        </Button>
      </div>

      {/* A4 Container - Exact fit */}
      <div className="w-[210mm] h-[297mm] bg-gradient-to-b from-emerald-50 via-white to-emerald-50 shadow-2xl print:shadow-none relative overflow-hidden flex flex-col">
        
        {/* Elegant Border */}
        <div className="absolute inset-3 border-2 border-emerald-300 rounded-2xl pointer-events-none" />
        <div className="absolute inset-5 border border-emerald-200 rounded-xl pointer-events-none" />

        {/* Corner Ornaments */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-emerald-500 rounded-br-xl" />

        {/* Content */}
        <div className="relative z-10 px-12 py-8 flex flex-col items-center text-center flex-1">
          
          {/* Logo & Header */}
          <img 
            src={logo} 
            alt="Et-Taqwa Logo" 
            className="h-14 mb-2 drop-shadow-md"
          />
          <h1 className="text-xl font-bold text-emerald-800 tracking-widest mb-0.5">
            DŽEMAT ET-TAQWA
          </h1>
          <p className="text-base font-arabic text-emerald-600 mb-4">مسجد التقوى</p>

          {/* Bismillah */}
          <p className="text-xl font-arabic text-emerald-700 mb-4">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* Main Icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg mb-4">
            <span className="text-3xl">🕌</span>
          </div>

          {/* Time Display - Compact */}
          <div className="bg-white border-2 border-emerald-400 rounded-xl px-8 py-4 mb-5 shadow-md">
            <p className="text-xs text-emerald-600 uppercase tracking-widest mb-1 font-semibold">
              Moschee vorübergehend geschlossen
            </p>
            <div className="flex items-center justify-center gap-3 text-emerald-800">
              <div className="text-center">
                <p className="text-2xl font-bold">Samstag</p>
                <p className="text-xl">7:30</p>
              </div>
              <span className="text-3xl text-emerald-400">→</span>
              <div className="text-center">
                <p className="text-2xl font-bold">Sonntag</p>
                <p className="text-xl">6:00</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-emerald-200">
              <p className="text-emerald-600 flex items-center justify-center gap-2 text-sm">
                <span>🧹</span>
                <span className="font-medium">Teppichreinigung</span>
                <span>✨</span>
              </p>
            </div>
          </div>

          {/* Three Languages - Compact */}
          <div className="grid grid-cols-3 gap-4 w-full mb-5">
            
            {/* Arabic */}
            <div className="text-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-3" />
              <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-2">العربية</p>
              <p className="text-base font-arabic text-emerald-800 font-semibold mb-0.5">
                المسجد مغلق
              </p>
              <p className="text-xs font-arabic text-emerald-600">
                بسبب تنظيف السجاد
              </p>
            </div>

            {/* Bosnian */}
            <div className="text-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-3" />
              <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-2">Bosanski</p>
              <p className="text-base text-emerald-800 font-semibold mb-0.5">
                Džamija zatvorena
              </p>
              <p className="text-xs text-emerald-600">
                zbog čišćenja tepiha
              </p>
            </div>

            {/* German */}
            <div className="text-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-3" />
              <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-2">Deutsch</p>
              <p className="text-base text-emerald-800 font-semibold mb-0.5">
                Moschee geschlossen
              </p>
              <p className="text-xs text-emerald-600">
                wegen Teppichreinigung
              </p>
            </div>
          </div>

          {/* Islamic Quote - Compact */}
          <div className="max-w-sm mb-4">
            <p className="text-lg font-arabic text-emerald-700 mb-1 leading-relaxed">
              إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ
            </p>
            <p className="text-xs text-emerald-600 italic">
              "Allah liebt die Reumütigen und die sich Reinigenden."
            </p>
            <p className="text-[10px] text-emerald-500 mt-0.5">— Qur'an 2:222</p>
          </div>

          {/* Thank You */}
          <p className="text-base font-arabic text-emerald-700 mb-0.5">جزاكم الله خيراً</p>
          <p className="text-xs text-emerald-600 mb-4">
            Hvala na razumijevanju • Vielen Dank für Ihr Verständnis
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="mt-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-px bg-emerald-300" />
              <span className="text-emerald-400 text-sm">☪</span>
              <div className="w-10 h-px bg-emerald-300" />
            </div>
            
            <p className="text-lg font-bold text-emerald-800 mb-0.5">
              LIEBE GRÜSSE
            </p>
            <p className="text-base text-emerald-700 mb-2">
              Euer ET-TAQWA TEAM
            </p>
            
            <p className="text-base font-arabic text-emerald-600">
              السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plakat;
