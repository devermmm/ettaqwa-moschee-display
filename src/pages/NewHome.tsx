import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Users, Heart, HandHeart, Copy, TrendingUp } from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import palestineJerusalem from "@/assets/palestine-jerusalem.jpg";
import palestineChildren from "@/assets/palestine-children.jpg";
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
        .eq('campaign', 'palestine');
      
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
          filter: 'campaign=eq.palestine'
        },
        () => fetchDonationStats()
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        {/* Subtle Arabic Calligraphy Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Bismillah in background */}
          <div className="absolute top-10 sm:top-20 right-2 sm:right-10 opacity-5 pointer-events-none">
            <p className="text-[6rem] sm:text-[12rem] md:text-[20rem] font-arabic text-white leading-none whitespace-nowrap">
              بسم الله
            </p>
          </div>
          
          {/* Mashallah bottom left */}
          <div className="absolute bottom-10 sm:bottom-20 left-2 sm:left-10 opacity-5 pointer-events-none">
            <p className="text-[4rem] sm:text-[8rem] md:text-[12rem] font-arabic text-white leading-none">
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
        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-16 max-w-7xl">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4 sm:mb-6"
            >
              <h2 className="text-5xl sm:text-7xl md:text-9xl font-bold text-white drop-shadow-2xl tracking-wider">
                ET TAQWA
              </h2>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg"
            >
              {t("home.welcome")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-2 sm:mb-3 font-light"
            >
              {language === "bs" ? "Bošnjački kulturni centar El Taqwa" : "Bosniakischer Kulturverein El Taqwa"}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 font-light italic"
            >
              {language === "bs" ? "Mjesto mira i zajedništva" : "Ein Ort des Friedens und der Gemeinschaft"}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/gebetszeiten" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-primary rounded-lg text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {t("nav.prayerTimes")}
                </motion.button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg text-base sm:text-lg font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  {t("nav.about")}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="py-12 sm:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-12 sm:mb-20 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            {t("home.offers")}
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative bg-card/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 text-center border border-border/30 transition-all duration-300 group overflow-hidden"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'var(--gradient-card)' }} />
                    <div className="relative z-10">
                      <div className="inline-flex p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-primary to-accent mb-4 sm:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">{item.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quran Verse Section */}
      <div className="py-12 sm:py-24 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-14 border border-primary/30 overflow-hidden"
            style={{ boxShadow: 'var(--shadow-card)', background: 'var(--gradient-card)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
            <div className="relative z-10">
              <p className="text-2xl sm:text-3xl md:text-4xl text-center mb-6 sm:mb-8 text-foreground font-arabic leading-relaxed">
                "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا"
              </p>
              <div className="h-1 w-32 sm:w-40 mx-auto bg-gradient-to-r from-primary via-accent to-primary rounded-full mb-6 sm:mb-8 shadow-lg" />
              <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground italic leading-relaxed">
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

      {/* Donation Section for Palestine */}
      <div className="py-12 sm:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
              <HandHeart className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {language === "bs" ? "Donacije za Palestinu" : "Spenden für Palästina"}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {language === "bs" 
                ? "Vaša podrška pruža nadu i pomoć onima kojima je najpotrebnija. Svaka donacija čini razliku."
                : "Ihre Unterstützung gibt Hoffnung und Hilfe für diejenigen, die sie am meisten brauchen. Jede Spende macht einen Unterschied."
              }
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={palestineJerusalem} 
                alt="Jerusalem with Dome of the Rock"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={palestineChildren} 
                alt="Palestinian children"
                className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            {/* Donation Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/30 text-center"
                style={{ boxShadow: 'var(--shadow-card)', background: 'var(--gradient-card)' }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 mb-2 sm:mb-3">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1">
                  €{donationStats.total.toLocaleString('de-AT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {language === "bs" ? "Ukupno prikupljeno" : "Gesamt gesammelt"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/30 text-center"
                style={{ boxShadow: 'var(--shadow-card)', background: 'var(--gradient-card)' }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 mb-2 sm:mb-3">
                  <HandHeart className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1">{donationStats.count}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {language === "bs" ? "Broj donacija" : "Anzahl Spenden"}
                </p>
              </motion.div>
            </div>

            <div className="backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-primary/30 overflow-hidden"
              style={{ boxShadow: 'var(--shadow-card)', background: 'var(--gradient-card)' }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-foreground">
                {language === "bs" ? "Bankovni podaci za donaciju" : "Bankverbindung für Spenden"}
              </h3>
              
              <div className="bg-background/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base text-muted-foreground font-medium">IBAN:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("AT582011182674140900");
                      toast.success(language === "bs" ? "IBAN kopiran!" : "IBAN kopiert!");
                    }}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">{language === "bs" ? "Kopiraj" : "Kopieren"}</span>
                  </button>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-foreground text-center tracking-wider break-all">
                  AT58 2011 1826 7414 0900
                </p>
              </div>

              <p className="text-sm sm:text-base text-center text-muted-foreground italic">
                {language === "bs" 
                  ? "Hvala vam na vašoj podršci i velikodušnosti. Svaka donacija direktno pomaže porodicama u nevolji."
                  : "Vielen Dank für Ihre Unterstützung und Großzügigkeit. Jede Spende hilft direkt den Familien in Not."
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
