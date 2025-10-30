import { motion } from "framer-motion";
import communityImage from "@/assets/community.png";
import mosqueInteriorImage from "@/assets/mosque-interior.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"
            >
              Über Uns
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-1 w-32 mx-auto bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>

          {/* Community Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-16 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src={communityImage} 
              alt="Unsere Gemeinschaft" 
              className="w-full h-auto"
            />
          </motion.div>

          {/* Mosque Interior Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-16 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src={mosqueInteriorImage} 
              alt="Das Innere unserer Moschee" 
              className="w-full h-auto"
            />
            <p className="text-center text-muted-foreground mt-4 text-lg italic">Das Innere unserer Moschee</p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-border/50"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Willkommen in unserer Gemeinschaft
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Der Bosniakische Kulturverein El Taqwa ist Teil der Bosniakischen Kultusgemeinde Mitte. 
                  Der Verein wurde am 17. März 2015 erstmals vereinsrechtlich registriert. Er ist auch unter 
                  dem Namen Dzemat Et-Taqwa bekannt. Regelmäßig finden in den Räumlichkeiten des Vereins 
                  Freitagsgebete statt.
                </p>
                <p>
                  Unsere Moschee ist ein Ort des Friedens, der Gemeinschaft und des spirituellen Wachstums. 
                  Als bosnische Moschee pflegen wir unsere kulturellen Wurzeln und öffnen gleichzeitig 
                  unsere Türen für alle Menschen, unabhängig von ihrer Herkunft.
                </p>
                <p>
                  Wir sind eine lebendige Gemeinschaft, die sich den islamischen Werten verpflichtet fühlt 
                  und diese im täglichen Leben praktiziert. Unsere Moschee dient nicht nur als Ort des Gebets, 
                  sondern auch als Zentrum für Bildung, soziale Aktivitäten und gemeinschaftliches Engagement.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-border/50"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Jeder ist willkommen
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Bei uns ist jeder herzlich willkommen – ob Muslim oder Nicht-Muslim, ob jung oder alt, 
                  ob Sie zum ersten Mal eine Moschee besuchen oder bereits Teil unserer Gemeinschaft sind. 
                  Wir glauben an Dialog, gegenseitigen Respekt und das gemeinsame Streben nach Verständnis.
                </p>
                <p>
                  Unsere Türen stehen offen für alle, die mehr über den Islam erfahren möchten, die einen 
                  Ort der Ruhe und des Gebets suchen oder einfach nur unsere Gemeinschaft kennenlernen möchten.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-primary/20"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Unsere Mission
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Wir streben danach, einen Raum zu schaffen, in dem Menschen ihren Glauben leben können, 
                  sich gegenseitig unterstützen und gemeinsam wachsen. Durch Bildungsprogramme, soziale 
                  Projekte und regelmäßige Veranstaltungen fördern wir das Verständnis für islamische Werte 
                  und stärken den Zusammenhalt in unserer Gemeinschaft.
                </p>
                <p className="text-primary font-semibold text-xl">
                  Besuchen Sie uns und werden Sie Teil unserer Familie!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
