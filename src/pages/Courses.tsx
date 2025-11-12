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

        {/* Course Images with Descriptions */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Mekteb Registration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                <img
                  src={mektebRegistration}
                  alt="Mekteb Registration"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-8 bg-gradient-to-br from-card to-card/80">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  {language === "bs" ? "Upis u Mekteb" : "Mekteb Anmeldung"}
                </h2>
                <div className="space-y-3 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    {language === "bs"
                      ? "Prijavite svoju djecu za naš mekteb program gdje će naučiti osnove islama, arapski jezik i pravilno učenje Kur'ana."
                      : "Melden Sie Ihre Kinder für unser Mekteb-Programm an, wo sie die Grundlagen des Islam, Arabisch und das korrekte Lernen des Qurans erlernen."}
                  </p>
                  <p className="font-semibold text-foreground">
                    {language === "bs" ? "📅 Subota i Nedjelja" : "📅 Samstag und Sonntag"}
                  </p>
                  <p className="font-semibold text-foreground">
                    {language === "bs" ? "👥 Uzrast: 6-16 godina" : "👥 Alter: 6-16 Jahre"}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quran School */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative">
                <img
                  src={quranSchoolPoster}
                  alt="Quran School Poster"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-8 bg-gradient-to-br from-card to-card/80">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                  {language === "bs" ? "Kur'anska Škola" : "Quran-Schule"}
                </h2>
                <div className="space-y-3 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    {language === "bs"
                      ? "Naša kur'anska škola nudi kvalitetan program učenja Kur'ana sa iskusnim učiteljima koji podučavaju pravilnu recitaciju i tedžvid."
                      : "Unsere Quran-Schule bietet ein hochwertiges Programm zum Lernen des Qurans mit erfahrenen Lehrern, die korrekte Rezitation und Tajweed unterrichten."}
                  </p>
                  <p className="font-semibold text-foreground">
                    {language === "bs" ? "📖 Učenje sa tedžvidom" : "📖 Lernen mit Tajweed"}
                  </p>
                  <p className="font-semibold text-foreground">
                    {language === "bs" ? "🎓 Kvalificirani učitelji" : "🎓 Qualifizierte Lehrer"}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <Card className="p-8 text-center bg-gradient-to-br from-primary/5 via-card to-accent/5">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              {language === "bs" ? "Kontakt Informacije" : "Kontaktinformationen"}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2 text-muted-foreground">
                <p className="font-semibold text-foreground mb-3">
                  {language === "bs" ? "Posjetite Nas" : "Besuchen Sie Uns"}
                </p>
                <p>📍 Wien, Österreich</p>
                <p>📧 info@ettaqwa-wien.at</p>
                <p>📞 +43 123 456 789</p>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p className="font-semibold text-foreground mb-3">
                  {language === "bs" ? "Radno Vrijeme" : "Öffnungszeiten"}
                </p>
                <p>{language === "bs" ? "Subota: 10:00 - 16:00" : "Samstag: 10:00 - 16:00"}</p>
                <p>{language === "bs" ? "Nedjelja: 10:00 - 16:00" : "Sonntag: 10:00 - 16:00"}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;
