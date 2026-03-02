import { motion } from "framer-motion";
import { Clock, BookOpen, Compass, Bell, Calendar, BookMarked, MapPin, Download, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import appMockup from "@/assets/app-mockup-screen.png";
import badgeAppStore from "@/assets/badge-appstore.svg";
import badgeGooglePlay from "@/assets/badge-googleplay.svg";

const AppPage = () => {
  const { language } = useLanguage();

  const features = [
    { icon: Clock, title: language === "bs" ? "Namaz vremena" : "Gebetszeiten", desc: language === "bs" ? "Tačna dnevna vremena namaza za Beč" : "Tägliche Gebetszeiten für Wien" },
    { icon: BookOpen, title: language === "bs" ? "Kur'an" : "Quran", desc: language === "bs" ? "Čitajte Kur'an na arapskom" : "Quran auf Arabisch lesen" },
    { icon: BookMarked, title: language === "bs" ? "Dove" : "Duas", desc: language === "bs" ? "Svakodnevne dove i zikr" : "Tägliche Bittgebete und Dhikr" },
    { icon: Compass, title: language === "bs" ? "Kibla" : "Qibla", desc: language === "bs" ? "Pronađite pravac kible" : "Finden Sie die Qibla-Richtung" },
    { icon: Bell, title: language === "bs" ? "Podsjetnici" : "Erinnerungen", desc: language === "bs" ? "Obavijesti za namaz i ezan" : "Gebetsbenachrichtigungen und Adhan" },
    { icon: Calendar, title: language === "bs" ? "Kalendar" : "Kalender", desc: language === "bs" ? "Islamski kalendar i događaji" : "Islamischer Kalender und Termine" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden py-20 sm:py-32" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold tracking-widest uppercase mb-6">
                <Smartphone className="w-3.5 h-3.5" />
                {language === "bs" ? "Mobilna aplikacija" : "Mobile App"}
              </motion.span>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[0.95]">
                ET TAQWA
                <br />
                <span className="text-primary">{language === "bs" ? "APLIKACIJA" : "APP"}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-white/60 mt-6 text-base sm:text-lg leading-relaxed max-w-md">
                {language === "bs"
                  ? "Sve što vam treba za vaš ibadeti na jednom mjestu. Namaz vremena, Kur'an, dove, kibla i još mnogo toga."
                  : "Alles was Sie für Ihren Ibadet brauchen an einem Ort. Gebetszeiten, Quran, Duas, Qibla und vieles mehr."
                }
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 space-y-3">
                <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-semibold">
                  {language === "bs" ? "Uskoro dostupna" : "Bald verfügbar"}
                </p>
                <div className="flex items-center gap-3 opacity-50">
                  <img src={badgeAppStore} alt="App Store" className="h-10 sm:h-12" />
                  <img src={badgeGooglePlay} alt="Google Play" className="h-10 sm:h-12" />
                </div>
              </motion.div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-[260px] sm:w-[300px]">
                {/* Phone frame */}
                <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl shadow-black/50 border border-white/10">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10" />
                  {/* Live App Preview */}
                  <div className="rounded-[2.3rem] overflow-hidden bg-background aspect-[9/19.5]">
                    <iframe 
                      src="/app" 
                      className="w-full h-full border-0 pointer-events-none scale-100"
                      title="Et Taqwa App Preview"
                      scrolling="no"
                    />
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">
              {language === "bs" ? "Funkcije" : "Features"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight mt-4">
              {language === "bs" ? "Sve u jednoj aplikaciji" : "Alles in einer App"}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="bg-card rounded-3xl p-7 border border-border/50 hover:shadow-lg transition-all group"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 sm:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex p-4 rounded-3xl bg-primary/10 mb-6">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
              {language === "bs" ? "Uskoro dostupna" : "Bald verfügbar"}
            </h2>
            <p className="text-muted-foreground mt-4 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              {language === "bs"
                ? "Aplikacija je trenutno u razvoju. Pratite nas na društvenim mrežama za obavijesti o objavi."
                : "Die App befindet sich derzeit in Entwicklung. Folgen Sie uns auf Social Media für Updates zum Launch."
              }
            </p>
            <div className="flex items-center justify-center gap-3 mt-8 opacity-50">
              <img src={badgeAppStore} alt="App Store" className="h-11" />
              <img src={badgeGooglePlay} alt="Google Play" className="h-11" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;
