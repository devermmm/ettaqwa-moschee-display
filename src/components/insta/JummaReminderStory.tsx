import { forwardRef } from "react";
import logo from "@/assets/logo.png";

const JummaReminderStory = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "min(100%, 540px)",
        aspectRatio: "9 / 16",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        containerType: "inline-size",
        background: "radial-gradient(ellipse at 50% 20%, #003d1f 0%, #001a0d 55%, #000d06 100%)",
      }}
    >
      {/* Subtle pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div style={{
        position: "relative",
        zIndex: 10,
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "7% 7% 6%",
        textAlign: "center",
        color: "white",
        rowGap: "2.2cqi",
      }}>
        {/* Top */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={logo} alt="Et-Taqwa" style={{ width: "13%", objectFit: "contain", marginBottom: "1.5%" }} />
          <p style={{
            fontSize: "2cqi",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.5,
          }}>
            Džemat Et-Taqwa
          </p>
        </div>

        {/* Middle */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <h2 style={{
            fontSize: "5.2cqi",
            fontWeight: 700,
            marginBottom: "1.6%",
            fontFamily: "'Amiri', 'Times New Roman', serif",
            lineHeight: 1.25,
          }}>
            صَلَاةُ الْجُمُعَة
          </h2>

          <h3 style={{
            fontSize: "4.9cqi",
            fontWeight: 800,
            lineHeight: 1.06,
            marginBottom: "0.2%",
            background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            DŽUMA-NAMAZ
          </h3>
          <p style={{ fontSize: "2.6cqi", fontWeight: 600, opacity: 0.45, marginBottom: "3%" }}>
            FREITAGSGEBET
          </p>

          <div style={{
            width: "14%",
            height: 2,
            marginBottom: "3.4%",
            background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
          }} />

          <div style={{ width: "84%", display: "flex", flexDirection: "column", gap: "2cqi" }}>
            <div style={{
              padding: "3.2% 5%",
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(94,234,212,0.05))",
              border: "1px solid rgba(52,211,153,0.3)",
            }}>
              <p style={{ fontSize: "2cqi", opacity: 0.5, marginBottom: "0.8%", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                1. Termin · Hutba
              </p>
              <p style={{
                fontSize: "6.2cqi",
                fontWeight: 800,
                fontVariantNumeric: "tabular-nums",
                background: "linear-gradient(90deg, #34d399, #6ee7b7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
              }}>
                12:15
              </p>
            </div>

            <div style={{
              padding: "3.2% 5%",
              borderRadius: 16,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <p style={{ fontSize: "2cqi", opacity: 0.5, marginBottom: "0.8%", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                2. Termin · Hutba
              </p>
              <p style={{
                fontSize: "6.2cqi",
                fontWeight: 800,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
                opacity: 0.85,
              }}>
                13:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p style={{
            fontSize: "2.1cqi",
            fontFamily: "'Amiri', serif",
            lineHeight: 1.45,
            marginBottom: "1.2%",
            maxWidth: "88%",
            direction: "rtl",
            opacity: 0.7,
          }}>
            إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ
          </p>
          <p style={{ fontSize: "1.5cqi", lineHeight: 1.35, opacity: 0.4, fontStyle: "italic", marginBottom: "0.6%", maxWidth: "82%" }}>
            Kada se u petak pozove na namaz, požurite Allaha spominjati.
          </p>
          <p style={{ fontSize: "1.3cqi", opacity: 0.25, marginBottom: "1.8%" }}>
            Al-Jumu'ah 62:9
          </p>

          <p style={{ fontSize: "1.8cqi", opacity: 0.3, letterSpacing: "0.09em" }}>
            📍 Voitgasse 21 · 1220 Wien
          </p>
          <p style={{ fontSize: "2cqi", fontWeight: 600, opacity: 0.35, marginTop: "0.6%" }}>
            @dzemat_et_taqwa
          </p>
        </div>
      </div>
    </div>
  );
});

JummaReminderStory.displayName = "JummaReminderStory";

export default JummaReminderStory;
