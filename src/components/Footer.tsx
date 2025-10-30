import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
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
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <p>+43 XXX XXXXXXX</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <p>info@moschee.at</p>
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

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bosniakischer Kulturverein El Taqwa. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
