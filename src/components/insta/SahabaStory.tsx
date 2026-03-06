import { forwardRef } from "react";
import logo from "@/assets/logo.png";

interface StorySlide {
  titleBs?: string;
  titleDe?: string;
  textBs: string;
  textDe: string;
  emoji?: string;
}

interface SahabaStoryData {
  id: string;
  titleBs: string;
  titleDe: string;
  emoji: string;
  lessonBs: string;
  lessonDe: string;
  slides: StorySlide[];
}

const stories: SahabaStoryData[] = [
  {
    id: "mashita",
    titleBs: "Frizerka faraonove kćerke",
    titleDe: "Die Friseurin der Pharaos-Tochter",
    emoji: "🔥",
    slides: [
      {
        textBs:
          "Frizerka faraonove kćerke je bila vjernica koja je skrivala svoj iman. Jednog dana, dok je češljala kosu faraonove kćerke, ispao joj je češalj iz ruke. Rekla je: 'Bismillah' (U ime Allaha). Kćerka je upitala: 'Misliš na mog oca?' Ona je odvažno odgovorila: 'Ne. Moj Gospodar i Gospodar tvog oca je Allah.'",
        textDe:
          "Die Friseurin der Pharaos-Tochter war eine Gläubige, die ihren Glauben verbarg. Eines Tages, als sie das Haar der Tochter kämmte, fiel ihr der Kamm aus der Hand. Sie sagte: 'Bismillah' (Im Namen Allahs). Die Tochter fragte: 'Meinst du meinen Vater?' Sie antwortete mutig: 'Nein. Mein Herr und der Herr deines Vaters ist Allah.'",
        emoji: "💇‍♀️",
      },
      {
        textBs:
          "Faraon je bio bijesan. Naredio je da se zagrije velika posuda od bakra sa kipućim uljem. Zatim je počeo bacati njenu djecu, jedno po jedno, pred njenim očima — kako bi je natjerao da se odrekne vjere. Ali ona je ostala čvrsta i nije popustila.",
        textDe:
          "Der Pharao war wütend. Er befahl, einen großen Kupferkessel mit kochendem Öl zu erhitzen. Dann ließ er ihre Kinder, eines nach dem anderen, vor ihren Augen hineinwerfen — um sie zum Abfall vom Glauben zu zwingen. Doch sie blieb standhaft und gab nicht nach.",
        emoji: "😢",
      },
      {
        textBs:
          "Njeno najmlađe dijete, beba, progovorilo je Allahovom voljom i reklo: 'Majko, strpi se, jer si ti na istini.' Zatim je i ona bačena. Poslanik ﷺ je rekao da je u noći Israa osjetio prekrasan miris i upitao Džibrila o njemu. Džibril je odgovorio: 'To je miris frizerke faraonove kćerke i njene djece.'",
        textDe:
          "Ihr jüngstes Kind, ein Säugling, sprach durch Allahs Willen und sagte: 'Mutter, sei geduldig, denn du bist auf der Wahrheit.' Dann wurde auch sie hineingeworfen. Der Prophet ﷺ sagte, dass er in der Nacht der Himmelfahrt (Isra) einen wunderschönen Duft wahrnahm und Dschibril danach fragte. Dschibril antwortete: 'Das ist der Duft der Friseurin der Pharaos-Tochter und ihrer Kinder.'",
        emoji: "🌹",
      },
    ],
    lessonBs:
      "Ova priča nas uči da je iman (vjera) vredniji od svega dunjalučkog. Istinska hrabrost nije u fizičkoj snazi, nego u čvrstoći srca pred iskušenjima. Kad čovjek stoji uz istinu, Allah mu daje snagu koju ne može zamisliti — čak i beba progovori. A nagrada kod Allaha je vječna i ljepša od svega što ovaj svijet nudi.",
    lessonDe:
      "Diese Geschichte lehrt uns, dass der Glaube (Iman) wertvoller ist als alles Weltliche. Wahre Tapferkeit liegt nicht in körperlicher Stärke, sondern in der Standhaftigkeit des Herzens angesichts von Prüfungen. Wenn ein Mensch zur Wahrheit steht, gibt Allah ihm Kraft, die er sich nicht vorstellen kann — sogar ein Säugling spricht. Und die Belohnung bei Allah ist ewig und schöner als alles, was diese Welt bieten kann.",
  },
  {
    id: "tamim-dajjal",
    titleBs: "Tamim ed-Dari i Dedžal na ostrvu",
    titleDe: "Tamim ad-Dari und der Dajjal auf der Insel",
    emoji: "🏝️",
    slides: [
      {
        textBs:
          "Tamim ed-Dari je ispričao Poslaniku ﷺ da je plovio morem sa grupom ljudi. Oluja ih je bacala trideset dana dok nisu pristali na nepoznato ostrvo. Tamo ih je dočekala dlakava zvijer — Džessasa — koja im je rekla: 'Idite do čovjeka u samostanu, on vas čeka.' Uplašili su se, jer su mislili da je to šejtan.",
        textDe:
          "Tamim ad-Dari erzählte dem Propheten ﷺ, dass er mit einer Gruppe auf dem Meer fuhr. Ein Sturm trieb sie dreißig Tage lang umher, bis sie auf einer unbekannten Insel landeten. Dort empfing sie ein haariges Tier — al-Dschassasa — das ihnen sagte: 'Geht zu dem Mann im Kloster, er wartet auf euch.' Sie hatten Angst, denn sie dachten, es sei ein Teufel.",
        emoji: "🌊",
      },
      {
        textBs:
          "Ušli su i zatekli ogromnog čovjeka, vezanog lancima. Upitao ih je: 'Šta rade palme Bejsana — još uvijek rađaju plodove?' Rekli su: 'Da.' Pitao je: 'A jezero Taberije — ima li još vode u njemu?' Rekli su: 'Da, puno je.' Pitao je: 'A izvor Zugara?' Rekli su: 'Da, teče.' Na svaki odgovor rekao je: 'Uskoro neće.'",
        textDe:
          "Sie betraten das Kloster und fanden einen riesigen Mann in Ketten. Er fragte: 'Was machen die Dattelpalmen von Baysan — tragen sie noch Früchte?' Sie sagten: 'Ja.' Er fragte: 'Und der See von Tabariyya — hat er noch Wasser?' Sie sagten: 'Ja, er ist voll.' Er fragte: 'Und die Quelle von Zugar?' Sie sagten: 'Ja, sie fließt.' Bei jeder Antwort sagte er: 'Bald wird es nicht mehr so sein.'",
        emoji: "⛓️",
      },
      {
        textBs:
          "Zatim je upitao: 'A šta je sa arapskim Poslanikom — je li se pojavio? Jesu li ga Arapi slijedili?' Rekli su: 'Da, pojavio se i Arapi su ga slijedili.' Rekao je: 'Bolje im je da ga slijede.' Zatim je rekao: 'Ja sam Mesih Dedžal. Uskoro će mi biti dozvoljeno da izađem, i proći ću svaku zemlju za četrdeset dana — osim Meke i Medine, jer su one za mene zabranjene.'",
        textDe:
          "Dann fragte er: 'Was ist mit dem arabischen Propheten — ist er erschienen? Folgen ihm die Araber?' Sie sagten: 'Ja, er ist erschienen und die Araber folgen ihm.' Er sagte: 'Es ist besser für sie, ihm zu folgen.' Dann sagte er: 'Ich bin der Masih ad-Dajjal. Bald wird es mir erlaubt sein, herauszukommen, und ich werde jedes Land in vierzig Tagen durchqueren — außer Mekka und Medina, denn die sind für mich verboten.'",
        emoji: "👁️",
      },
    ],
    lessonBs:
      "Ova priča, zabilježena u Sahih Muslimu, nas podsjeća da je fitna Dedžala stvarna i da se znakovi Sudnjeg dana postepeno ispunjavaju. Poslanik ﷺ nas je upozorio da se pripremimo jačanjem imana, učenjem prvih i posljednjih deset ajeta sure El-Kehf i traženjem utočišta kod Allaha od Dedžalove smutnje.",
    lessonDe:
      "Diese Geschichte, überliefert in Sahih Muslim, erinnert uns daran, dass die Prüfung des Dajjal real ist und sich die Zeichen des Jüngsten Tages nach und nach erfüllen. Der Prophet ﷺ hat uns gewarnt, uns vorzubereiten — durch die Stärkung des Glaubens, das Lesen der ersten und letzten zehn Verse der Sure al-Kahf und die Zuflucht bei Allah vor der Versuchung des Dajjal.",
  },
  {
    id: "bilal",
    titleBs: "Bilal ibn Rebah — glas islama",
    titleDe: "Bilal ibn Rabah — Die Stimme des Islam",
    emoji: "🕌",
    slides: [
      {
        textBs:
          "Bilal ibn Rebah je bio abesinski rob koji je prihvatio islam u najranijim danima. Njegov vlasnik, Umejje ibn Halef, bio je jedan od najžešćih neprijatelja islama. Kada je saznao da je Bilal postao musliman, podvrgnuo ga je strahovitim mukama — izvlačio ga na užareni pijesak Meke u najtoplijem dijelu dana i stavljao mu ogromne kamene gromade na prsa.",
        textDe:
          "Bilal ibn Rabah war ein abessinischer Sklave, der den Islam in seinen frühesten Tagen annahm. Sein Besitzer, Umayya ibn Khalaf, war einer der schlimmsten Feinde des Islam. Als er erfuhr, dass Bilal Muslim geworden war, unterzog er ihn schrecklicher Folter — er schleppte ihn auf den glühenden Sand Mekkas in der größten Hitze und legte ihm riesige Felsbrocken auf die Brust.",
        emoji: "🔥",
      },
      {
        textBs:
          "Dok je ležao pod kamenom na vrućem pijesku, Umejje mu je vikao: 'Odrekni se svog Boga!' Ali Bilal je ponavljao samo jednu riječ: 'Ehad! Ehad!' — 'Jedan! Jedan!' Nije popuštao, bez obzira na bol. Njegova vjera u Allaha Jednog bila je jača od svakog mučenja. Ebu Bekr es-Siddik je saznao za njegovu patnju i otkupio ga, oslobodivši ga ropstva.",
        textDe:
          "Während er unter dem Fels auf dem heißen Sand lag, schrie Umayya ihn an: 'Sage dich von deinem Gott los!' Doch Bilal wiederholte nur ein einziges Wort: 'Ahad! Ahad!' — 'Einer! Einer!' Er gab nicht nach, egal wie groß der Schmerz war. Sein Glaube an den Einen Allah war stärker als jede Folter. Abu Bakr as-Siddiq erfuhr von seinem Leiden und kaufte ihn frei.",
        emoji: "⛓️",
      },
      {
        textBs:
          "Nakon oslobođenja, Poslanik ﷺ je odabrao upravo Bilala za prvog mujezina u islamu. Njegov prekrasni glas je odzvanjao Medinom, pozivajući vjernike na namaz. Na dan oslobođenja Meke, Bilal se popeo na Kabu i učio ezan — isto on koji je bio mučen na tom istom mjestu. Kada je Poslanik ﷺ preselio, Bilal više nije mogao učiti ezan od tuge — osim jednom, kada su ga ashabi zamolili, i svi su plakali.",
        textDe:
          "Nach seiner Befreiung wählte der Prophet ﷺ ausgerechnet Bilal als ersten Muezzin im Islam. Seine wunderschöne Stimme hallte durch Medina und rief die Gläubigen zum Gebet. Am Tag der Eroberung Mekkas stieg Bilal auf die Kaaba und rief den Adhan — derselbe Mann, der an diesem Ort gefoltert worden war. Als der Prophet ﷺ starb, konnte Bilal vor Trauer den Adhan nicht mehr rufen — außer einmal, als die Gefährten ihn baten, und alle weinten.",
        emoji: "📢",
      },
    ],
    lessonBs:
      "Bilalova priča nas uči da pred Allahom nema razlike između ljudi po boji kože, porijeklu ili statusu — već samo po bogobojaznosti (takvi). Rob je postao jedan od najčasnijih ashaba. Njegova upornost pod mukama pokazuje da istinski iman ne poznaje kompromis. A Allahova nagrada dolazi — nekad na ovom, a sigurno na ahiretu.",
    lessonDe:
      "Bilals Geschichte lehrt uns, dass es vor Allah keinen Unterschied zwischen Menschen gibt — weder nach Hautfarbe, Herkunft noch Status — sondern nur nach Gottesfurcht (Taqwa). Ein Sklave wurde zu einem der ehrenwertesten Gefährten. Seine Standhaftigkeit unter Folter zeigt, dass wahrer Glaube keine Kompromisse kennt. Und Allahs Belohnung kommt — manchmal in diesem Leben, und gewiss im Jenseits.",
  },
];

export const sahabaStories = stories;
export const getSahabaSlideCount = (storyId: string) => {
  const story = stories.find((s) => s.id === storyId);
  return story ? story.slides.length + 2 : 0; // +1 title + 1 lesson
};

interface Props {
  storyId?: string;
  slideIndex: number;
}

const SahabaStory = forwardRef<HTMLDivElement, Props>(
  ({ storyId = "mashita", slideIndex }, ref) => {
    const story = stories.find((s) => s.id === storyId) || stories[0];
    const isTitleSlide = slideIndex === 0;
    const isLessonSlide = slideIndex === story.slides.length + 1;
    const contentSlide = isTitleSlide || isLessonSlide ? null : story.slides[slideIndex - 1];
    const totalContent = story.slides.length;

    const containerStyle: React.CSSProperties = {
      width: "min(100%, 540px)",
      aspectRatio: "9 / 16",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      containerType: "inline-size",
      background:
        "radial-gradient(ellipse at 50% 30%, #003d1f 0%, #001a0d 60%, #000d06 100%)",
    };

    const patternStyle: React.CSSProperties = {
      position: "absolute",
      inset: 0,
      opacity: 0.03,
      backgroundImage:
        "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
      backgroundSize: "30px 30px",
    };

    if (isTitleSlide) {
      return (
        <div ref={ref} style={containerStyle}>
          <div style={patternStyle} />
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              aspectRatio: "1",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              padding: "10% 8%",
              textAlign: "center",
              color: "white",
            }}
          >
            <img
              src={logo}
              alt="Et-Taqwa"
              style={{
                width: "12%",
                objectFit: "contain",
                marginBottom: "2%",
              }}
            />
            <p
              style={{
                fontSize: "2.2cqi",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                opacity: 0.4,
                marginBottom: "8%",
              }}
            >
              Džemat Et-Taqwa · Wien
            </p>

            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "2%",
                padding: "1.5% 5%",
                background:
                  "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(94,234,212,0.1))",
                borderRadius: 50,
                border: "1px solid rgba(52,211,153,0.3)",
                fontSize: "2.8cqi",
                fontWeight: 700,
                marginBottom: "6%",
                letterSpacing: "0.1em",
              }}
            >
              📖 ISLAMISCHE GESCHICHTE
            </div>

            <span style={{ fontSize: "12cqi", marginBottom: "4%" }}>
              {story.emoji}
            </span>

            <p
              style={{
                fontSize: "5.5cqi",
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: "2%",
                letterSpacing: "-0.02em",
              }}
            >
              {story.titleBs.toUpperCase()}
            </p>
            <p
              style={{
                fontSize: "3.8cqi",
                fontWeight: 600,
                opacity: 0.5,
                fontStyle: "italic",
                marginBottom: "6%",
              }}
            >
              {story.titleDe}
            </p>

            {/* Divider */}
            <div
              style={{
                width: "20%",
                height: 1,
                marginBottom: "6%",
                background:
                  "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)",
              }}
            />

            <p
              style={{
                fontSize: "3.5cqi",
                fontWeight: 600,
                opacity: 0.6,
                lineHeight: 1.5,
              }}
            >
              Swipe za priču →
            </p>
            <p
              style={{
                fontSize: "3cqi",
                fontWeight: 500,
                opacity: 0.35,
                fontStyle: "italic",
              }}
            >
              Wische für die Geschichte →
            </p>

            <p
              style={{
                position: "absolute",
                bottom: "3%",
                fontSize: "2.5cqi",
                opacity: 0.3,
                letterSpacing: "0.1em",
              }}
            >
              @dzemat_et_taqwa
            </p>
          </div>
        </div>
      );
    }

    if (isLessonSlide) {
      return (
        <div ref={ref} style={containerStyle}>
          <div style={patternStyle} />
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              aspectRatio: "1",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              padding: "8% 7%",
              textAlign: "center",
              color: "white",
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "2%",
                padding: "1.5% 5%",
                background: "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(94,234,212,0.1))",
                borderRadius: 50,
                border: "1px solid rgba(52,211,153,0.3)",
                fontSize: "2.8cqi",
                fontWeight: 700,
                marginBottom: "5%",
                letterSpacing: "0.1em",
              }}
            >
              💡 POUKA / LEKTION
            </div>

            <span style={{ fontSize: "10cqi", marginBottom: "4%" }}>📝</span>

            <p
              style={{
                fontSize: "4.5cqi",
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: "2%",
                background: "linear-gradient(135deg, #34d399, #5eead4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ŠTA UČIMO IZ OVE PRIČE?
            </p>
            <p
              style={{
                fontSize: "3.2cqi",
                fontWeight: 600,
                opacity: 0.45,
                fontStyle: "italic",
                marginBottom: "6%",
              }}
            >
              Was lernen wir aus dieser Geschichte?
            </p>

            {/* Divider */}
            <div
              style={{
                width: "15%",
                height: 1,
                marginBottom: "5%",
                background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)",
              }}
            />

            <p
              style={{
                fontSize: "3.3cqi",
                fontWeight: 600,
                lineHeight: 1.65,
                marginBottom: "5%",
                textAlign: "left",
                width: "100%",
              }}
            >
              {story.lessonBs}
            </p>

            <div
              style={{
                width: "10%",
                height: 1,
                marginBottom: "5%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              }}
            />

            <p
              style={{
                fontSize: "2.8cqi",
                fontWeight: 500,
                lineHeight: 1.55,
                opacity: 0.5,
                fontStyle: "italic",
                textAlign: "left",
                width: "100%",
              }}
            >
              {story.lessonDe}
            </p>

            <div style={{ flex: 1 }} />

            <p
              style={{
                fontSize: "2.5cqi",
                opacity: 0.3,
                letterSpacing: "0.1em",
              }}
            >
              @dzemat_et_taqwa
            </p>
          </div>
        </div>
      );
    }

    // Content slides
    return (
      <div ref={ref} style={containerStyle}>
        <div style={patternStyle} />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "8% 7%",
            textAlign: "center",
            color: "white",
          }}
        >
          {/* Part indicator */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2%",
              padding: "1.5% 5%",
              background:
                "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(94,234,212,0.1))",
              borderRadius: 50,
              border: "1px solid rgba(52,211,153,0.3)",
              fontSize: "2.8cqi",
              fontWeight: 700,
              marginBottom: "4%",
              letterSpacing: "0.1em",
            }}
          >
            {contentSlide?.emoji || "📖"} DIO {slideIndex} / {totalContent}
          </div>

          {/* Title small */}
          <p
            style={{
              fontSize: "3.2cqi",
              fontWeight: 700,
              opacity: 0.5,
              marginBottom: "6%",
              letterSpacing: "0.05em",
            }}
          >
            {story.titleBs}
          </p>

          {/* Divider */}
          <div
            style={{
              width: "15%",
              height: 1,
              marginBottom: "5%",
              background:
                "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)",
            }}
          />

          {/* BS text */}
          <p
            style={{
              fontSize: "3.5cqi",
              fontWeight: 600,
              lineHeight: 1.6,
              marginBottom: "5%",
              textAlign: "left",
              width: "100%",
            }}
          >
            {contentSlide?.textBs}
          </p>

          {/* Divider */}
          <div
            style={{
              width: "10%",
              height: 1,
              marginBottom: "5%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }}
          />

          {/* DE text */}
          <p
            style={{
              fontSize: "3cqi",
              fontWeight: 500,
              lineHeight: 1.55,
              opacity: 0.5,
              fontStyle: "italic",
              textAlign: "left",
              width: "100%",
            }}
          >
            {contentSlide?.textDe}
          </p>

          <div style={{ flex: 1 }} />

          {/* Progress dots */}
          <div
            style={{
              display: "flex",
              gap: "1.5cqi",
              marginBottom: "2%",
            }}
          >
            {story.slides.map((_, i) => (
              <div
                key={i}
                style={{
                  width: "2cqi",
                  height: "2cqi",
                  borderRadius: "50%",
                  background:
                    i === slideIndex - 1
                      ? "#34d399"
                      : "rgba(255,255,255,0.2)",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>

          <p
            style={{
              fontSize: "2.5cqi",
              opacity: 0.3,
              letterSpacing: "0.1em",
            }}
          >
            @dzemat_et_taqwa
          </p>
        </div>
      </div>
    );
  }
);

SahabaStory.displayName = "SahabaStory";

export default SahabaStory;
