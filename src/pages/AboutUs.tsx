import { motion } from "framer-motion";
import communityImage from "@/assets/community.png";
import mosqueInteriorImage from "@/assets/mosque-interior.png";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutUs = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"
            >
              {t("about.title")}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-1 w-32 mx-auto bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>

          {/* Images Grid */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img 
                src={communityImage} 
                alt="Unsere Gemeinschaft" 
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="p-3 sm:p-4 bg-card/50 backdrop-blur-sm">
                <p className="text-center text-foreground font-semibold text-sm sm:text-base">Unsere Gemeinschaft</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img 
                src={mosqueInteriorImage} 
                alt="Das Innere unserer Moschee" 
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="p-3 sm:p-4 bg-card/50 backdrop-blur-sm">
                <p className="text-center text-foreground font-semibold text-sm sm:text-base">Das Innere unserer Moschee</p>
              </div>
            </motion.div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 sm:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border border-border/50"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
                {t("about.welcomeTitle")}
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t("about.welcomeText1")}
                </p>
                <p>
                  {t("about.welcomeText2")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border border-border/50"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
                {t("about.everyoneTitle")}
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t("about.everyoneText")}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border border-primary/20"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground">
                {t("about.missionTitle")}
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t("about.missionText1")}
                </p>
                <p>
                  {t("about.missionText2")}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
