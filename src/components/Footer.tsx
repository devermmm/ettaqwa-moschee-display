import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)',
          backgroundSize: '24px 24px'
        }} />
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14 mb-10 sm:mb-14">
          {/* Kontakt */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold tracking-tight">
              {language === "bs" ? "Kontakt" : "Kontakt"}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-background/10 rounded-lg mt-0.5">
                  <MapPin className="w-4 h-4 opacity-70" />
                </div>
                <div>
                  <p className="font-medium text-sm leading-snug">
                    {language === "bs" ? "Bošnjačko kulturno društvo El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
                  </p>
                  <p className="text-sm opacity-70 mt-0.5">Dzemat Et-Taqwa</p>
                  <p className="text-sm opacity-70">Voitgasse 21, 1220 Wien</p>
                </div>
              </div>
            </div>
          </div>

          {/* Über uns */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold tracking-tight">
              {language === "bs" ? "O nama" : "Über uns"}
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              {language === "bs" 
                ? "Dio Bošnjačke vjerske zajednice Centar. Osnovano 17. marta 2015. Mjesto mira, zajedništva i molitve."
                : "Teil der Bosniakischen Kultusgemeinde Mitte. Gegründet am 17. März 2015. Ein Ort des Friedens, der Gemeinschaft und des Gebets."
              }
            </p>
            <div className="pt-1">
              <span className="inline-block px-3 py-1.5 bg-background/10 rounded-lg text-sm opacity-80">
                🕌 مسجد التقوى
              </span>
            </div>
          </div>

          {/* Gebetszeiten */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold tracking-tight">
              {language === "bs" ? "Vremena namaza" : "Gebetszeiten"}
            </h3>
            <p className="text-sm opacity-70 leading-relaxed">
              {language === "bs"
                ? "Redovno se održavaju džuma namazi u našim prostorijama."
                : "Regelmäßig finden in unseren Räumlichkeiten Freitagsgebete statt."
              }
            </p>
            <a 
              href="/gebetszeiten" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-background text-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {language === "bs" ? "Pogledaj vremena namaza" : "Zu den Gebetszeiten"}
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-50">
              &copy; {new Date().getFullYear()} {language === "bs" ? "Bošnjačko kulturno društvo El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
            </p>
            <a
              href="https://deverm.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-background/5 rounded-lg border border-background/10 hover:bg-background/10 transition-colors text-sm"
            >
              <span className="opacity-50 text-xs">{language === "bs" ? "Webseiten Ersteller" : "Webseiten Ersteller"}</span>
              <span className="font-bold opacity-80">DEVERM.COM</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
