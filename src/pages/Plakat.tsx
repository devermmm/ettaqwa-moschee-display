import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
const Plakat = () => {
  const handlePrint = () => {
    window.print();
  };
  return <>
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
          
          {/* Islamic Border Frame */}
          <div className="absolute inset-0 p-3">
            <div className="w-full h-full border-4 border-emerald-600 rounded-lg relative">
              {/* Corner Ornaments */}
              <div className="absolute -top-1 -left-1 w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-emerald-600 text-2xl">✦</span>
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-emerald-600 text-2xl">✦</span>
              </div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-emerald-600 text-2xl">✦</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-emerald-600 text-2xl">✦</span>
              </div>
              {/* Inner Border */}
              <div className="absolute inset-2 border-2 border-emerald-300 rounded" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full px-12 py-10 flex flex-col items-center text-center">
            
            {/* Header */}
            <img src={logo} alt="Et-Taqwa" className="h-20 mb-2" />
            <h1 className="text-2xl font-bold text-emerald-800 tracking-wider">DŽEMAT ET-TAQWA</h1>
            <p className="text-xl font-arabic text-emerald-600 mb-4">مسجد التقوى</p>

            {/* Decorative Line */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-0.5 bg-emerald-400" />
              <span className="text-emerald-500 text-xl">☪</span>
              <div className="w-16 h-0.5 bg-emerald-400" />
            </div>

            {/* Bismillah */}
            <p className="text-3xl font-arabic text-emerald-700 mb-6">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>

            {/* Main Title */}
            <h2 className="text-4xl font-bold text-emerald-800 mb-6">
              MOSCHEE GESCHLOSSEN
            </h2>

            {/* Time Box */}
            <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl px-10 py-6 mb-6">
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-800">Samstag</p>
                  <p className="text-xl text-emerald-600">8. Februar</p>
                  <p className="text-5xl font-bold text-emerald-700 mt-1">7:30</p>
                </div>
                <div className="text-5xl text-emerald-400 font-light">→</div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-800">Sonntag</p>
                  <p className="text-xl text-emerald-600">9. Februar</p>
                  <p className="text-5xl font-bold text-emerald-700 mt-1">6:00</p>
                </div>
              </div>
            </div>

            {/* Reason */}
            <p className="text-2xl text-emerald-700 mb-8">
              🧹 <span className="font-semibold">Teppichreinigung</span> ✨
            </p>

            {/* Three Languages */}
            <div className="grid grid-cols-3 gap-8 w-full mb-8">
              <div className="text-center">
                <p className="text-sm text-emerald-400 uppercase tracking-wider mb-2">العربية</p>
                <p className="text-xl font-arabic text-emerald-800 font-bold">المسجد مغلق</p>
                <p className="text-base font-arabic text-emerald-600">بسبب تنظيف السجاد</p>
              </div>
              <div className="text-center border-x border-emerald-200 px-4">
                <p className="text-sm text-emerald-400 uppercase tracking-wider mb-2">Bosanski</p>
                <p className="text-xl text-emerald-800 font-bold">Džamija zatvorena</p>
                <p className="text-base text-emerald-600">zbog čišćenja tepiha</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-emerald-400 uppercase tracking-wider mb-2">Deutsch</p>
                <p className="text-xl text-emerald-800 font-bold">Moschee geschlossen</p>
                <p className="text-base text-emerald-600 mx-0 my-[89px]">wegen Teppichreinigung</p>
              </div>
            </div>

            {/* Quran Verse */}
            <div className="bg-emerald-50/50 rounded-xl px-8 py-4 mb-6">
              <p className="text-2xl font-arabic text-emerald-700 mb-2">
                إِنَّ اللَّهَ يُحِبُّ الْمُتَطَهِّرِينَ
              </p>
              <p className="text-base text-emerald-600 italic">
                "Wahrlich, Allah liebt die sich Reinigenden." – Qur'an 2:222
              </p>
            </div>

            {/* Thank You */}
            <p className="text-xl text-emerald-600 mb-2">
              جزاكم الله خيراً • Hvala na razumijevanju • Vielen Dank
            </p>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="mt-auto">
              <div className="flex items-center gap-3 justify-center mb-3">
                <div className="w-12 h-0.5 bg-emerald-300" />
                <span className="text-emerald-400">☪</span>
                <div className="w-12 h-0.5 bg-emerald-300" />
              </div>
              <p className="text-2xl font-bold text-emerald-800 mb-1">LIEBE GRÜSSE</p>
              <p className="text-xl text-emerald-700 mb-3">Euer ET-TAQWA TEAM</p>
              <p className="text-xl font-arabic text-emerald-600">
                السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </p>
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default Plakat;