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

      {/* A4 Container */}
      <div className="w-[210mm] min-h-[297mm] bg-gradient-to-b from-emerald-50 via-white to-emerald-50 shadow-2xl print:shadow-none relative overflow-hidden">
        
        {/* Elegant Border */}
        <div className="absolute inset-4 border-2 border-emerald-300 rounded-3xl pointer-events-none" />
        <div className="absolute inset-6 border border-emerald-200 rounded-2xl pointer-events-none" />

        {/* Corner Ornaments */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl" />

        {/* Content */}
        <div className="relative z-10 px-16 py-12 flex flex-col items-center text-center h-full">
          
          {/* Logo & Header */}
          <img 
            src={logo} 
            alt="Et-Taqwa Logo" 
            className="h-20 mb-3 drop-shadow-md"
          />
          <h1 className="text-2xl font-bold text-emerald-800 tracking-widest mb-1">
            DŽEMAT ET-TAQWA
          </h1>
          <p className="text-xl font-arabic text-emerald-600 mb-6">مسجد التقوى</p>

          {/* Bismillah */}
          <p className="text-2xl font-arabic text-emerald-700 mb-8">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* Main Icon */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl mb-6">
            <span className="text-5xl">🕌</span>
          </div>

          {/* Time Display - Elegant */}
          <div className="bg-white border-2 border-emerald-400 rounded-2xl px-10 py-6 mb-8 shadow-lg">
            <p className="text-sm text-emerald-600 uppercase tracking-widest mb-2 font-semibold">
              Moschee vorübergehend geschlossen
            </p>
            <div className="flex items-center justify-center gap-4 text-emerald-800">
              <div className="text-center">
                <p className="text-3xl font-bold">Samstag</p>
                <p className="text-2xl">7:30</p>
              </div>
              <span className="text-4xl text-emerald-400">→</span>
              <div className="text-center">
                <p className="text-3xl font-bold">Sonntag</p>
                <p className="text-2xl">6:00</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-emerald-200">
              <p className="text-emerald-600 flex items-center justify-center gap-2">
                <span>🧹</span>
                <span className="font-medium">Teppichreinigung</span>
                <span>✨</span>
              </p>
            </div>
          </div>

          {/* Three Languages - Clean Cards */}
          <div className="grid grid-cols-3 gap-6 w-full mb-8">
            
            {/* Arabic */}
            <div className="text-center">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-4" />
              <p className="text-xs text-emerald-500 uppercase tracking-widest mb-3">العربية</p>
              <p className="text-lg font-arabic text-emerald-800 font-semibold mb-1">
                المسجد مغلق
              </p>
              <p className="text-sm font-arabic text-emerald-600">
                بسبب تنظيف السجاد
              </p>
            </div>

            {/* Bosnian */}
            <div className="text-center">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-4" />
              <p className="text-xs text-emerald-500 uppercase tracking-widest mb-3">Bosanski</p>
              <p className="text-lg text-emerald-800 font-semibold mb-1">
                Džamija zatvorena
              </p>
              <p className="text-sm text-emerald-600">
                zbog čišćenja tepiha
              </p>
            </div>

            {/* German */}
            <div className="text-center">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-4" />
              <p className="text-xs text-emerald-500 uppercase tracking-widest mb-3">Deutsch</p>
              <p className="text-lg text-emerald-800 font-semibold mb-1">
                Moschee geschlossen
              </p>
              <p className="text-sm text-emerald-600">
                wegen Teppichreinigung
              </p>
            </div>
          </div>

          {/* Islamic Quote */}
          <div className="max-w-md mb-6">
            <p className="text-xl font-arabic text-emerald-700 mb-2 leading-relaxed">
              إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ
            </p>
            <p className="text-sm text-emerald-600 italic">
              "Allah liebt die Reumütigen und die sich Reinigenden."
            </p>
            <p className="text-xs text-emerald-500 mt-1">— Qur'an 2:222</p>
          </div>

          {/* Thank You */}
          <p className="text-lg font-arabic text-emerald-700 mb-1">جزاكم الله خيراً</p>
          <p className="text-sm text-emerald-600 mb-6">
            Hvala na razumijevanju • Vielen Dank für Ihr Verständnis
          </p>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Footer */}
          <div className="mt-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-px bg-emerald-300" />
              <span className="text-emerald-400">☪</span>
              <div className="w-12 h-px bg-emerald-300" />
            </div>
            
            <p className="text-xl font-bold text-emerald-800 mb-1">
              LIEBE GRÜSSE
            </p>
            <p className="text-lg text-emerald-700 mb-4">
              Euer ET-TAQWA TEAM
            </p>
            
            <p className="text-lg font-arabic text-emerald-600">
              السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plakat;
