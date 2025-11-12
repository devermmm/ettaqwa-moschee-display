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
          {/* Islamic Geometric Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamicPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  {/* 8-pointed star (Rub el Hizb) */}
                  <g transform="translate(100, 100)">
                    <path d="M 0,-40 L 10,-10 L 40,0 L 10,10 L 0,40 L -10,10 L -40,0 L -10,-10 Z" 
                          fill="white" opacity="0.6"/>
                    <circle cx="0" cy="0" r="30" fill="none" stroke="white" strokeWidth="2"/>
                    <circle cx="0" cy="0" r="20" fill="none" stroke="white" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="10" fill="none" stroke="white" strokeWidth="1"/>
                  </g>
                  {/* Decorative corner elements */}
                  <circle cx="0" cy="0" r="8" fill="white" opacity="0.4"/>
                  <circle cx="200" cy="0" r="8" fill="white" opacity="0.4"/>
                  <circle cx="0" cy="200" r="8" fill="white" opacity="0.4"/>
                  <circle cx="200" cy="200" r="8" fill="white" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamicPattern)"/>
            </svg>
          </div>

          {/* Animated Rotating Islamic Stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              style={{
                left: `${10 + i * 15}%`,
                top: `${15 + (i % 3) * 30}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 25 + i * 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-15">
                <g transform="translate(50, 50)">
                  {/* 8-pointed Islamic star */}
                  <path d="M 0,-35 L 8,-8 L 35,0 L 8,8 L 0,35 L -8,8 L -35,0 L -8,-8 Z" 
                        fill="white"/>
                  <circle cx="0" cy="0" r="25" fill="none" stroke="white" strokeWidth="2.5"/>
                  <path d="M 0,-20 L 5,-5 L 20,0 L 5,5 L 0,20 L -5,5 L -20,0 L -5,-5 Z" 
                        fill="none" stroke="white" strokeWidth="2"/>
                </g>
              </svg>
            </motion.div>
          ))}

          {/* Floating Islamic Medallions */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`medallion-${i}`}
              className="absolute"
              style={{
                left: `${65 + i * 8}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <g transform="translate(50, 50)">
                  <circle cx="0" cy="0" r="40" fill="none" stroke="white" strokeWidth="2" opacity="0.6"/>
                  <circle cx="0" cy="0" r="30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                  <path d="M 0,-30 Q 30,0 0,30 Q -30,0 0,-30" fill="none" stroke="white" strokeWidth="2" opacity="0.4"/>
                  <path d="M -30,0 Q 0,30 30,0 Q 0,-30 -30,0" fill="none" stroke="white" strokeWidth="2" opacity="0.4"/>
                  {/* Inner star */}
                  <path d="M 0,-15 L 4,-4 L 15,0 L 4,4 L 0,15 L -4,4 L -15,0 L -4,-4 Z" 
                        fill="white" opacity="0.5"/>
                </g>
              </svg>
            </motion.div>
          ))}

          {/* Large Rotating Mandala - Top Left */}
          <motion.div
            className="absolute top-10 left-10"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg width="180" height="180" viewBox="0 0 100 100" className="opacity-8">
              <g transform="translate(50, 50)">
                <circle cx="0" cy="0" r="45" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="0" cy="0" r="35" fill="none" stroke="white" strokeWidth="2"/>
                <circle cx="0" cy="0" r="25" fill="none" stroke="white" strokeWidth="1.5"/>
                <circle cx="0" cy="0" r="15" fill="none" stroke="white" strokeWidth="2"/>
                {/* 12 petals */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = Math.cos(angle) * 15;
                  const y1 = Math.sin(angle) * 15;
                  const x2 = Math.cos(angle) * 40;
                  const y2 = Math.sin(angle) * 40;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </g>
            </svg>
          </motion.div>

          {/* Large Rotating Mandala - Bottom Right */}
          <motion.div
            className="absolute bottom-10 right-10"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg width="160" height="160" viewBox="0 0 100 100" className="opacity-8">
              <g transform="translate(50, 50)">
                {/* Octagon base */}
                <path
                  d="M 0,-40 L 28,-28 L 40,0 L 28,28 L 0,40 L -28,28 L -40,0 L -28,-28 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                {/* Inner octagon */}
                <path
                  d="M 0,-25 L 18,-18 L 25,0 L 18,18 L 0,25 L -18,18 L -25,0 L -18,-18 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                />
                {/* Center star */}
                <path
                  d="M 0,-15 L 4,-4 L 15,0 L 4,4 L 0,15 L -4,4 L -15,0 L -4,-4 Z"
                  fill="white"
                  opacity="0.6"
                />
              </g>
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
