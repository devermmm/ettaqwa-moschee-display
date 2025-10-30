import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Users, Heart } from "lucide-react";
import logoImage from "@/assets/logo.png";
import mosqueHeroImage from "@/assets/mosque-hero.png";

const NewHome = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={mosqueHeroImage} 
            alt="Moschee" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <img 
              src={logoImage} 
              alt="Moschee Logo" 
              className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 drop-shadow-2xl"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
          >
            Willkommen
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white/90 mb-12 drop-shadow-lg font-light"
          >
            Ein Ort des Friedens und der Gemeinschaft
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/gebetszeiten">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-primary rounded-full text-lg font-semibold shadow-2xl hover:shadow-white/20 transition-all duration-300"
              >
                Gebetszeiten
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white rounded-full text-lg font-semibold shadow-2xl hover:bg-white/20 transition-all duration-300"
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
