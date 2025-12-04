import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "bs" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("bs");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "bs" || savedLanguage === "de")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, any> = {
  bs: {
    nav: {
      home: "Početna",
      prayerTimes: "Namaz vremena",
      about: "O nama",
      projects: "Projekti",
      courses: "Kursevi"
    },
    home: {
      welcome: "DOBRODOŠLI",
      mosque: "ET-TAQWA DŽAMIJA",
      viewPrayerTimes: "Pogledaj vremena namaza",
      offers: "Naša ponuda",
      offersDesc: "Otkrijte našu raznoliku ponudu i usluge za zajednicu",
      prayerTimesTitle: "Namaz vremena",
      prayerTimesDesc: "Trenutna vremena namaza za Beč sa živim odbrojavanjem do sljedećeg namaza i punim ekranom za džamiju",
      contactTitle: "Kontakt i dolazak",
      contactDesc: "Posjetite nas u Et-Taqwa džamiji u Beču. Radujemo se vašoj posjeti",
      learnMore: "Saznaj više",
      visitUs: "Posjetite nas",
      address: "Adresa",
      navigation: "Navigacija i pogledi",
      openInGoogleMaps: "Otvori u Google Maps",
      openInAppleMaps: "Otvori u Apple Maps",
      view360: "360° Pogled",
      blessing: "اللهم بارك لنا",
      blessingTranslation: "Allah nas sve blagoslovio"
    },
    prayerTimes: {
      fullscreen: "Cjelokupni ekran",
      exitFullscreen: "Izlaz iz cijelog ekrana",
      mosque: "Bosanska džamija ET TAQWA",
      location: "Beč, Austrija",
      today: "Danas",
      nextPrayer: "Sljedeći",
      timeRemaining: "Vrijeme preostalo",
      fajr: "Zora",
      sunrise: "Izlazak sunca",
      dhuhr: "Podne",
      jummah: "Džuma",
      asr: "Ikindija",
      maghrib: "Akšam",
      isha: "Jacija",
      passed: "Prije",
      inMinutes: "za {min} min",
      inHours: "za {h} sat",
      inHoursPlural: "za {h} sata",
      inHoursMinutes: "za {h}h {min}min",
      sabah: "Sabah",
      sunriseLabel: "Izlazak Sunca",
      podne: "Podne",
      ikindija: "Ikindija",
      aksam: "Akšam",
      jacija: "Jacija",
      dzuma1: "Džuma 1",
      dzuma2: "Džuma 2",
      dzumaLabel: "Džuma Termini",
      basmala: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم",
      basmalaTranslation: "U ime Allaha, Milostivog, Samilosnog"
    },
    about: {
      title: "O nama",
      welcomeTitle: "Dobrodošli u našu zajednicu",
      welcomeText1: "Bosanski kulturno udruženje El Taqwa sa sjedištem u Beču osnovano je s vizijom stvaranja mjesta gdje muslimani mogu prakticirati svoju vjeru u miru i zajedništvu.",
      welcomeText2: "Naša džamija služi ne samo kao mjesto molitve, već i kao centar za obrazovanje, kulturnu razmjenu i društvenu podršku. Ponosni smo što njegujemo okruženje u kojem se svi osjećaju dobrodošlo i cijenjeno.",
      everyoneTitle: "Svi su dobrodošli",
      everyoneText: "Naša džamija je otvorena za sve ljude, bez obzira na njihovo porijeklo. Vjerujemo u snagu zajednice i zajednički rad na izgradnji boljeg svijeta.",
      missionTitle: "Naša misija",
      missionText1: "Naša misija je jačanje vjere, pružanje podrške i promicanje obrazovanja. Kroz različite programe i aktivnosti nastojimo stvoriti svijest o islamskim vrijednostima i osnažiti našu zajednicu.",
      missionText2: "Također smo posvećeni društvenoj odgovornosti i zalaganju za mir, razumijevanje i suživot u multikulturanom društvu."
    },
    projects: {
      title: "Naši projekti i inicijative",
      subtitle: "Otkrijte kako aktivno doprinosimo zajednici",
      social: "Socijalni projekti",
      socialDesc: "Podržavamo potrebite u našoj zajednici kroz programe pomoći i socijalne inicijative",
      education: "Obrazovni programi",
      educationDesc: "Nudimo različite obrazovne programe za djecu i odrasle za promicanje znanja i razumijevanja",
      youth: "Omladinski rad",
      youthDesc: "Naš omladinski rad stvara sigurne prostore za mlade ljude da rastu i razvijaju se",
      islamic: "Islamski događaji",
      islamicDesc: "Redovno organizujemo islamske događaje, predavanja i proslave za jačanje zajednice",
      charity: "Humanitarni rad",
      charityDesc: "Aktivno učestvujemo u humanitarnim projektima i podržavamo potrebite širom svijeta",
      community: "Zajednica i kultura",
      communityDesc: "Promičemo kulturnu razmjenu i jačanje bošnjačkog identiteta kroz različite kulturne događaje",
      getInvolvedTitle: "Uključite se",
      getInvolvedDesc: "Radujemo se svakoj podršci i učešću u našim projektima i inicijativama",
      contactEmail: "Kontaktirajte nas putem e-pošte"
    },
    courses: {
      title: "Naši programi i kursevi",
      subtitle: "Otkrijte naše obrazovne ponude za sve uzraste",
      quranTitle: "Kur'anska škola",
      quranDesc: "Tradicionalna nastava učenja Kur'ana za djecu i odrasle, uključujući Tedžvid pravila",
      arabicTitle: "Arapski za početnike",
      arabicDesc: "Osnove arapskog jezika za bolje razumijevanje",
      islamicTitle: "Islamske studije",
      islamicDesc: "Produbite svoje znanje o islamskoj historiji i učenju",
      bosnianTitle: "Nastava bosanskog",
      bosnianDesc: "Čuvajte vezu sa svojim maternjim jezikom i kulturom",
      schedule: "Raspored",
      time: "Vrijeme",
      target: "Ciljna grupa",
      satSun: "Subota i nedjelja",
      afterPrayer: "Nakon namaza",
      kidsYouthAdults: "Djeca, omladina i odrasli",
      wednesday: "Srijeda",
      friday: "Petak",
      sunday: "Nedjelja",
      adults: "Odrasli",
      allAges: "Sve dobne skupine",
      kidsYouth: "Djeca i omladina",
      welcomeTitle: "Dobrodošli u Kur'ansku školu",
      welcomeText: "Dragi članovi džemata, pred nama je nova školska godina u Kur'anskoj školi - nova prilika za:",
      benefit1: "Ovladati Kur'anskom pismenošću",
      benefit2: "Naučiti pravilno čitati Kur'an",
      benefit3: "Usavršiti tedžvid i ljepotu kur'anskog učenja",
      benefit4: "Započeti ili nastaviti hafiska put",
      benefit5: "Zajedno rasti u znanju, vjeri i ibadetu",
      dontMiss: "Ne propustite još jednu priliku za učenje, rast i približavanje Allahu!",
      enrollmentOpen: "Upis u toku!",
      forMen: "Za muškarce:",
      forWomen: "Za žene:",
      mektebTitle: "Prijavite svoje dijete!",
      mektebText: "Dragi roditelji, mekteb je prvo mjesto nakon porodičnog okruženja gdje djeca uče o vjeri, ljubavi i poštovanju.",
      mektebEnrollment: "Upis:",
      mektebDate: "6. i 7. septembar 2025",
      mektebDays: "(Subota i nedjelja)",
      mektebTime: "Vrijeme:",
      mektebHours: "11:00 - 13:00",
      mektebBenefit: "U mektebu stiču znanje o islamu, nova prijateljstva i osjećaj pripadnosti zajednici.",
      mektebGift: "Prijavom svog djeteta u mekteb dajete mu najbolji poklon koji će ga pratiti cijeli život – znanje i odgoj u duhu islama.",
      mektebInvestment: "Mekteb – investicija u budućnost naše djece!",
      registrationTitle: "Registracija i informacije",
      registrationDesc: "Zainteresirani za naše kurseve? Kontaktirajte nas za više informacija",
      contactEmail: "Kontaktirajte nas putem e-pošte"
    },
    footer: {
      developed: "Razvio"
    }
  },
  de: {
    nav: {
      home: "Home",
      prayerTimes: "Gebetszeiten",
      about: "Über uns",
      projects: "Projekte",
      courses: "Kurse"
    },
    home: {
      welcome: "HERZLICH WILLKOMMEN",
      mosque: "ET-TAQWA MOSCHEE",
      viewPrayerTimes: "Gebetszeiten anzeigen",
      offers: "Unsere Angebote",
      offersDesc: "Entdecken Sie unsere vielfältigen Angebote und Services für die Gemeinde",
      prayerTimesTitle: "Gebetszeiten",
      prayerTimesDesc: "Aktuelle Gebetszeiten für Wien mit Live-Countdown zum nächsten Gebet und Vollbild-Modus für die Moschee",
      contactTitle: "Kontakt & Anfahrt",
      contactDesc: "Besuchen Sie uns in der Et-Taqwa Moschee Wien. Wir freuen uns auf Ihren Besuch",
      learnMore: "Mehr erfahren",
      visitUs: "Besuchen Sie uns",
      address: "Adresse",
      navigation: "Navigation & Ansichten",
      openInGoogleMaps: "In Google Maps öffnen",
      openInAppleMaps: "In Apple Maps öffnen",
      view360: "360° Ansicht",
      blessing: "اللهم بارك لنا",
      blessingTranslation: "Allah segne uns alle"
    },
    prayerTimes: {
      fullscreen: "Vollbildmodus",
      exitFullscreen: "Vollbild verlassen",
      mosque: "Bosnische Moschee ET TAQWA",
      location: "Wien, Österreich",
      today: "Heute",
      nextPrayer: "Nächstes",
      timeRemaining: "Zeit verbleibend",
      fajr: "Fajr",
      sunrise: "Sonnenaufgang",
      dhuhr: "Dhuhr",
      jummah: "Jummah",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
      passed: "Vorbei",
      inMinutes: "in {min} Min",
      inHours: "in {h} Std",
      inHoursPlural: "in {h} Std",
      inHoursMinutes: "in {h}h {min}min",
      sabah: "Fajr",
      sunriseLabel: "Sonnenaufgang",
      podne: "Dhuhr",
      ikindija: "Asr",
      aksam: "Maghrib",
      jacija: "Isha",
      dzuma1: "Jummah 1",
      dzuma2: "Jummah 2",
      dzumaLabel: "Freitagsgebet",
      basmala: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم",
      basmalaTranslation: "Im Namen Allahs, des Allerbarmers, des Barmherzigen"
    },
    about: {
      title: "Über Uns",
      welcomeTitle: "Willkommen in unserer Gemeinschaft",
      welcomeText1: "Der Bosniakische Kulturverein El Taqwa mit Sitz in Wien wurde mit der Vision gegründet, einen Ort zu schaffen, an dem Muslime ihren Glauben in Frieden und Gemeinschaft praktizieren können.",
      welcomeText2: "Unsere Moschee dient nicht nur als Gebetsort, sondern auch als Zentrum für Bildung, kulturellen Austausch und soziale Unterstützung. Wir sind stolz darauf, ein Umfeld zu pflegen, in dem sich alle willkommen und wertgeschätzt fühlen.",
      everyoneTitle: "Jeder ist willkommen",
      everyoneText: "Unsere Moschee steht allen Menschen offen, unabhängig von ihrer Herkunft. Wir glauben an die Kraft der Gemeinschaft und daran, gemeinsam an einer besseren Welt zu arbeiten.",
      missionTitle: "Unsere Mission",
      missionText1: "Unsere Mission ist es, den Glauben zu stärken, Unterstützung zu bieten und Bildung zu fördern. Durch verschiedene Programme und Aktivitäten streben wir danach, das Bewusstsein für islamische Werte zu schaffen und unsere Gemeinschaft zu stärken.",
      missionText2: "Wir sind auch der sozialen Verantwortung verpflichtet und setzen uns für Frieden, Verständnis und Zusammenleben in einer multikulturellen Gesellschaft ein."
    },
    projects: {
      title: "Unsere Projekte und Initiativen",
      subtitle: "Entdecken Sie, wie wir aktiv zur Gemeinschaft beitragen",
      social: "Soziale Projekte",
      socialDesc: "Wir unterstützen Bedürftige in unserer Gemeinschaft durch Hilfsprogramme und soziale Initiativen",
      education: "Bildungsprogramme",
      educationDesc: "Wir bieten verschiedene Bildungsprogramme für Kinder und Erwachsene zur Förderung von Wissen und Verständnis",
      youth: "Jugendarbeit",
      youthDesc: "Unsere Jugendarbeit schafft sichere Räume für junge Menschen zum Wachsen und Entwickeln",
      islamic: "Islamische Veranstaltungen",
      islamicDesc: "Wir organisieren regelmäßig islamische Veranstaltungen, Vorträge und Feiern zur Stärkung der Gemeinschaft",
      charity: "Wohltätigkeitsarbeit",
      charityDesc: "Wir beteiligen uns aktiv an Wohltätigkeitsprojekten und unterstützen Bedürftige weltweit",
      community: "Gemeinschaft und Kultur",
      communityDesc: "Wir fördern den kulturellen Austausch und die Stärkung der bosniakischen Identität durch verschiedene kulturelle Veranstaltungen",
      getInvolvedTitle: "Machen Sie mit",
      getInvolvedDesc: "Wir freuen uns über jede Unterstützung und Teilnahme an unseren Projekten und Initiativen",
      contactEmail: "Kontaktieren Sie uns per E-Mail"
    },
    courses: {
      title: "Unsere Programme und Kurse",
      subtitle: "Entdecken Sie unsere Bildungsangebote für alle Altersgruppen",
      quranTitle: "Quran-Schule",
      quranDesc: "Traditioneller Unterricht im Quran-Lernen für Kinder und Erwachsene, einschließlich Tajweed-Regeln",
      arabicTitle: "Arabisch für Anfänger",
      arabicDesc: "Grundlagen der arabischen Sprache für ein besseres Verständnis",
      islamicTitle: "Islamische Studien",
      islamicDesc: "Vertiefen Sie Ihr Wissen über islamische Geschichte und Lehre",
      bosnianTitle: "Bosnisch-Unterricht",
      bosnianDesc: "Bewahren Sie die Verbindung zu Ihrer Muttersprache und Kultur",
      schedule: "Termine",
      time: "Uhrzeit",
      target: "Zielgruppe",
      satSun: "Samstag & Sonntag",
      afterPrayer: "Nach den Gebetszeiten",
      kidsYouthAdults: "Kinder, Jugendliche & Erwachsene",
      wednesday: "Mittwoch",
      friday: "Freitag",
      sunday: "Sonntag",
      adults: "Erwachsene",
      allAges: "Alle Altersgruppen",
      kidsYouth: "Kinder & Jugendliche",
      welcomeTitle: "Willkommen in der Koranschule",
      welcomeText: "Liebe Gemeindemitglieder, vor uns liegt ein neues Schuljahr in der Koranschule - eine neue Gelegenheit zu:",
      benefit1: "Die Koranschrift beherrschen",
      benefit2: "Den Koran richtig lesen lernen",
      benefit3: "Tajweed und die Schönheit des Koranlesens perfektionieren",
      benefit4: "Den Weg des Auswendiglernens beginnen oder fortsetzen",
      benefit5: "Gemeinsam in Wissen, Glauben und Anbetung wachsen",
      dontMiss: "Verpassen Sie nicht noch eine Gelegenheit zum Lernen, Wachsen und sich Allah näherzukommen!",
      enrollmentOpen: "Die Einschreibung läuft!",
      forMen: "Für Männer:",
      forWomen: "Für Frauen:",
      mektebTitle: "Melden Sie Ihr Kind an!",
      mektebText: "Liebe Eltern, der Mekteb ist der erste Ort nach dem familiären Umfeld, wo Kinder über Glauben, Liebe und Respekt lernen.",
      mektebEnrollment: "Einschreibung:",
      mektebDate: "6. & 7. September 2025",
      mektebDays: "(Samstag & Sonntag)",
      mektebTime: "Uhrzeit:",
      mektebHours: "11:00 - 13:00 Uhr",
      mektebBenefit: "Im Mekteb erwerben sie Wissen über den Islam, neue Freundschaften und ein Gefühl der Zugehörigkeit zur Gemeinschaft.",
      mektebGift: "Indem Sie Ihr Kind im Mekteb anmelden, geben Sie ihm das beste Geschenk, das es ein Leben lang begleiten wird – Wissen und Erziehung im Geiste des Islam.",
      mektebInvestment: "Mekteb – Investition in die Zukunft unserer Kinder!",
      registrationTitle: "Anmeldung und Informationen",
      registrationDesc: "Interessiert an unseren Kursen? Kontaktieren Sie uns für weitere Informationen",
      contactEmail: "Kontaktieren Sie uns per E-Mail"
    },
    footer: {
      developed: "Entwickelt von"
    }
  }
};
