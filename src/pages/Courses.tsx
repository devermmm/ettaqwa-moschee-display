import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import mektebRegistration from "@/assets/mekteb-registration.png";
import quranSchoolPoster from "@/assets/quran-school-poster.png";
const Courses = () => {
  const {
    language
  } = useLanguage();
  return <div className="min-h-screen bg-gradient-to-b from-background to-muted py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {language === "bs" ? "Mekteb Program" : "Mekteb Programm"}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {language === "bs" ? "Islamsko obrazovanje za djecu i mlade" : "Islamische Bildung für Kinder und Jugendliche"}
          </p>
        </motion.div>

        {/* Course Images with Descriptions */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Mekteb Registration */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            <Card className="overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="flex items-center justify-center">
                  <img src={mektebRegistration} alt="Mekteb Registration" className="max-w-sm w-full h-auto object-cover rounded-lg shadow-md" />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">
                    {language === "bs" ? "Upis u Mekteb 2024/2025" : "Mekteb Anmeldung 2024/2025"}
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="text-lg leading-relaxed">
                      {language === "bs" ? "Počinje nova školska godina mekteba! Prijavite svoju djecu za kvalitetno islamsko obrazovanje gdje će naučiti osnove vjere, arapski jezik i pravilno učenje Kur'ana." : "Das neue Mekteb-Schuljahr beginnt! Melden Sie Ihre Kinder für eine hochwertige islamische Bildung an, wo sie die Grundlagen des Glaubens, Arabisch und das korrekte Lernen des Qurans erlernen."}
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span>📅</span>
                        {language === "bs" ? "Raspored: Subota i Nedjelja" : "Zeitplan: Samstag und Sonntag"}
                      </p>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span>👥</span>
                        {language === "bs" ? "Uzrast: 6-16 godina" : "Alter: 6-16 Jahre"}
                      </p>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span>🕐</span>
                        {language === "bs" ? "Vrijeme: 10:00 - 16:00" : "Zeit: 10:00 - 16:00"}
                      </p>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span>📚</span>
                        {language === "bs" ? "Program: Islamske nauke, Arapski, Kur'an" : "Programm: Islamwissenschaften, Arabisch, Quran"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quran School */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
            <Card className="overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="flex flex-col justify-center space-y-4 order-2 md:order-1">
                  <h2 className="text-3xl font-bold text-foreground">
                    {language === "bs" ? "Kur'anska Škola" : "Quran-Schule"}
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="text-lg leading-relaxed">
                      {language === "bs" ? "Naša kur'anska škola nudi sveobuhvatan program učenja Kur'ana sa iskusnim i kvalificiranim učiteljima. Fokusiramo se na pravilnu recitaciju, učenje tedžvida i razumijevanje značenja ajeta." : "Unsere Quran-Schule bietet ein umfassendes Programm zum Lernen des Qurans mit erfahrenen und qualifizierten Lehrern. Wir konzentrieren uns auf korrekte Rezitation, Tajweed-Lernen und das Verständnis der Bedeutung der Verse."}
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span>📖</span>
                        {language === "bs" ? "Učenje sa tedžvidom i pravilnim izgovorom" : "Lernen mit Tajweed und korrekter Aussprache"}
                      </p>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span>🎓</span>
                        {language === "bs" ? "Kvalificirani i iskusni učitelji" : "Qualifizierte und erfahrene Lehrer"}
                      </p>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span>👨‍👩‍👧‍👦</span>
                        {language === "bs" ? "Mali grupe za individualnu pažnju" : "Kleine Gruppen für individuelle Betreuung"}
                      </p>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <span>✨</span>
                        {language === "bs" ? "Prijatna i podsticajna atmosfera" : "Angenehme und fördernde Atmosphäre"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center order-1 md:order-2">
                  <img src={quranSchoolPoster} alt="Quran School Poster" className="max-w-sm w-full h-auto object-cover rounded-lg shadow-md" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="mt-16 max-w-2xl mx-auto">
          <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5">
            
            
            
          </Card>
        </motion.div>
      </div>
    </div>;
};
export default Courses;