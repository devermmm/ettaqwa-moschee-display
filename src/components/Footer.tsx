import { MapPin, Phone, Mail, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

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
          <div className="text-center space-y-4">
            <p className="text-emerald-200 text-lg font-medium">
              &copy; {new Date().getFullYear()} {language === "bs" ? "Bošnjačko kulturno društvo El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
            </p>
            <p className="text-emerald-300 text-sm">
              {language === "bs" ? "Sva prava zadržana" : "Alle Rechte vorbehalten"}
            </p>
            
            {/* Animated DEVERM.COM Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center items-center gap-2 mt-6"
            >
              <motion.a
                href="https://deverm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/10 to-emerald-500/20 backdrop-blur-sm rounded-xl border border-white/30 hover:border-white/60 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-white/20 to-emerald-400/20"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Content */}
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-5 h-5 text-emerald-300 relative z-10" />
                </motion.div>
                
                <div className="relative z-10 flex flex-col items-start">
                  <span className="text-[10px] text-emerald-300/80 uppercase tracking-wider font-medium">
                    {language === "bs" ? "Webseiten Ersteller" : "Webseiten Ersteller"}
                  </span>
                  <span className="text-lg font-bold bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent group-hover:from-emerald-200 group-hover:via-white group-hover:to-emerald-200 transition-all duration-300">
                    DEVERM.COM
                  </span>
                </div>
                
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <svg
                    className="w-5 h-5 text-emerald-300"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl" />
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
