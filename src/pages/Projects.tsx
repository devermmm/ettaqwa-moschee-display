import { motion } from "framer-motion";
import { Heart, BookOpen, Users, Sparkles, HandHeart, GraduationCap, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();
  
  const projects = [
    {
      icon: BookOpen,
      title: t("projects.education"),
      description: t("projects.educationDesc"),
      color: "from-emerald-500 to-teal-500",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: Heart,
      title: t("projects.social"),
      description: t("projects.socialDesc"),
      color: "from-rose-500 to-pink-500",
      gradient: "from-rose-500/20 to-pink-500/20",
    },
    {
      icon: Users,
      title: t("projects.community"),
      description: t("projects.communityDesc"),
      color: "from-purple-500 to-indigo-500",
      gradient: "from-purple-500/20 to-indigo-500/20",
    },
    {
      icon: GraduationCap,
      title: t("projects.youth"),
      description: t("projects.youthDesc"),
      color: "from-amber-500 to-orange-500",
      gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
      icon: HandHeart,
      title: t("projects.charity"),
      description: t("projects.charityDesc"),
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Sparkles,
      title: t("projects.islamic"),
      description: t("projects.islamicDesc"),
      color: "from-violet-500 to-fuchsia-500",
      gradient: "from-violet-500/20 to-fuchsia-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
              {t("projects.title")}
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
              {t("projects.subtitle")}
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="relative bg-card/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full">
                    {/* Icon with gradient background */}
                    <div className="relative mb-6">
                      <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${project.color} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {/* Glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-2xl`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Bottom gradient line */}
                    <div className={`absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full bg-gradient-to-r ${project.color} transition-all duration-500 rounded-b-3xl shadow-lg`} />
                    
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm rounded-3xl p-12 md:p-16 text-center shadow-2xl border border-primary/20 overflow-hidden"
          >
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("projects.getInvolvedTitle")}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {t("projects.getInvolvedDesc")}
              </p>
              <a
                href="mailto:info@et-taqwa.at"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                {t("projects.contactEmail")}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
