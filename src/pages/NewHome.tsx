import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Users, Heart, HandHeart, Copy, Star } from "lucide-react";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };
  
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[100svh] flex items-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        {/* Subtle Arabic Calligraphy Background */}
        <div className="absolute inset-0 overflow-hidden">
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
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-5 sm:px-8 md:px-16 max-w-7xl">
          <motion.div 
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs font-medium tracking-widest uppercase mb-6">
                {language === "bs" ? "Dobrodošli" : "Willkommen"}
              </span>
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter leading-[0.9]"
            >
              ET TAQWA
            </motion.h2>

            <motion.div variants={itemVariants} className="mt-4 sm:mt-6">
              <div className="w-16 h-1 bg-white/30 rounded-full" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mt-5 sm:mt-6 tracking-tight"
            >
              {t("home.welcome")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/60 mt-2 font-light"
            >
              {language === "bs" ? "Bošnjački kulturni centar El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-white/40 mt-1 font-light italic"
            >
              {language === "bs" ? "Mjesto mira i zajedništva" : "Ein Ort des Friedens und der Gemeinschaft"}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 mt-10 sm:mt-12"
            >
              <Link to="/gebetszeiten" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-7 py-3.5 bg-white text-foreground rounded-xl text-sm font-bold shadow-lg transition-all duration-200"
                >
                  {t("nav.prayerTimes")}
                </motion.button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-7 py-3.5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/15"
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div 
              className="w-1 h-2.5 bg-white/40 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Quick Links Section */}
      <div className="py-20 sm:py-32 bg-background relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {t("home.offers")}
            </h2>
            <div className="mt-4 w-12 h-1 mx-auto bg-primary rounded-full" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    whileHover={{ y: -6 }}
                    className="relative bg-card rounded-2xl p-7 sm:p-8 border border-border/50 transition-all duration-300 group hover:shadow-lg h-full"
                  >
                    <div className="relative z-10">
                      <div className="inline-flex p-3.5 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quran Verse Section */}
      <div className="py-20 sm:py-32 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-3xl mx-auto"
          >
            <div 
              className="relative bg-card rounded-3xl p-8 sm:p-12 md:p-16 border border-border/50 overflow-hidden"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="relative z-10 text-center">
                {/* Decorative top */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-px bg-border" />
                    <Star className="w-4 h-4 text-primary/50" />
                    <div className="w-12 h-px bg-border" />
                  </div>
                </div>

                <motion.p 
                  className="text-2xl sm:text-3xl md:text-4xl text-primary font-arabic leading-loose"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا"
                </motion.p>

                <div className="my-8">
                  <div className="h-px w-24 mx-auto bg-border" />
                </div>

                <motion.p 
                  className="text-sm sm:text-base md:text-lg text-muted-foreground italic leading-relaxed max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {language === "bs" 
                    ? '"O ljudi, Mi vas stvorismo od muškarca i žene i učinismo vas narodima i plemenima da se međusobno upoznate."'
                    : '"O ihr Menschen, Wir haben euch von einem männlichen und einem weiblichen Wesen erschaffen, und Wir haben euch zu Völkern und Stämmen gemacht, damit ihr einander kennenlernt."'
                  }
                </motion.p>

                <motion.p 
                  className="text-primary font-semibold mt-8 text-sm flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <BookOpen className="w-4 h-4" />
                  {language === "bs" ? "Kur'an 49:13" : "Quran 49:13"}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Donation Section */}
      <div className="py-20 sm:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5">
              <HandHeart className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
              {language === "bs" ? "Donacije za džamiju" : "Spenden für die Moschee"}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === "bs" 
                ? "Vaša podrška pomaže u održavanju i razvoju naše džamije i zajednice. Svaka donacija čini razliku."
                : "Ihre Unterstützung hilft bei der Erhaltung und Entwicklung unserer Moschee und Gemeinde. Jede Spende macht einen Unterschied."
              }
            </p>
          </motion.div>

          {/* Image grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img 
                src={mosqueInterior} 
                alt="Mosque Interior"
                className="w-full h-[260px] sm:h-[320px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white/90 text-sm font-medium">
                  {language === "bs" ? "Unutrašnjost džamije" : "Moschee Innenraum"}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img 
                src={community} 
                alt="Community gathering"
                className="w-full h-[260px] sm:h-[320px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white/90 text-sm font-medium">
                  {language === "bs" ? "Naša zajednica" : "Unsere Gemeinde"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bank details card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div 
              className="bg-card rounded-2xl p-7 sm:p-9 border border-border/50"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <h3 className="text-lg font-bold mb-5 text-center text-foreground flex items-center justify-center gap-2">
                <Copy className="w-4 h-4 text-primary" />
                {language === "bs" ? "Bankovni podaci za donaciju" : "Bankverbindung für Spenden"}
              </h3>
              
              <div className="bg-muted/50 rounded-xl p-5 mb-5 border border-border/30">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">IBAN</span>
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText("AT582011182674140900");
                      toast.success(language === "bs" ? "IBAN kopiran!" : "IBAN kopiert!");
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/15 transition-colors text-xs font-medium"
                  >
                    <Copy className="w-3 h-3" />
                    {language === "bs" ? "Kopiraj" : "Kopieren"}
                  </motion.button>
                </div>
                <p className="text-xl sm:text-2xl font-mono font-bold text-foreground text-center tracking-wider break-all">
                  AT58 2011 1826 7414 0900
                </p>
              </div>

              <p className="text-xs sm:text-sm text-center text-muted-foreground leading-relaxed">
                {language === "bs" 
                  ? "Hvala vam na vašoj podršci i velikodušnosti. Vaša donacija pomaže u održavanju naše džamije i zajedničkih aktivnosti."
                  : "Vielen Dank für Ihre Unterstützung und Großzügigkeit. Ihre Spende hilft bei der Erhaltung unserer Moschee und gemeinschaftlichen Aktivitäten."
                }
              </p>
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
