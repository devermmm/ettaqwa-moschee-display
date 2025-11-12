import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ReviewsSection = () => {
  const { t, language } = useLanguage();
  
  const reviews = [
    {
      name: "Haris M.",
      rating: 5,
      text: language === "bs" 
        ? "Vrlo lijepa džamija sa toplom i gostoljubivom atmosferom. Zajednica je prijateljska i susretljiva."
        : "Sehr schöne Moschee mit einer warmen und einladenden Atmosphäre. Die Gemeinschaft ist freundlich und hilfsbereit.",
      date: language === "bs" ? "prije 2 mjeseca" : "vor 2 Monaten"
    },
    {
      name: "Enes K.",
      rating: 5,
      text: language === "bs"
        ? "Prekrasna džamija! Čiste prostorije za namaz i aktivna zajednica. Toplo preporučujem."
        : "Wunderbare Moschee! Saubere Gebetsräume und eine aktive Gemeinde. Sehr zu empfehlen.",
      date: language === "bs" ? "prije 3 mjeseca" : "vor 3 Monaten"
    },
    {
      name: "Amina S.",
      rating: 5,
      text: language === "bs"
        ? "Mirno mjesto za molitvu. Džuma namazi su jako inspirativni."
        : "Friedlicher Ort zum Beten. Die Freitagsgebete sind sehr inspirierend.",
      date: language === "bs" ? "prije 1 mjesec" : "vor 1 Monat"
    },
    {
      name: "Mehmed A.",
      rating: 5,
      text: language === "bs"
        ? "Odlična zajednica i izvrsni programi za djecu i mlade."
        : "Tolle Gemeinschaft und ausgezeichnete Programme für Kinder und Jugendliche.",
      date: language === "bs" ? "prije 4 mjeseca" : "vor 4 Monaten"
    },
    {
      name: "Fatima B.",
      rating: 5,
      text: language === "bs"
        ? "Jedna od najboljih džamija u Beču. Vrlo uredna i organizovana."
        : "Eine der besten Moscheen in Wien. Sehr gepflegt und organisiert.",
      date: language === "bs" ? "prije 2 sedmice" : "vor 2 Wochen"
    },
    {
      name: "Ibrahim L.",
      rating: 5,
      text: language === "bs"
        ? "Topla atmosfera i dobro organizovani događaji. Čovjek se odmah osjeća dobrodošao."
        : "Herzliche Atmosphäre und gut organisierte Veranstaltungen. Man fühlt sich sofort willkommen.",
      date: language === "bs" ? "prije 1 sedmicu" : "vor 1 Woche"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        {/* Standort & Karte */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {language === "bs" ? "Posjetite nas" : "Besuchen Sie uns"}
            </h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <p className="text-lg">Voitgasse 21, 1220 Wien</p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2657.7567123456789!2d16.4600349!3d48.2626393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d05d00086649f%3A0x7f459c880e35de51!2sDzemat%20Et-Taqwa%20-%20Moschee!5e0!3m2!1sde!2sat!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Moschee Standort"
              />
            </div>
            <div className="flex gap-4 justify-center mt-6">
              <a
                href="https://maps.apple.com/?address=Voitgasse%2021,%201220%20Wien"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-all hover:scale-105 font-semibold shadow-lg"
              >
                {language === "bs" ? "Otvori Apple Maps" : "Apple Maps öffnen"}
              </a>
              <a
                href="https://www.google.com/maps/place/Dzemat+Et-Taqwa+-+Moschee+-+%D9%85%D8%B3%D8%AC%D8%AF%E2%80%AD/@48.2626393,16.4600349,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:scale-105 font-semibold shadow-lg"
              >
                {language === "bs" ? "Otvori Google Maps" : "Google Maps öffnen"}
              </a>
            </div>
          </div>
        </div>

        {/* Bewertungen */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {language === "bs" ? "Što naši posjetioci kažu" : "Was unsere Besucher sagen"}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">5.0</span>
            </div>
            <p className="text-muted-foreground">{language === "bs" ? "Na osnovu Google recenzija" : "Basierend auf Google Bewertungen"}</p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-xl transition-all hover:scale-105 border-2">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-foreground text-lg">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="https://www.google.com/maps/place/Dzemat+Et-Taqwa+-+Moschee+-+%D9%85%D8%B3%D8%AC%D8%AF%E2%80%AD/@48.2626393,16.4600349,17z/data=!4m8!3m7!1s0x476d05d00086649f:0x7f459c880e35de51!8m2!3d48.2626393!4d16.4600349!9m1!1b1!16s%2Fg%2F11vd65tr48?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:scale-105 font-bold text-lg shadow-xl"
            >
              <Star className="w-6 h-6" />
              {language === "bs" ? "Ostavite recenziju na Googleu" : "Bewertung auf Google abgeben"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
