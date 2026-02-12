import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Users, Heart, HandHeart, Copy, TrendingUp, Star, Sparkles, Moon } from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import mosqueInterior from "@/assets/mosque-interior.png";
import community from "@/assets/community.png";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const NewHome = () => {
  const { t, language } = useLanguage();
  const [donationStats, setDonationStats] = useState({ count: 0, total: 0 });
  
  useEffect(() => {
    const fetchDonationStats = async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('amount')
        .eq('campaign', 'mosque');
      
      if (data && !error) {
        const total = data.reduce((sum, donation) => sum + Number(donation.amount), 0);
        setDonationStats({ count: data.length, total });
      }
    };
    
    fetchDonationStats();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('donations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'donations',
          filter: 'campaign=eq.mosque'
        },
        () => fetchDonationStats()
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  // Stagger children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };
  
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - More dramatic */}
      <div className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>

        {/* Subtle Arabic Calligraphy Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Bismillah in background */}
          <motion.div 
            className="absolute top-10 sm:top-20 right-2 sm:right-10 opacity-[0.03] pointer-events-none"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.03, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <p className="text-[6rem] sm:text-[12rem] md:text-[20rem] font-arabic text-white leading-none whitespace-nowrap">
              بسم الله
            </p>
          </motion.div>
          
          {/* Mashallah bottom left */}
          <motion.div 
            className="absolute bottom-10 sm:bottom-20 left-2 sm:left-10 opacity-[0.03] pointer-events-none"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.03, x: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <p className="text-[4rem] sm:text-[8rem] md:text-[12rem] font-arabic text-white leading-none">
              ما شاء الله
            </p>
          </motion.div>

          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="islamicPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="0.5"/>
                  <circle cx="40" cy="40" r="25" fill="none" stroke="white" strokeWidth="0.3"/>
                  <circle cx="40" cy="40" r="15" fill="none" stroke="white" strokeWidth="0.3"/>
                  <path d="M40 5 L40 75 M5 40 L75 40" stroke="white" strokeWidth="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#islamicPattern)"/>
            </svg>
          </div>
        </div>

        {/* Content - Left Aligned with enhanced animations */}
        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 max-w-7xl">
          <motion.div 
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2 className="text-5xl sm:text-7xl md:text-9xl font-bold text-white tracking-wider"
                  style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3), 0 0 60px rgba(255,255,255,0.1)' }}
                >
                  ET TAQWA
                </h2>
              </motion.div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
            >
              {t("home.welcome")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-2 sm:mb-3 font-light"
            >
              {language === "bs" ? "Bošnjački kulturni centar El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12 font-light italic"
            >
              {language === "bs" ? "Mjesto mira i zajedništva" : "Ein Ort des Friedens und der Gemeinschaft"}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/gebetszeiten" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-primary rounded-xl text-base sm:text-lg font-semibold shadow-2xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">{t("nav.prayerTimes")}</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300"
                >
                  {t("nav.about")}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Quick Links Section - Enhanced cards */}
      <div className="py-16 sm:py-28 bg-gradient-to-b from-background via-muted/50 to-background relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-30" 
            style={{ background: 'radial-gradient(circle, hsl(175 60% 35% / 0.15), transparent)' }} 
          />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-20" 
            style={{ background: 'radial-gradient(circle, hsl(175 55% 45% / 0.15), transparent)' }} 
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 sm:mb-24"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t("home.offers")}
            </h2>
            <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Clock, title: t("nav.prayerTimes"), desc: t("home.prayerTimesTitle"), link: "/gebetszeiten", gradient: "from-emerald-500 to-teal-600" },
              { icon: BookOpen, title: t("nav.courses"), desc: t("courses.subtitle"), link: "/courses", gradient: "from-teal-500 to-cyan-600" },
              { icon: Users, title: t("nav.projects"), desc: t("projects.community"), link: "/projects", gradient: "from-cyan-500 to-blue-600" },
              { icon: Heart, title: t("nav.about"), desc: t("about.missionTitle"), link: "/about", gradient: "from-blue-500 to-indigo-600" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="relative bg-card/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 text-center border border-border/50 transition-all duration-500 group overflow-hidden h-full"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    {/* Hover gradient overlay */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${item.gradient} opacity-20 rotate-45 group-hover:opacity-40 transition-opacity duration-500`} />
                    </div>

                    <div className="relative z-10">
                      <motion.div 
                        className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${item.gradient} mb-6 shadow-xl`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quran Verse Section - More elegant */}
      <div className="py-16 sm:py-28 bg-gradient-to-b from-background via-primary/5 to-muted relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-1/2 left-0 w-40 h-40 -translate-y-1/2 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 2" />
          </svg>
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-0 w-40 h-40 -translate-y-1/2 opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 2" />
          </svg>
        </motion.div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl opacity-50 rounded-full" />
            
            <div 
              className="relative backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 border border-primary/20 overflow-hidden"
              style={{ boxShadow: 'var(--shadow-card), var(--shadow-glow)', background: 'var(--gradient-card)' }}
            >
              {/* Inner decorative pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative z-10">
                {/* Decorative top element */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <Star className="w-5 h-5 text-primary" />
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  </div>
                </div>

                <motion.p 
                  className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 text-foreground font-arabic leading-loose"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا"
                </motion.p>

                <div className="flex justify-center mb-8">
                  <motion.div 
                    className="h-1 w-32 sm:w-48 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />
                </div>

                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-center text-muted-foreground italic leading-relaxed max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  {language === "bs" 
                    ? '"O ljudi, Mi vas stvorismo od muškarca i žene i učinismo vas narodima i plemenima da se međusobno upoznate."'
                    : '"O ihr Menschen, Wir haben euch von einem männlichen und einem weiblichen Wesen erschaffen, und Wir haben euch zu Völkern und Stämmen gemacht, damit ihr einander kennenlernt."'
                  }
                </motion.p>

                <motion.p 
                  className="text-center text-primary font-bold mt-8 text-lg flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <BookOpen className="w-4 h-4" />
                  {language === "bs" ? "Kur'an 49:13" : "Quran 49:13"}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Donation Section for Mosque - Enhanced */}
      <div className="py-16 sm:py-28 bg-gradient-to-b from-muted via-background to-muted relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" 
            style={{ background: 'radial-gradient(circle, hsl(175 60% 35%), transparent)' }} 
          />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" 
            style={{ background: 'radial-gradient(circle, hsl(165 55% 45%), transparent)' }} 
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent mb-6 shadow-xl"
            >
              <HandHeart className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {language === "bs" ? "Donacije za džamiju" : "Spenden für die Moschee"}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {language === "bs" 
                ? "Vaša podrška pomaže u održavanju i razvoju naše džamije i zajednice. Svaka donacija čini razliku."
                : "Ihre Unterstützung hilft bei der Erhaltung und Entwicklung unserer Moschee und Gemeinde. Jede Spende macht einen Unterschied."
              }
            </p>
          </motion.div>

          {/* Image grid with enhanced styling */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img 
                src={mosqueInterior} 
                alt="Mosque Interior"
                className="w-full h-[280px] sm:h-[350px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 text-lg font-medium">
                  {language === "bs" ? "Unutrašnjost džamije" : "Moschee Innenraum"}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img 
                src={community} 
                alt="Community gathering"
                className="w-full h-[280px] sm:h-[350px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 text-lg font-medium">
                  {language === "bs" ? "Naša zajednica" : "Unsere Gemeinde"}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            {/* Bank details card - Enhanced */}
            <motion.div 
              className="backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-primary/20 overflow-hidden relative"
              style={{ boxShadow: 'var(--shadow-card), var(--shadow-glow)', background: 'var(--gradient-card)' }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-primary to-accent opacity-10 rotate-45" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-foreground flex items-center justify-center gap-3">
                <Copy className="w-5 h-5 text-primary" />
                {language === "bs" ? "Bankovni podaci za donaciju" : "Bankverbindung für Spenden"}
              </h3>
              
              <motion.div 
                className="bg-background/60 rounded-2xl p-6 mb-6 border border-border/50"
                whileHover={{ borderColor: 'hsl(175 60% 35%)' }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <span className="text-sm sm:text-base text-muted-foreground font-medium">IBAN:</span>
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText("AT582011182674140900");
                      toast.success(language === "bs" ? "IBAN kopiran!" : "IBAN kopiert!");
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">{language === "bs" ? "Kopiraj" : "Kopieren"}</span>
                  </motion.button>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-foreground text-center tracking-wider break-all bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AT58 2011 1826 7414 0900
                </p>
              </motion.div>

              <p className="text-sm sm:text-base text-center text-muted-foreground italic leading-relaxed">
                {language === "bs" 
                  ? "Hvala vam na vašoj podršci i velikodušnosti. Vaša donacija pomaže u održavanju naše džamije i zajedničkih aktivnosti."
                  : "Vielen Dank für Ihre Unterstützung und Großzügigkeit. Ihre Spende hilft bei der Erhaltung unserer Moschee und gemeinschaftlichen Aktivitäten."
                }
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Reviews & Location Section */}
      <ReviewsSection />
    </div>
  );
};

export default NewHome;
