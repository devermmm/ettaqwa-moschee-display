import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Clock, MapPin, Calendar, Youtube } from "lucide-react";
import mosqueInterior from "@/assets/mosque-interior.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mosqueInterior})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter drop-shadow-lg">
              HERZLICH WILLKOMMEN
            </h1>
            <p className="text-3xl md:text-5xl lg:text-6xl font-amiri text-primary-glow drop-shadow-lg">
              المركز الاسلامي في فيينا
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-inter drop-shadow-lg">
              ET-TAQWA MOSCHEE WIEN
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <NavLink to="/gebetszeiten">
              <Button size="lg" className="text-lg font-semibold">
                <Clock className="mr-2 h-5 w-5" />
                Gebetszeiten
              </Button>
            </NavLink>
            <Button size="lg" variant="outline" className="text-lg font-semibold bg-white/10 backdrop-blur-sm">
              <Youtube className="mr-2 h-5 w-5" />
              Live Streams
            </Button>
          </div>
        </div>
      </section>

      {/* Quran Verse Section */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
            <div className="text-center space-y-6">
              <p className="text-2xl md:text-3xl lg:text-4xl font-amiri text-primary leading-relaxed">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
              <p className="text-base md:text-lg text-muted-foreground font-inter italic">
                Im Namen Allahs, des Allerbarmers, des Barmherzigen
              </p>
              <div className="pt-4 border-t border-border/50">
                <p className="text-lg md:text-xl font-amiri text-foreground leading-relaxed mb-4">
                  يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ
                </p>
                <p className="text-sm md:text-base text-muted-foreground font-inter">
                  "O ihr Menschen, Wir haben euch ja von einem männlichen und einem weiblichen Wesen erschaffen, 
                  und Wir haben euch zu Völkern und Stämmen gemacht, damit ihr einander kennenlernt. 
                  Gewiß, der Geehrteste von euch bei Allah ist der Gottesfürchtigste von euch. 
                  Gewiß, Allah ist Allwissend und Allkundig."
                </p>
                <p className="text-sm text-primary font-semibold mt-2">Qur'an, 49:13</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Gebetszeiten</h3>
                <p className="text-muted-foreground">
                  Aktuelle Gebetszeiten für Wien mit Live-Countdown zum nächsten Gebet
                </p>
                <NavLink to="/gebetszeiten">
                  <Button variant="outline" className="w-full">
                    Zu den Gebetszeiten
                  </Button>
                </NavLink>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Kontakt & Anfahrt</h3>
                <p className="text-muted-foreground">
                  Besuchen Sie uns in der Et-Taqwa Moschee Wien
                </p>
                <Button variant="outline" className="w-full">
                  Mehr erfahren
                </Button>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Veranstaltungen</h3>
                <p className="text-muted-foreground">
                  Kommende Events und Programme in unserer Gemeinde
                </p>
                <Button variant="outline" className="w-full">
                  Events ansehen
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground font-amiri">
            اللهم بارك لنا - Allah segne uns alle
          </p>
          <p className="text-xs text-muted-foreground">
            Developed by{" "}
            <a 
              href="https://deverm.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="story-link font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              DEVERM
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
