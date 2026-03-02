import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, BookOpen, Users, Heart, HandHeart, Copy, Star, ArrowRight, Instagram } from "lucide-react";
import ReviewsSection from "@/components/ReviewsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import mosqueHero from "@/assets/mosque-hero.png";
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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background">

      {/* ═══════════════════════════════════════════════════ */}
      {/* HERO — Full-bleed image with overlay */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="relative min-h-[100svh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={mosqueHero} 
            alt="Et-Taqwa Moschee" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        {/* Arabic calligraphy watermark */}
        <motion.div 
          className="absolute top-20 right-4 sm:right-12 opacity-[0.06] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <p className="text-[8rem] sm:text-[14rem] md:text-[20rem] font-arabic text-white leading-none">
            التقوى
          </p>
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 w-full pb-16 sm:pb-24 pt-32">
          <div className="container mx-auto px-5 sm:px-8 md:px-16 max-w-7xl">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  {language === "bs" ? "Dobrodošli" : "Willkommen"}
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeUp}
                className="mt-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.85]"
              >
                ET
                <br />
                <span className="text-primary">TAQWA</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg sm:text-xl md:text-2xl text-white/70 mt-6 sm:mt-8 font-medium max-w-xl leading-relaxed"
              >
                {language === "bs" 
                  ? "Bošnjački kulturni centar i džamija u Beču"
                  : "Bosniakisches Kulturzentrum und Moschee in Wien"
                }
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="text-white/30 mt-2 font-amiri text-lg"
              >
                مسجد التقوى — Voitgasse 21, 1220 Wien
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3 mt-10 sm:mt-12"
              >
                <Link to="/gebetszeiten">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-2xl text-sm font-bold shadow-xl shadow-primary/25 flex items-center gap-2 justify-center transition-all"
                  >
                    {t("nav.prayerTimes")}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-xl text-white border border-white/15 rounded-2xl text-sm font-semibold transition-all hover:bg-white/15"
                  >
                    {t("nav.about")}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
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

      {/* ═══════════════════════════════════════════════════ */}
      {/* QUICK LINKS — Bento-style grid */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="py-24 sm:py-32 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">
              {language === "bs" ? "Naše usluge" : "Unsere Angebote"}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight mt-4">
              {t("home.offers")}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              { icon: Clock, title: t("nav.prayerTimes"), desc: t("home.prayerTimesTitle"), link: "/gebetszeiten", accent: true },
              { icon: BookOpen, title: language === "bs" ? "Novosti" : "Neuigkeiten", desc: language === "bs" ? "Najnovije vijesti i obavijesti" : "Aktuelle Nachrichten und Ankündigungen", link: "/news", accent: false },
              { icon: Users, title: t("nav.about"), desc: t("about.missionTitle"), link: "/about", accent: false },
              { icon: Heart, title: language === "bs" ? "Donacije" : "Spenden", desc: language === "bs" ? "Podržite našu zajednicu" : "Unterstützen Sie unsere Gemeinde", link: "#spenden", accent: true },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={`relative rounded-3xl p-8 sm:p-10 transition-all duration-300 group cursor-pointer h-full overflow-hidden ${
                      item.accent
                        ? "bg-primary text-primary-foreground shadow-xl shadow-primary/15"
                        : "bg-card border border-border/50 hover:shadow-lg"
                    }`}
                  >
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-2xl mb-5 ${
                        item.accent ? "bg-white/15" : "bg-primary/10 group-hover:bg-primary/15"
                      } transition-colors`}>
                        <Icon className={`w-6 h-6 ${item.accent ? "text-white" : "text-primary"}`} />
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${
                        item.accent ? "" : "text-foreground group-hover:text-primary"
                      } transition-colors`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${
                        item.accent ? "text-white/70" : "text-muted-foreground"
                      }`}>
                        {item.desc}
                      </p>
                      <div className={`mt-5 flex items-center gap-1 text-sm font-semibold ${
                        item.accent ? "text-white/80" : "text-primary"
                      }`}>
                        {language === "bs" ? "Više" : "Mehr"}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* QURAN VERSE — Minimal elegance */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="py-24 sm:py-36 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-primary/20" />
                <Star className="w-5 h-5 text-primary/40" />
                <div className="w-16 h-px bg-primary/20" />
              </div>
            </div>

            <motion.p 
              className="text-3xl sm:text-4xl md:text-5xl text-primary font-arabic leading-[1.8]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              "يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا"
            </motion.p>

            <div className="my-10">
              <div className="h-px w-24 mx-auto bg-border" />
            </div>

            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground italic leading-relaxed max-w-2xl mx-auto"
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
              className="text-primary font-bold mt-10 text-sm flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <BookOpen className="w-4 h-4" />
              {language === "bs" ? "Kur'an 49:13" : "Quran 49:13"}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* DONATION — Full-width image split */}
      {/* ═══════════════════════════════════════════════════ */}
      <div id="spenden" className="py-24 sm:py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary">
              {language === "bs" ? "Podržite nas" : "Unterstützen Sie uns"}
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 text-foreground tracking-tight mt-4">
              {language === "bs" ? "Donacije" : "Spenden"}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === "bs" 
                ? "Vaša podrška pomaže u održavanju i razvoju naše džamije i zajednice."
                : "Ihre Unterstützung hilft bei der Erhaltung und Entwicklung unserer Moschee und Gemeinde."
              }
            </p>
          </motion.div>

          {/* Image grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden group aspect-[4/3]"
            >
              <img 
                src={mosqueInterior} 
                alt="Mosque Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white/90 text-sm font-semibold">
                  {language === "bs" ? "Unutrašnjost džamije" : "Moschee Innenraum"}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden group aspect-[4/3]"
            >
              <img 
                src={community} 
                alt="Community"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white/90 text-sm font-semibold">
                  {language === "bs" ? "Naša zajednica" : "Unsere Gemeinde"}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bank details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="bg-card rounded-3xl p-8 sm:p-10 border border-border/50 text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-5">
                <HandHeart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-6 text-foreground">
                {language === "bs" ? "Bankovni podaci" : "Bankverbindung"}
              </h3>
              
              <div className="bg-muted/50 rounded-2xl p-5 mb-5 border border-border/30">
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] block mb-2">IBAN</span>
                <p className="text-xl sm:text-2xl font-mono font-bold text-foreground tracking-wider break-all">
                  AT58 2011 1826 7414 0900
                </p>
              </div>

              <motion.button
                onClick={() => {
                  navigator.clipboard.writeText("AT582011182674140900");
                  toast.success(language === "bs" ? "IBAN kopiran!" : "IBAN kopiert!");
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 transition-all"
              >
                <Copy className="w-4 h-4" />
                {language === "bs" ? "Kopiraj IBAN" : "IBAN kopieren"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* REVIEWS */}
      {/* ═══════════════════════════════════════════════════ */}
      <ReviewsSection />

      {/* ═══════════════════════════════════════════════════ */}
      {/* CTA — Follow us */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="py-24 sm:py-32 relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <motion.div 
          className="absolute top-10 right-8 opacity-[0.04] pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.04 }}
          viewport={{ once: true }}
        >
          <p className="text-[10rem] sm:text-[16rem] font-arabic text-white leading-none">
            بسم الله
          </p>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              {language === "bs" ? "Pratite nas" : "Folgt uns"}
            </h2>
            <p className="text-white/50 mt-4 text-base sm:text-lg max-w-lg mx-auto">
              {language === "bs" 
                ? "Budite u toku sa najnovijim vijestima i događajima."
                : "Bleiben Sie auf dem Laufenden über aktuelle Neuigkeiten und Veranstaltungen."
              }
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
              <a
                href="https://instagram.com/dzemat_et_taqwa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-7 py-3.5 bg-white text-foreground rounded-2xl font-bold text-sm shadow-xl transition-all"
                >
                  <Instagram className="w-5 h-5" />
                  @dzemat_et_taqwa
                </motion.button>
              </a>
              <a
                href="https://tiktok.com/@et.taqwa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-7 py-3.5 bg-white/10 backdrop-blur-xl text-white border border-white/15 rounded-2xl font-bold text-sm transition-all hover:bg-white/15"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/></svg>
                  @et.taqwa
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewHome;
