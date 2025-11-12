import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Users, Heart } from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";
import { useLanguage } from "@/contexts/LanguageContext";

const NewHome = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        {/* Animated Islamic Geometric Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Rotating Stars */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg width="60" height="60" viewBox="0 0 100 100" className="opacity-20">
                <path
                  d="M50,10 L55,40 L85,40 L60,60 L70,90 L50,70 L30,90 L40,60 L15,40 L45,40 Z"
                  fill="white"
                />
              </svg>
            </motion.div>
          ))}

          {/* Floating Circles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full border-2 border-white/10"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${60 + i * 5}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Geometric Islamic Pattern */}
          <motion.div
            className="absolute top-20 left-10"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 100 100" className="opacity-10">
              <pattern id="pattern1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
              </pattern>
              <rect width="100" height="100" fill="url(#pattern1)" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-10"
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-10">
              <path
                d="M50,10 L90,50 L50,90 L10,50 Z"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl tracking-wider">
              ET TAQWA
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            {t("home.welcome")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white/90 mb-4 drop-shadow-lg font-light"
          >
            {language === "bs" ? "Bošnjački kulturni centar El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 mb-12 drop-shadow-lg font-light italic"
          >
            {language === "bs" ? "Mjesto mira i zajedništva" : "Ein Ort des Friedens und der Gemeinschaft"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/gebetszeiten">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white text-primary rounded-full text-lg font-bold shadow-2xl hover:shadow-[0_25px_50px_rgba(255,255,255,0.25)] transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              >
                {t("nav.prayerTimes")}
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white/10 backdrop-blur-lg text-white border-2 border-white/40 rounded-full text-lg font-bold shadow-2xl hover:shadow-[0_25px_50px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                {t("nav.about")}
              </motion.button>
            </Link>
          </motion.div>
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
