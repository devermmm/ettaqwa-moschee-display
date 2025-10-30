import { motion } from "framer-motion";
import { BookOpen, Users, Clock, Calendar } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      title: "Koran-Unterricht",
      description: "Lernen Sie die korrekte Rezitation des Heiligen Korans mit Tajweed",
      schedule: "Samstag & Sonntag",
      time: "14:00 - 16:00 Uhr",
      target: "Kinder & Jugendliche",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"
            >
              Unsere Kurse
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-1 w-32 mx-auto bg-gradient-to-r from-primary to-accent rounded-full mb-6"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Bildungsangebote für alle Altersgruppen und Wissensstufen
            </motion.p>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 bg-muted/30 rounded-xl p-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-medium">{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">{course.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-medium">{course.target}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Anmeldung
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Die Teilnahme an unseren Kursen ist kostenlos. Melden Sie sich einfach 
                vor Ort oder kontaktieren Sie uns für weitere Informationen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-accent/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Qualifizierte Lehrer
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Unsere Kurse werden von erfahrenen und qualifizierten Lehrern geleitet, 
                die mit Herz und Engagement bei der Sache sind.
              </p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-12 text-center shadow-xl border border-border/50"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Haben Sie Fragen?
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Kontaktieren Sie uns für eine persönliche Beratung zu unseren Bildungsangeboten
            </p>
            <p className="text-lg text-primary font-semibold">
              Wir freuen uns auf Ihre Teilnahme!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Courses;
