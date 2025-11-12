import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import mektebRegistration from "@/assets/mekteb-registration.png";
import quranSchoolPoster from "@/assets/quran-school-poster.png";

const Courses = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {language === "bs" ? "Mekteb Program" : "Mekteb Programm"}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {language === "bs"
              ? "Islamsko obrazovanje za djecu i mlade"
              : "Islamische Bildung für Kinder und Jugendliche"}
          </p>
        </motion.div>

        {/* Course Images */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Mekteb Registration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden shadow-xl">
              <img
                src={mektebRegistration}
                alt="Mekteb Registration"
                className="w-full h-auto object-cover"
              />
            </Card>
          </motion.div>

          {/* Quran School */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="overflow-hidden shadow-xl">
              <img
                src={quranSchoolPoster}
                alt="Quran School Poster"
                className="w-full h-auto object-cover"
              />
            </Card>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              {language === "bs" ? "Kontakt" : "Kontakt"}
            </h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4 text-lg">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    {language === "bs" ? "Adresa" : "Adresse"}
                  </p>
                  <p className="text-muted-foreground">Wien, Österreich</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 text-lg">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">Email</p>
                  <p className="text-muted-foreground">info@ettaqwa-wien.at</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 text-lg">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">Telefon</p>
                  <p className="text-muted-foreground">+43 123 456 789</p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4 text-lg">
                <span className="text-2xl">🕐</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    {language === "bs" ? "Radno Vrijeme" : "Öffnungszeiten"}
                  </p>
                  <div className="text-muted-foreground space-y-1">
                    <p>{language === "bs" ? "Subota: 10:00 - 16:00" : "Samstag: 10:00 - 16:00"}</p>
                    <p>{language === "bs" ? "Nedjelja: 10:00 - 16:00" : "Sonntag: 10:00 - 16:00"}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;
