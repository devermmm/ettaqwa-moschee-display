import logo from "@/assets/logo.png";

const Plakat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 flex items-center justify-center p-4 print:p-0 print:bg-white">
      {/* A4 Container */}
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none relative overflow-hidden">
        {/* Islamic Pattern Border */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-8 bg-emerald-700" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-emerald-700" />
          <div className="absolute top-0 left-0 bottom-0 w-8 bg-emerald-700" />
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-emerald-700" />
          
          {/* Corner Decorations */}
          <svg className="absolute top-2 left-2 w-12 h-12 text-emerald-300" viewBox="0 0 100 100">
            <path d="M50 0L100 50L50 100L0 50Z" fill="currentColor" opacity="0.5"/>
          </svg>
          <svg className="absolute top-2 right-2 w-12 h-12 text-emerald-300" viewBox="0 0 100 100">
            <path d="M50 0L100 50L50 100L0 50Z" fill="currentColor" opacity="0.5"/>
          </svg>
          <svg className="absolute bottom-2 left-2 w-12 h-12 text-emerald-300" viewBox="0 0 100 100">
            <path d="M50 0L100 50L50 100L0 50Z" fill="currentColor" opacity="0.5"/>
          </svg>
          <svg className="absolute bottom-2 right-2 w-12 h-12 text-emerald-300" viewBox="0 0 100 100">
            <path d="M50 0L100 50L50 100L0 50Z" fill="currentColor" opacity="0.5"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 p-12 pt-16 flex flex-col items-center text-center h-full">
          {/* Logo */}
          <img 
            src={logo} 
            alt="Et-Taqwa Logo" 
            className="h-24 mb-4 drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold text-emerald-800 tracking-wide mb-2">
            DŽEMAT ET-TAQWA
          </h1>
          <p className="text-emerald-600 text-lg font-arabic mb-8">مسجد التقوى</p>

          {/* Bismillah */}
          <div className="mb-8">
            <p className="text-3xl font-arabic text-emerald-700">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>

          {/* Main Announcement Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-600 rounded-2xl p-8 mb-8 w-full max-w-lg shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl">🕌</span>
              <span className="text-3xl">🧹</span>
            </div>

            {/* Arabic */}
            <div className="mb-6 pb-6 border-b border-emerald-300">
              <h2 className="text-xl font-bold text-emerald-800 mb-2 font-arabic">
                إعلان هام
              </h2>
              <p className="text-lg text-emerald-700 font-arabic leading-relaxed">
                المسجد مغلق من السبت الساعة 7:30 صباحاً
                <br />
                حتى الأحد الساعة 6:00 صباحاً
                <br />
                بسبب تنظيف السجاد
              </p>
            </div>

            {/* Bosnian */}
            <div className="mb-6 pb-6 border-b border-emerald-300">
              <h2 className="text-xl font-bold text-emerald-800 mb-2">
                OBAVJEŠTENJE
              </h2>
              <p className="text-lg text-emerald-700 leading-relaxed">
                Džamija je zatvorena od subote u 7:30
                <br />
                do nedjelje u 6:00
                <br />
                zbog čišćenja tepiha
              </p>
            </div>

            {/* German */}
            <div>
              <h2 className="text-xl font-bold text-emerald-800 mb-2">
                ANKÜNDIGUNG
              </h2>
              <p className="text-lg text-emerald-700 leading-relaxed">
                Moschee geschlossen von Samstag 7:30
                <br />
                bis Sonntag 6:00
                <br />
                wegen Teppichreinigung
              </p>
            </div>
          </div>

          {/* Islamic Quote */}
          <div className="mb-8 px-6">
            <p className="text-2xl font-arabic text-emerald-700 mb-2">
              إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ
            </p>
            <p className="text-sm text-emerald-600 italic">
              "Wahrlich, Allah liebt die Reumütigen und Er liebt die sich Reinigenden."
            </p>
            <p className="text-xs text-emerald-500 mt-1">
              (Qur'an 2:222)
            </p>
          </div>

          {/* Apology Message */}
          <div className="bg-emerald-50 rounded-xl px-6 py-4 mb-8">
            <p className="text-emerald-700 font-arabic text-lg mb-1">
              جزاكم الله خيراً
            </p>
            <p className="text-emerald-600 text-sm">
              Hvala na razumijevanju • Vielen Dank für Ihr Verständnis
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-grow" />

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-emerald-200 w-full">
            <p className="text-xl font-bold text-emerald-800 mb-2">
              ❤️ LIEBE GRÜSSE ❤️
            </p>
            <p className="text-lg font-semibold text-emerald-700 mb-4">
              Euer ET-TAQWA TEAM
            </p>
            
            {/* Decorative Islamic Elements */}
            <div className="flex justify-center gap-4 text-emerald-600">
              <span className="text-2xl">☪</span>
              <span className="text-2xl">🌙</span>
              <span className="text-2xl">⭐</span>
            </div>
            
            {/* Salaam */}
            <p className="text-lg font-arabic text-emerald-700 mt-4">
              السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plakat;
