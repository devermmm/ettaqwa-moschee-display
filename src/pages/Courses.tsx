import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import mektebRegistration from "@/assets/mekteb-registration.png";
import quranSchoolPoster from "@/assets/quran-school-poster.png";
import { BookOpen, Users, Clock, Heart } from "lucide-react";

const Courses = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header Section */}
      <div className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t("courses.title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {t("courses.subtitle")}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("courses.welcomeText")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Course Images Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            {language === "bs" ? "Naši Programi" : "Unsere Programme"}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={mektebRegistration}
                    alt="Mekteb Registration"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 bg-gradient-to-br from-card to-card/80">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {language === "bs" ? "Mekteb Registracija" : "Mekteb Anmeldung"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "bs"
                      ? "Prijavite svoju djecu za naš mekteb program. Učenje Kur'ana, arapskog jezika i islamskih osnova."
                      : "Melden Sie Ihre Kinder für unser Mekteb-Programm an. Lernen Sie Quran, Arabisch und islamische Grundlagen."}
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={quranSchoolPoster}
                    alt="Quran School Poster"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 bg-gradient-to-br from-card to-card/80">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {language === "bs" ? "Kur'anska Škola" : "Quran-Schule"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "bs"
                      ? "Intenzivni program učenja Kur'ana sa kvalificiranim učiteljima. Redovne časovi vikendom."
                      : "Intensives Quran-Lernprogramm mit qualifizierten Lehrern. Regelmäßiger Unterricht am Wochenende."}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <Card className="p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              {language === "bs" ? "Kvalitetna Nastava" : "Qualitätsunterricht"}
            </h3>
            <p className="text-muted-foreground">
              {language === "bs"
                ? "Iskusni učitelji sa dugogodišnjim iskustvom u islamskom obrazovanju"
                : "Erfahrene Lehrer mit langjähriger Erfahrung in islamischer Bildung"}
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              {language === "bs" ? "Male Grupe" : "Kleine Gruppen"}
            </h3>
            <p className="text-muted-foreground">
              {language === "bs"
                ? "Individualan pristup svakom djetetu u malim grupama"
                : "Individuelle Betreuung jedes Kindes in kleinen Gruppen"}
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">
              {language === "bs" ? "Fleksibilno Vrijeme" : "Flexible Zeiten"}
            </h3>
            <p className="text-muted-foreground">
              {language === "bs"
                ? "Časovi subotom i nedjeljom, prilagođeni porodičnom rasporedu"
                : "Unterricht am Samstag und Sonntag, angepasst an den Familienplan"}
            </p>
          </Card>
        </motion.div>

        {/* What We Offer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 via-card to-accent/5">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
              {language === "bs" ? "Šta Nudimo" : "Was Wir Anbieten"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: language === "bs" ? "Učenje Kur'ana" : "Quran-Unterricht",
                  desc: language === "bs"
                    ? "Pravilno učenje i recitacija Kur'ana sa tedžvidom"
                    : "Korrektes Lernen und Rezitation des Qurans mit Tajweed"
                },
                {
                  title: language === "bs" ? "Arapski Jezik" : "Arabische Sprache",
                  desc: language === "bs"
                    ? "Osnove arapskog jezika za razumijevanje Kur'ana"
                    : "Grundlagen der arabischen Sprache zum Verständnis des Qurans"
                },
                {
                  title: language === "bs" ? "Islamske Osnove" : "Islamische Grundlagen",
                  desc: language === "bs"
                    ? "Akida, ibadet i islamski moral za djecu"
                    : "Aqida, Ibadah und islamische Moral für Kinder"
                },
                {
                  title: language === "bs" ? "Kulturne Aktivnosti" : "Kulturelle Aktivitäten",
                  desc: language === "bs"
                    ? "Bogat program sa zabavnim i edukativnim aktivnostima"
                    : "Reiches Programm mit unterhaltsamen und lehrreichen Aktivitäten"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              {language === "bs" ? "Prijavite Se Danas" : "Jetzt Anmelden"}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {language === "bs"
                ? "Želite da vaša djeca dobiju kvalitetno islamsko obrazovanje? Kontaktirajte nas danas za više informacija ili posjetite nas vikendom."
                : "Möchten Sie, dass Ihre Kinder eine qualitativ hochwertige islamische Bildung erhalten? Kontaktieren Sie uns noch heute für weitere Informationen oder besuchen Sie uns am Wochenende."}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-foreground mb-3">
                  {language === "bs" ? "Kontakt Informacije" : "Kontaktinformationen"}
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>📧 info@ettaqwa-wien.at</p>
                  <p>📞 +43 123 456 789</p>
                  <p>📍 Wien, Österreich</p>
                </div>
              </div>

              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="font-bold text-foreground mb-3">
                  {language === "bs" ? "Radno Vrijeme" : "Öffnungszeiten"}
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>{language === "bs" ? "Subota: 10:00 - 16:00" : "Samstag: 10:00 - 16:00"}</p>
                  <p>{language === "bs" ? "Nedjelja: 10:00 - 16:00" : "Sonntag: 10:00 - 16:00"}</p>
                  <p className="text-sm italic">
                    {language === "bs"
                      ? "Posjetite nas nakon džuma namaza"
                      : "Besuchen Sie uns nach dem Jummah-Gebet"}
                  </p>
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
