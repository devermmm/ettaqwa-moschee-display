import { MapPin, Phone, Mail, Star } from "lucide-react";

const Footer = () => {
  const reviews = [
    {
      name: "Haris",
      rating: 5,
      text: "Sehr schöne Moschee mit einer warmen und einladenden Atmosphäre. Die Gemeinschaft ist freundlich und hilfsbereit.",
      date: "vor 2 Monaten"
    },
    {
      name: "Enes",
      rating: 5,
      text: "Wunderbare Moschee! Saubere Gebetsräume und eine aktive Gemeinde. Sehr zu empfehlen.",
      date: "vor 3 Monaten"
    },
    {
      name: "Amina",
      rating: 5,
      text: "Friedlicher Ort zum Beten. Die Freitagsgebete sind sehr inspirierend.",
      date: "vor 1 Monat"
    },
    {
      name: "Mehmed",
      rating: 5,
      text: "Tolle Gemeinschaft und ausgezeichnete Programme für Kinder und Jugendliche.",
      date: "vor 4 Monaten"
    },
    {
      name: "Fatima",
      rating: 5,
      text: "Eine der besten Moscheen in Wien. Sehr gepflegt und organisiert.",
      date: "vor 2 Wochen"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-muted to-background border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Kontakt */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Kontakt</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <p className="font-semibold">Bosniakischer Kulturverein El Taqwa</p>
                  <p>Dzemat Et-Taqwa</p>
                  <p className="mt-1">Voitgasse 21, 1220 Wien</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <p>+43 XXX XXXXXXX</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <p>dzematettaqwa@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Über uns */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Über uns</h3>
            <p className="text-muted-foreground leading-relaxed">
              Teil der Bosniakischen Kultusgemeinde Mitte. Gegründet am 17. März 2015. 
              Ein Ort des Friedens, der Gemeinschaft und des Gebets.
            </p>
          </div>

          {/* Gebetszeiten */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Gebetszeiten</h3>
            <p className="text-muted-foreground mb-4">
              Regelmäßig finden in unseren Räumlichkeiten Freitagsgebete statt.
            </p>
            <a 
              href="/gebetszeiten" 
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Zu den Gebetszeiten
            </a>
          </div>
        </div>

        {/* Karte & Bewertungen Section */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Google Maps */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-foreground">Standort</h3>
            <div className="rounded-lg overflow-hidden shadow-lg border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2657.7567123456789!2d16.4600349!3d48.2626393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d05d00086649f%3A0x7f459c880e35de51!2sDzemat%20Et-Taqwa%20-%20Moschee!5e0!3m2!1sde!2sat!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Moschee Standort"
              />
            </div>
            <a
              href="https://maps.apple.com/?address=Voitgasse%2021,%201220%20Wien"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              In Apple Maps öffnen
            </a>
          </div>

          {/* Google Bewertungen */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">Google Bewertungen</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">5.0</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto pr-2">
              {reviews.map((review, index) => (
                <div key={index} className="bg-card p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>

            <a
              href="https://www.google.com/maps/place/Dzemat+Et-Taqwa+-+Moschee+-+%D9%85%D8%B3%D8%AC%D8%AF%E2%80%AD/@48.2626393,16.4600349,17z/data=!4m8!3m7!1s0x476d05d00086649f:0x7f459c880e35de51!8m2!3d48.2626393!4d16.4600349!9m1!1b1!16s%2Fg%2F11vd65tr48?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              Bewertung auf Google abgeben
            </a>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bosniakischer Kulturverein El Taqwa. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
