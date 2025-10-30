import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Users, Heart } from "lucide-react";

const NewHome = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900">
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
            Willkommen
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white/90 mb-4 drop-shadow-lg font-light"
          >
            Bosniakischer Kulturverein El Taqwa
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 mb-12 drop-shadow-lg font-light italic"
          >
            Ein Ort des Friedens und der Gemeinschaft
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/gebetszeiten">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-emerald-800 rounded-full text-lg font-semibold shadow-2xl transition-all duration-300"
              >
                Gebetszeiten
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/15 backdrop-blur-md text-white border-2 border-white/50 rounded-full text-lg font-semibold shadow-2xl transition-all duration-300"
              >
                Über uns
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full p-1"
          >
            <motion.div className="w-1.5 h-2 bg-white/50 rounded-full mx-auto" />
          </motion.div>
        </motion.div>
      </div>

      {/* Quick Links Section */}
      <div className="py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Unsere Angebote
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Gebetszeiten", desc: "Aktuelle Zeiten", link: "/gebetszeiten" },
              { icon: BookOpen, title: "Kurse", desc: "Bildungsangebote", link: "/courses" },
              { icon: Users, title: "Projekte", desc: "Gemeinschaft", link: "/projects" },
              { icon: Heart, title: "Über uns", desc: "Unsere Mission", link: "/about" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
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
            className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-primary/20"
          >
            <p className="text-3xl md:text-4xl text-center mb-8 text-foreground font-arabic leading-relaxed">
              "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا"
            </p>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary to-accent rounded-full mb-6" />
            <p className="text-xl text-center text-muted-foreground italic">
              "O ihr Menschen, Wir haben euch von einem männlichen und einem weiblichen Wesen erschaffen, 
              und Wir haben euch zu Völkern und Stämmen gemacht, damit ihr einander kennenlernt."
            </p>
            <p className="text-center text-primary font-semibold mt-6">- Quran 49:13</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewHome;
