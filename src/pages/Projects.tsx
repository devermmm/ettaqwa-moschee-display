import { motion } from "framer-motion";
import { Heart, BookOpen, Users, Sparkles } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      icon: BookOpen,
      title: "Islamische Bildung",
      description: "Förderung von Wissen und Verständnis durch Kurse und Seminare für alle Altersgruppen.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "Soziale Projekte",
      description: "Unterstützung bedürftiger Menschen in unserer Gemeinschaft und darüber hinaus.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Gemeinschaftsaktivitäten",
      description: "Regelmäßige Veranstaltungen zur Stärkung des Zusammenhalts und der Gemeinschaft.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Sparkles,
      title: "Jugendarbeit",
      description: "Programme und Aktivitäten speziell für unsere junge Generation.",
      color: "from-amber-500 to-orange-500",
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
              Unsere Projekte
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
              Entdecken Sie unsere vielfältigen Initiativen für die Gemeinschaft
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${project.color} mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${project.color} transition-all duration-500 rounded-b-2xl`} />
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm rounded-2xl p-12 text-center shadow-xl border border-primary/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Möchten Sie sich engagieren?
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Wir freuen uns über jede Unterstützung und Teilnahme an unseren Projekten
            </p>
            <p className="text-lg text-primary font-semibold">
              Kontaktieren Sie uns für weitere Informationen
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
