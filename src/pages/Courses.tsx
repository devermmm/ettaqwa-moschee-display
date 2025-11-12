import { motion } from "framer-motion";
import { BookOpen, Users, Clock, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import quranSchoolBg from "@/assets/quran-school-bg.png";

const Courses = () => {
  const { language, t } = useLanguage();

  const courses = [
    {
      icon: BookOpen,
      title: t("courses.quranTitle"),
      description: t("courses.quranDesc"),
      ages: language === "bs" ? "Djeca i odrasli" : "Kinder und Erwachsene",
      schedule: language === "bs" ? "Subota & Nedjelja" : "Samstag & Sonntag",
    },
    {
      icon: Users,
      title: t("courses.arabicTitle"),
      description: t("courses.arabicDesc"),
      ages: language === "bs" ? "10+ godina" : "10+ Jahre",
      schedule: language === "bs" ? "Subota popodne" : "Samstag Nachmittag",
    },
    {
      icon: Award,
      title: t("courses.islamicTitle"),
      description: t("courses.islamicDesc"),
      ages: language === "bs" ? "Sve uzraste" : "Alle Altersgruppen",
      schedule: language === "bs" ? "Nedjelja ujutro" : "Sonntag Vormittag",
    },
  ];

  const benefits = [
    t("courses.benefit1"),
    t("courses.benefit2"),
    t("courses.benefit3"),
    t("courses.benefit4"),
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${quranSchoolBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl"
          >
            {t("courses.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl drop-shadow-lg"
          >
            {t("courses.subtitle")}
          </motion.p>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="py-16 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t("courses.welcomeTitle")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("courses.welcomeText")}
            </p>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col h-full">
                      <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 self-start">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 flex-grow">
                        {course.description}
                      </p>
                      <div className="space-y-2 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{course.ages}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{course.schedule}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              {t("courses.benefitsTitle")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground flex-1">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              {t("courses.enrollTitle")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t("courses.enrollText")}
            </p>
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
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
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {t("courses.visitTitle")}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "bs"
                      ? "Posjetite nas svake nedjelje nakon džuma namaza"
                      : "Besuchen Sie uns jeden Sonntag nach dem Jummah-Gebet"}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
