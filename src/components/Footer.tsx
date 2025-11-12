import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-300 rounded-full blur-3xl" />
      </div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Kontakt */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              {language === "bs" ? "Kontakt" : "Kontakt"}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <MapPin className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-lg">
                    {language === "bs" ? "Bošnjačko kulturno društvo El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
                  </p>
                  <p className="text-emerald-100 font-medium">Dzemat Et-Taqwa</p>
                  <p className="text-emerald-200 mt-1">Voitgasse 21, 1220 Wien</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Phone className="w-6 h-6 text-emerald-300" />
                </div>
                <p className="text-emerald-100">+43 XXX XXXXXXX</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                  <Mail className="w-6 h-6 text-emerald-300" />
                </div>
                <p className="text-emerald-100">dzematettaqwa@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Über uns */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              {language === "bs" ? "O nama" : "Über uns"}
            </h3>
            <p className="text-emerald-100 leading-relaxed text-lg">
              {language === "bs" 
                ? "Dio Bošnjačke vjerske zajednice Centar. Osnovano 17. marta 2015. Mjesto mira, zajedništva i molitve."
                : "Teil der Bosniakischen Kultusgemeinde Mitte. Gegründet am 17. März 2015. Ein Ort des Friedens, der Gemeinschaft und des Gebets."
              }
            </p>
            <div className="pt-4">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <p className="text-emerald-200 text-sm font-semibold">🕌 مسجد التقوى</p>
              </div>
            </div>
          </div>

          {/* Gebetszeiten */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              {language === "bs" ? "Vremena namaza" : "Gebetszeiten"}
            </h3>
            <p className="text-emerald-100 leading-relaxed mb-6">
              {language === "bs"
                ? "Redovno se održavaju džuma namazi u našim prostorijama."
                : "Regelmäßig finden in unseren Räumlichkeiten Freitagsgebete statt."
              }
            </p>
            <a 
              href="/gebetszeiten" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-white to-emerald-100 text-emerald-900 rounded-xl hover:scale-105 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl"
            >
              {language === "bs" ? "Pogledaj vremena namaza →" : "Zu den Gebetszeiten →"}
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="text-center space-y-2">
            <p className="text-emerald-200 text-lg font-medium">
              &copy; {new Date().getFullYear()} {language === "bs" ? "Bošnjačko kulturno društvo El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
            </p>
            <p className="text-emerald-300 text-sm">
              {language === "bs" ? "Sva prava zadržana" : "Alle Rechte vorbehalten"}
            </p>
            <p className="text-emerald-300 text-sm mt-3">
              {language === "bs" ? "Webseiten Ersteller:" : "Webseiten Ersteller:"}{" "}
              <a 
                href="https://deverm.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-white hover:text-emerald-200 transition-colors"
              >
                DEVERM.COM
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
