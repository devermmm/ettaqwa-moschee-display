import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Clock, MapPin, Calendar } from "lucide-react";
import mosqueInterior from "@/assets/mosque-interior.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mosqueInterior})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background/95" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 space-y-8 max-w-5xl mx-auto">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-block px-6 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-4">
              <p className="text-sm md:text-base font-inter tracking-wider">Islamisches Zentrum Wien</p>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter drop-shadow-2xl leading-tight">
              HERZLICH WILLKOMMEN
            </h1>
            <p className="text-3xl md:text-5xl lg:text-6xl font-amiri text-primary-glow drop-shadow-2xl leading-relaxed">
              المركز الاسلامي في فيينا
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-inter drop-shadow-2xl tracking-wide">
              ET-TAQWA MOSCHEE
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <NavLink to="/gebetszeiten">
              <Button size="lg" className="text-lg font-semibold shadow-2xl hover:scale-105 transition-transform px-8 py-6 bg-primary hover:bg-primary/90">
                <Clock className="mr-2 h-5 w-5" />
                Gebetszeiten anzeigen
              </Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Quran Verse Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-2xl">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/30">
                  <p className="text-sm font-inter text-primary font-semibold tracking-wider">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                </div>
                <p className="text-base md:text-lg text-muted-foreground font-inter italic">
                  Im Namen Allahs, des Allerbarmers, des Barmherzigen
                </p>
              </div>
              
              <div className="pt-6 space-y-6">
                <div className="bg-muted/20 rounded-2xl p-6 md:p-8 border border-border/50">
                  <p className="text-xl md:text-2xl lg:text-3xl font-amiri text-primary leading-relaxed">
                    يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ
                  </p>
                </div>
                
                <div className="max-w-4xl mx-auto space-y-3">
                  <p className="text-sm md:text-base lg:text-lg text-foreground/90 font-inter leading-relaxed">
                    "O ihr Menschen, Wir haben euch ja von einem männlichen und einem weiblichen Wesen erschaffen, 
                    und Wir haben euch zu Völkern und Stämmen gemacht, damit ihr einander kennenlernt. 
                    Gewiß, der Geehrteste von euch bei Allah ist der Gottesfürchtigste von euch. 
                    Gewiß, Allah ist Allwissend und Allkundig."
                  </p>
                  <div className="pt-2">
                    <span className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                      <p className="text-sm font-semibold text-primary">Qur'an, Sure 49:13</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 md:py-24 px-4 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Unsere Angebote
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Entdecken Sie unsere vielfältigen Angebote und Services für die Gemeinde
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="space-y-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Clock className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Gebetszeiten</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Aktuelle Gebetszeiten für Wien mit Live-Countdown zum nächsten Gebet und Vollbild-Modus für die Moschee
                </p>
                <NavLink to="/gebetszeiten">
                  <Button variant="default" className="w-full mt-4 group-hover:bg-primary/90">
                    Gebetszeiten anzeigen
                  </Button>
                </NavLink>
              </div>
            </Card>

            <Card className="group p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="space-y-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <MapPin className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Kontakt & Anfahrt</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Besuchen Sie uns in der Et-Taqwa Moschee Wien. Wir freuen uns auf Ihren Besuch
                </p>
                <Button variant="outline" className="w-full mt-4 group-hover:border-accent">
                  Mehr erfahren
                </Button>
              </div>
            </Card>

            <Card className="group p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="space-y-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Calendar className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Veranstaltungen</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kommende Events, Vorträge und Programme in unserer Gemeinde
                </p>
                <Button variant="outline" className="w-full mt-4 group-hover:border-secondary">
                  Events ansehen
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-background to-muted/10 border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-lg md:text-xl text-foreground font-amiri">
                اللهم بارك لنا
              </p>
              <p className="text-sm md:text-base text-muted-foreground font-inter">
                Allah segne uns alle
              </p>
            </div>
            <div className="pt-4 border-t border-border/30">
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
