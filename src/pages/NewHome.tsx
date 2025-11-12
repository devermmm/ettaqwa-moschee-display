import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Users, Heart } from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "@/components/Logo";

const NewHome = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        {/* Subtle Arabic Calligraphy Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Bismillah in background */}
          <div className="absolute top-20 right-10 opacity-5 pointer-events-none">
            <p className="text-[12rem] md:text-[20rem] font-arabic text-white leading-none whitespace-nowrap">
              بسم الله
            </p>
          </div>
          
          {/* Mashallah bottom left */}
          <div className="absolute bottom-20 left-10 opacity-5 pointer-events-none">
            <p className="text-[8rem] md:text-[12rem] font-arabic text-white leading-none">
              ما شاء الله
            </p>
          </div>

          {/* Simple Islamic Pattern - Very Subtle */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="subtlePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#subtlePattern)"/>
            </svg>
          </div>
        </div>

        {/* Content - Left Aligned */}
        <div className="relative z-10 container mx-auto px-8 md:px-16 max-w-7xl">
          <div className="max-w-3xl">
            {/* Animated Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex justify-start"
            >
              <Logo className="w-32 h-32 md:w-40 md:h-40 drop-shadow-2xl" animated={true} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              <h2 className="text-7xl md:text-9xl font-bold text-white drop-shadow-2xl tracking-wider">
                ET TAQWA
              </h2>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
            >
              {t("home.welcome")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-3 font-light"
            >
              {language === "bs" ? "Bošnjački kulturni centar El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg md:text-xl text-white/80 mb-12 font-light italic"
            >
              {language === "bs" ? "Mjesto mira i zajedništva" : "Ein Ort des Friedens und der Gemeinschaft"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/gebetszeiten">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 bg-white text-primary rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {t("nav.prayerTimes")}
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  {t("nav.about")}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            {t("home.offers")}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: t("nav.prayerTimes"), desc: t("home.prayerTimesTitle"), link: "/gebetszeiten" },
              { icon: BookOpen, title: t("nav.courses"), desc: t("courses.subtitle"), link: "/courses" },
              { icon: Users, title: t("nav.projects"), desc: t("projects.community"), link: "/projects" },
              { icon: Heart, title: t("nav.about"), desc: t("about.missionTitle"), link: "/about" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="relative bg-card/80 backdrop-blur-md rounded-3xl p-10 text-center border border-border/30 transition-all duration-300 group overflow-hidden"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'var(--gradient-card)' }} />
                    <div className="relative z-10">
                      <div className="inline-flex p-5 rounded-3xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-base">{item.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quran Verse Section */}
      <div className="py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto backdrop-blur-md rounded-3xl p-14 border border-primary/30 overflow-hidden"
            style={{ boxShadow: 'var(--shadow-card)', background: 'var(--gradient-card)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
            <div className="relative z-10">
              <p className="text-3xl md:text-4xl text-center mb-8 text-foreground font-arabic leading-relaxed">
                "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا"
              </p>
              <div className="h-1 w-40 mx-auto bg-gradient-to-r from-primary via-accent to-primary rounded-full mb-8 shadow-lg" />
              <p className="text-xl text-center text-muted-foreground italic leading-relaxed">
              {language === "bs" 
                ? '"O ljudi, Mi vas stvorismo od muškarca i žene i učinismo vas narodima i plemenima da se međusobno upoznate."'
                : '"O ihr Menschen, Wir haben euch von einem männlichen und einem weiblichen Wesen erschaffen, und Wir haben euch zu Völkern und Stämmen gemacht, damit ihr einander kennenlernt."'
              }
              </p>
              <p className="text-center text-primary font-bold mt-8 text-lg">{language === "bs" ? "- Kur'an 49:13" : "- Quran 49:13"}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reviews & Location Section */}
      <ReviewsSection />
    </div>
  );
};

export default NewHome;
