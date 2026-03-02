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
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%", height: "100%",
        padding: "10% 8%", textAlign: "center", color: "white",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "16%", objectFit: "contain", marginBottom: "3%" }} />

        <p style={{
          fontSize: "2.5cqi", fontWeight: 500, letterSpacing: "0.25em",
          textTransform: "uppercase", opacity: 0.5, marginBottom: "6%",
        }}>
          Džemat Et-Taqwa
        </p>

        {/* Arabic Title */}
        <h2 style={{
          fontSize: "7cqi", fontWeight: 700, marginBottom: "3%",
          fontFamily: "'Amiri', 'Times New Roman', serif",
          lineHeight: 1.3,
        }}>
          صَلَاةُ الْجُمُعَة
        </h2>

        {/* Title */}
        <h3 style={{
          fontSize: "6cqi", fontWeight: 800, lineHeight: 1.1, marginBottom: "1%",
          background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          DŽUMA-NAMAZ
        </h3>
        <h3 style={{
          fontSize: "3.5cqi", fontWeight: 600, lineHeight: 1.1, marginBottom: "6%",
          opacity: 0.5,
        }}>
          FREITAGSGEBET
        </h3>

        {/* Divider */}
        <div style={{
          width: "15%", height: 2,
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
          marginBottom: "6%",
        }} />

        {/* Two prayer times */}
        <div style={{ width: "85%", display: "flex", flexDirection: "column", gap: "3cqi", marginBottom: "6%" }}>
          {/* Termin 1 */}
          <div style={{
            padding: "4% 5%", borderRadius: 16,
            background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(94,234,212,0.05))",
            border: "1px solid rgba(52,211,153,0.3)",
          }}>
            <p style={{ fontSize: "2.5cqi", opacity: 0.5, marginBottom: "1.5%", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              1. Termin · Hutba
            </p>
            <p style={{
              fontSize: "8cqi", fontWeight: 800, fontVariantNumeric: "tabular-nums",
              background: "linear-gradient(90deg, #34d399, #6ee7b7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}>
              12:15
            </p>
          </div>

          {/* Termin 2 */}
          <div style={{
            padding: "4% 5%", borderRadius: 16,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <p style={{ fontSize: "2.5cqi", opacity: 0.5, marginBottom: "1.5%", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              2. Termin · Hutba
            </p>
            <p style={{
              fontSize: "8cqi", fontWeight: 800, fontVariantNumeric: "tabular-nums",
              lineHeight: 1, opacity: 0.85,
            }}>
              13:00
            </p>
          </div>
        </div>

        {/* Quran Verse */}
        <p style={{
          fontSize: "3cqi", fontFamily: "'Amiri', serif", lineHeight: 1.6,
          marginBottom: "2%", maxWidth: "90%", direction: "rtl",
        }}>
          يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ
        </p>
        <p style={{ fontSize: "2.2cqi", lineHeight: 1.5, opacity: 0.5, fontStyle: "italic", marginBottom: "1%", maxWidth: "85%" }}>
          O vi koji vjerujete, kada se u petak pozove na namaz, požurite Allaha spominjati.
        </p>
        <p style={{ fontSize: "1.8cqi", lineHeight: 1.5, opacity: 0.35, maxWidth: "85%", marginBottom: "1%" }}>
          Wenn zum Freitagsgebet gerufen wird, so eilt zum Gedenken Allahs.
        </p>
        <p style={{ fontSize: "1.6cqi", opacity: 0.25 }}>
          Al-Jumu'ah 62:9
        </p>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <p style={{ fontSize: "2cqi", opacity: 0.4, marginTop: "3%", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          📍 Voitgasse 21 · 1220 Wien
        </p>
        <p style={{ fontSize: "2.5cqi", fontWeight: 600, opacity: 0.35, marginTop: "1%" }}>
          @dzemat_et_taqwa
        </p>
      </div>
    </div>
  );
});

JummaReminderStory.displayName = "JummaReminderStory";

export default JummaReminderStory;
