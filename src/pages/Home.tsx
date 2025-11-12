import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Clock, MapPin, Calendar } from "lucide-react";
import mosqueInterior from "@/assets/mosque-interior.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { t } = useLanguage();
  
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${mosqueInterior})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background/95" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 space-y-8 max-w-5xl mx-auto">
          <div className="space-y-4 animate-fade-in">
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter drop-shadow-2xl leading-tight">
              {t("home.welcome")}
            </h1>
            <p className="text-3xl md:text-5xl lg:text-6xl font-amiri text-primary-glow drop-shadow-2xl leading-relaxed">
              المركز الاسلامي في فيينا
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-inter drop-shadow-2xl tracking-wide">
              {t("home.mosque")}
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <NavLink to="/gebetszeiten">
              <Button size="lg" className="text-lg font-semibold shadow-2xl hover:scale-105 transition-transform px-8 py-6 bg-primary hover:bg-primary/90">
                <Clock className="mr-2 h-5 w-5" />
                {t("home.viewPrayerTimes")}
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
                  {t("home.blessing")}
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
              {t("home.offers")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("home.offersDesc")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="group p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="space-y-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Clock className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t("home.prayerTimesTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("home.prayerTimesDesc")}
                </p>
                <NavLink to="/gebetszeiten">
                  <Button variant="default" className="w-full mt-4 group-hover:bg-primary/90">
                    {t("home.viewPrayerTimes")}
                  </Button>
                </NavLink>
              </div>
            </Card>

            <Card className="group p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50">
              <div className="space-y-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <MapPin className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t("home.contactTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("home.contactDesc")}
                </p>
                <NavLink to="/kontakte">
                  <Button variant="outline" className="w-full mt-4 group-hover:border-accent">
                    {t("home.learnMore")}
                  </Button>
                </NavLink>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("home.visitUs")}
            </h2>
            <p className="text-muted-foreground text-lg">
              Dzemat Et-Taqwa - Moschee - مسجد
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Embed */}
            <Card className="p-0 overflow-hidden border-2 border-border hover:border-primary/30 transition-colors">
              <div className="relative h-[400px] lg:h-[500px]">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.6845791707543!2d16.457846!3d48.2626393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d05d00086649f%3A0x7f459c880e35de51!2sDzemat%20Et-Taqwa%20-%20Moschee%20-%20%D9%85%D8%B3%D8%AC%D8%AF!5e0!3m2!1sde!2sat!4v1234567890" width="100%" height="100%" style={{
                border: 0
              }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Moschee Standort" />
              </div>
            </Card>

            {/* Location Info & Links */}
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/30 transition-colors">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-primary" />
                      {t("home.address")}
                    </h3>
                    <p className="text-lg text-foreground/90">
                      Dzemat Et-Taqwa Moschee<br />
                      Wien, Österreich
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border space-y-4">
                    <h4 className="font-semibold text-lg mb-4">{t("home.navigation")}</h4>
                    
                    <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x476d05d00086649f:0x7f459c880e35de51" target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary group">
                        <svg className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {t("home.openInGoogleMaps")}
                      </Button>
                    </a>

                    <a href="https://maps.apple.com/?address=Wien,Austria&ll=48.2626393,16.4600349&q=Dzemat%20Et-Taqwa%20Moschee" target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary group">
                        <svg className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {t("home.openInAppleMaps")}
                      </Button>
                    </a>

                    <a href="https://www.google.com/maps/@48.2621943,16.4599273,3a,75y,9.4h,90t/data=!3m7!1e1!3m5!1szCmzkBdoHD8vAApzjVqWZQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DzCmzkBdoHD8vAApzjVqWZQ%26yaw%3D9.4012165!7i13312!8i6656" target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary group">
                        <svg className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        {t("home.view360")}
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-background to-muted/10 border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-lg md:text-xl text-foreground font-amiri">
                {t("home.blessing")}
              </p>
              <p className="text-sm md:text-base text-muted-foreground font-inter">
                {t("home.blessingTranslation")}
              </p>
            </div>
            <div className="pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                {t("footer.developed")}{" "}
                <a href="https://deverm.com/" target="_blank" rel="noopener noreferrer" className="story-link font-semibold text-primary hover:text-primary/80 transition-colors">
                  DEVERM
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Home;