import logo from "@/assets/logo.png";

const Plakat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 flex items-center justify-center p-4 print:p-0 print:bg-white">
      {/* A4 Container */}
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none relative overflow-hidden">
        {/* Decorative Top Arc */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-700 to-emerald-600">
          <div className="absolute -bottom-16 left-0 right-0 h-32 bg-white rounded-t-[100%]" />
          {/* Islamic Pattern Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-stars" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0L24 16L40 20L24 24L20 40L16 24L0 20L16 16Z" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-stars)"/>
          </svg>
        </div>

        {/* Decorative Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-700 to-emerald-600">
          <div className="absolute -top-10 left-0 right-0 h-20 bg-white rounded-b-[100%]" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-10 pt-8 pb-24 flex flex-col items-center text-center h-full">
          {/* Header with Logo */}
          <div className="flex items-center gap-4 mb-2">
            <img 
              src={logo} 
              alt="Et-Taqwa Logo" 
              className="h-16 drop-shadow-lg"
            />
            <div className="text-left">
              <h1 className="text-xl font-bold text-emerald-800 tracking-wide">
                DŽEMAT ET-TAQWA
              </h1>
              <p className="text-emerald-600 text-base font-arabic">مسجد التقوى</p>
            </div>
          </div>

          {/* Bismillah */}
          <div className="my-4">
            <p className="text-2xl font-arabic text-emerald-700">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>

          {/* Main Title */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 bg-amber-50 border-2 border-amber-400 rounded-full px-6 py-2 mb-3">
              <span className="text-2xl">⚠️</span>
              <span className="text-lg font-bold text-amber-700 uppercase tracking-wide">Wichtige Mitteilung</span>
              <span className="text-2xl">⚠️</span>
            </div>
          </div>

          {/* Cleaning Icon */}
          <div className="mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center shadow-lg border-4 border-emerald-300">
              <span className="text-4xl">🧹</span>
            </div>
          </div>

          {/* Time Box - Prominent */}
          <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white rounded-2xl px-8 py-4 mb-6 shadow-xl">
            <p className="text-sm uppercase tracking-widest mb-1 opacity-90">Moschee geschlossen</p>
            <p className="text-2xl font-bold">
              Samstag 7:30 – Sonntag 6:00
            </p>
          </div>

          {/* Three Language Cards */}
          <div className="grid grid-cols-3 gap-4 w-full mb-6">
            {/* Arabic */}
            <div className="bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-200 rounded-xl p-4 shadow-md">
              <div className="w-8 h-1 bg-emerald-500 rounded-full mx-auto mb-3" />
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">العربية</h3>
              <p className="text-base font-arabic text-emerald-800 leading-relaxed">
                المسجد مغلق
                <br />
                <span className="text-sm">من السبت 7:30 صباحاً</span>
                <br />
                <span className="text-sm">إلى الأحد 6:00 صباحاً</span>
              </p>
              <p className="text-xs text-emerald-600 mt-2 font-arabic">بسبب تنظيف السجاد</p>
            </div>

            {/* Bosnian */}
            <div className="bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-200 rounded-xl p-4 shadow-md">
              <div className="w-8 h-1 bg-emerald-500 rounded-full mx-auto mb-3" />
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Bosanski</h3>
              <p className="text-base text-emerald-800 leading-relaxed font-semibold">
                Džamija zatvorena
              </p>
              <p className="text-sm text-emerald-700">
                od subote 7:30
                <br />
                do nedjelje 6:00
              </p>
              <p className="text-xs text-emerald-600 mt-2">zbog čišćenja tepiha</p>
            </div>

            {/* German */}
            <div className="bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-200 rounded-xl p-4 shadow-md">
              <div className="w-8 h-1 bg-emerald-500 rounded-full mx-auto mb-3" />
              <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Deutsch</h3>
              <p className="text-base text-emerald-800 leading-relaxed font-semibold">
                Moschee geschlossen
              </p>
              <p className="text-sm text-emerald-700">
                von Samstag 7:30
                <br />
                bis Sonntag 6:00
              </p>
              <p className="text-xs text-emerald-600 mt-2">wegen Teppichreinigung</p>
            </div>
          </div>

          {/* Islamic Quote */}
          <div className="bg-emerald-50 rounded-2xl px-6 py-4 mb-4 border border-emerald-200 max-w-md">
            <p className="text-xl font-arabic text-emerald-700 mb-2">
              إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ
            </p>
            <p className="text-xs text-emerald-600 italic leading-relaxed">
              "Wahrlich, Allah liebt die Reumütigen und Er liebt die sich Reinigenden."
            </p>
            <p className="text-[10px] text-emerald-500 mt-1 font-medium">
              — Qur'an 2:222
            </p>
          </div>

          {/* Thank You */}
          <div className="flex items-center gap-2 text-emerald-700 mb-2">
            <span className="text-lg">🤲</span>
            <p className="font-arabic text-lg">جزاكم الله خيراً</p>
            <span className="text-lg">🤲</span>
          </div>
          <p className="text-sm text-emerald-600 mb-4">
            Hvala na razumijevanju • Vielen Dank für Ihr Verständnis
          </p>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Footer */}
          <div className="mt-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-emerald-400">✦</span>
              <span className="text-emerald-500">✦</span>
              <span className="text-emerald-400">✦</span>
            </div>
            
            <p className="text-xl font-bold text-emerald-800 mb-1">
              ❤️ LIEBE GRÜSSE ❤️
            </p>
            <p className="text-lg font-semibold text-emerald-700 mb-3">
              Euer ET-TAQWA TEAM
            </p>
            
            {/* Salaam */}
            <div className="bg-emerald-700 text-white rounded-full px-6 py-2 inline-block">
              <p className="text-base font-arabic">
                السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plakat;
