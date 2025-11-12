import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import mektebRegistration from "@/assets/mekteb-registration.png";
import quranSchoolPoster from "@/assets/quran-school-poster.png";

const Courses = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t("courses.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("courses.subtitle")}
          </p>
        </motion.div>

        {/* Course Images */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img
                src={mektebRegistration}
                alt="Mekteb Registration"
                className="w-full h-auto object-cover"
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img
                src={quranSchoolPoster}
                alt="Quran School Poster"
                className="w-full h-auto object-cover"
              />
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              {t("courses.welcomeTitle")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("courses.welcomeText")}
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {t("courses.contactTitle")}
                </h3>
                <p className="text-muted-foreground">
                  Email: info@ettaqwa-wien.at
                </p>
                <p className="text-muted-foreground">
                  {language === "bs" ? "Telefon" : "Telefon"}: +43 123 456 789
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;
