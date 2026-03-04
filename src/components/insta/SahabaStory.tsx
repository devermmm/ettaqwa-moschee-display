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
