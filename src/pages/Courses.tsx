import { motion } from "framer-motion";
import { BookOpen, Users, Clock, Calendar, Phone, CheckCircle2, Award, Mail } from "lucide-react";
import quranSchoolPoster from "@/assets/quran-school-poster.png";
import mektebRegistration from "@/assets/mekteb-registration.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Courses = () => {
  const { t } = useLanguage();
  
  const courses = [
    {
      title: t("courses.quranTitle"),
      description: t("courses.quranDesc"),
      schedule: "Samstag & Sonntag",
      time: "Nach den Gebetszeiten",
      target: "Kinder, Jugendliche & Erwachsene",
    },
    {
      title: "Arabisch für Anfänger",
      description: "Grundlagen der arabischen Sprache für ein besseres Verständnis",
      schedule: "Mittwoch",
      time: "18:00 - 19:30 Uhr",
      target: "Erwachsene",
    },
    {
      title: "Islamische Studien",
      description: "Vertiefen Sie Ihr Wissen über islamische Geschichte und Lehre",
      schedule: "Freitag",
      time: "19:00 - 20:30 Uhr",
      target: "Alle Altersgruppen",
    },
    {
      title: "Bosnisch-Unterricht",
      description: "Bewahren Sie die Verbindung zu Ihrer Muttersprache und Kultur",
      schedule: "Sonntag",
      time: "10:00 - 12:00 Uhr",
      target: "Kinder & Jugendliche",
    },
  ];

  const benefits = [
    "Die Koranschrift beherrschen",
    "Den Koran richtig lesen lernen",
    "Tajweed und die Schönheit des Koranlesens perfektionieren",
    "Den Weg des Auswendiglernens beginnen oder fortsetzen",
    "Gemeinsam in Wissen, Glauben und Anbetung wachsen",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              {t("courses.title")}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-1.5 w-40 mx-auto bg-gradient-to-r from-primary via-accent to-primary rounded-full mb-8 shadow-lg shadow-primary/20"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {t("courses.subtitle")}
            </motion.p>
          </div>

          {/* Featured: Koranschule Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Left: Welcome Text */}
                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Willkommen in der Koranschule
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      Liebe Gemeindemitglieder, vor uns liegt ein neues Schuljahr in der Koranschule - eine neue Gelegenheit zu:
                    </p>
                  </div>

                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-base text-foreground">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <p className="text-lg font-semibold text-primary mb-4">
                      Verpassen Sie nicht noch eine Gelegenheit zum Lernen, Wachsen und sich Allah näherzukommen!
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      Die Einschreibung läuft!
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="grid gap-4 pt-4">
                    <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Für Männer:</p>
                        <p className="text-lg font-bold text-foreground">+43 660 5515940</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                      <Phone className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Für Frauen:</p>
                        <p className="text-lg font-bold text-foreground">+43 660 2001711</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Poster Image */}
                <div className="flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative group"
                  >
                    <img 
                      src={quranSchoolPoster} 
                      alt="Koranschule Einschreibung" 
                      className="rounded-2xl shadow-2xl w-full max-w-md group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mekteb Einschreibung Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-accent/20">
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Left: Mekteb Poster */}
                <div className="flex items-center justify-center order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="relative group"
                  >
                    <img 
                      src={mektebRegistration} 
                      alt="Mekteb Einschreibung" 
                      className="rounded-2xl shadow-2xl w-full max-w-md group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>

                {/* Right: Mekteb Info */}
                <div className="flex flex-col justify-center space-y-6 order-1 md:order-2">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      Melden Sie Ihr Kind an!
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Liebe Eltern, der Mekteb ist der erste Ort nach dem familiären Umfeld, wo Kinder über Glauben, Liebe und Respekt lernen.
                    </p>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-6 h-6 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Einschreibung:</p>
                        <p className="text-xl font-bold text-foreground">6. & 7. September 2025</p>
                        <p className="text-base text-muted-foreground">(Samstag & Sonntag)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Uhrzeit:</p>
                        <p className="text-xl font-bold text-foreground">11:00 - 13:00 Uhr</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Im Mekteb erwerben sie Wissen über den Islam, neue Freundschaften und ein Gefühl der Zugehörigkeit zur Gemeinschaft.
                    </p>
                    <p className="text-lg font-semibold text-primary">
                      Indem Sie Ihr Kind im Mekteb anmelden, geben Sie ihm das beste Geschenk, das es ein Leben lang begleiten wird – Wissen und Erziehung im Geiste des Islam.
                    </p>
                    <p className="text-xl font-bold text-accent">
                      Mekteb – Investition in die Zukunft unserer Kinder!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;
