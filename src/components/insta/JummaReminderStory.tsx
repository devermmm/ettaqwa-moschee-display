import { forwardRef } from "react";
import logo from "@/assets/logo.png";
import jummaBg from "@/assets/jumma-bg.jpg";

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
      }}
    >
      {/* Background */}
      <img src={jummaBg} alt="" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(0,20,10,0.6) 0%, rgba(0,15,8,0.75) 40%, rgba(0,10,5,0.92) 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
        padding: "8% 7%", textAlign: "center", color: "white",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "14%", objectFit: "contain", marginBottom: "3%" }} />

        <p style={{
          fontSize: "2.2cqi", fontWeight: 500, letterSpacing: "0.25em",
          textTransform: "uppercase", opacity: 0.5, marginBottom: "5%",
        }}>
          Džemat Et-Taqwa · Wien
        </p>

        {/* Arabic Title */}
        <h2 style={{
          fontSize: "7cqi", fontWeight: 700, marginBottom: "2%",
          fontFamily: "'Amiri', 'Times New Roman', serif",
          lineHeight: 1.3,
        }}>
          صَلَاةُ الْجُمُعَة
        </h2>

        {/* Title */}
        <h3 style={{
          fontSize: "5.5cqi", fontWeight: 800, lineHeight: 1.1, marginBottom: "1%",
          letterSpacing: "0.03em",
        }}>
          DŽUMA-NAMAZ
        </h3>
        <h3 style={{
          fontSize: "4cqi", fontWeight: 600, lineHeight: 1.1, marginBottom: "5%",
          opacity: 0.6,
        }}>
          FREITAGSGEBET
        </h3>

        {/* Divider */}
        <div style={{
          width: "20%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent)",
          marginBottom: "5%",
        }} />

        {/* Two prayer times */}
        <div style={{ width: "85%", display: "flex", flexDirection: "column", gap: "3cqi", marginBottom: "5%" }}>
          {/* Termin 1 */}
          <div style={{
            padding: "4% 5%", borderRadius: 16,
            background: "linear-gradient(135deg, rgba(234,179,8,0.12), rgba(234,179,8,0.04))",
            border: "1px solid rgba(234,179,8,0.25)",
          }}>
            <p style={{ fontSize: "2.5cqi", opacity: 0.5, marginBottom: "1.5%", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              1. Termin · 1. Termin
            </p>
            <p style={{ fontSize: "2.2cqi", opacity: 0.45, marginBottom: "2%" }}>
              Hutba / Khutba
            </p>
            <p style={{
              fontSize: "6cqi", fontWeight: 800, fontVariantNumeric: "tabular-nums",
              background: "linear-gradient(90deg, #eab308, #fbbf24)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
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
            <p style={{ fontSize: "2.5cqi", opacity: 0.5, marginBottom: "1.5%", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              2. Termin · 2. Termin
            </p>
            <p style={{ fontSize: "2.2cqi", opacity: 0.45, marginBottom: "2%" }}>
              Hutba / Khutba
            </p>
            <p style={{
              fontSize: "6cqi", fontWeight: 800, fontVariantNumeric: "tabular-nums",
              opacity: 0.9,
            }}>
              13:00
            </p>
          </div>
        </div>

        {/* Quran Verse */}
        <div style={{
          width: "88%", padding: "4% 5%", borderRadius: 12,
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "4%",
        }}>
          <p style={{
            fontSize: "3.5cqi", fontFamily: "'Amiri', serif", lineHeight: 1.6,
            marginBottom: "2%", direction: "rtl",
          }}>
            يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ
          </p>
          <p style={{ fontSize: "2.2cqi", lineHeight: 1.5, opacity: 0.55, fontStyle: "italic", marginBottom: "1.5%" }}>
            O vi koji vjerujete, kada se u petak pozove na namaz, požurite Allaha spominjati.
          </p>
          <p style={{ fontSize: "2cqi", lineHeight: 1.5, opacity: 0.4 }}>
            O ihr, die ihr glaubt! Wenn zum Freitagsgebet gerufen wird, so eilt zum Gedenken Allahs.
          </p>
          <p style={{ fontSize: "1.8cqi", opacity: 0.3, marginTop: "2%" }}>
            Al-Jumu'ah 62:9
          </p>
        </div>

        {/* Location */}
        <p style={{ fontSize: "2.2cqi", opacity: 0.3, marginBottom: "1%" }}>
          📍 Voitgasse 21, 1220 Wien
        </p>
        <p style={{ fontSize: "2.5cqi", fontWeight: 600, opacity: 0.35 }}>
          @dzemat_et_taqwa
        </p>
      </div>
    </div>
  );
});

JummaReminderStory.displayName = "JummaReminderStory";

export default JummaReminderStory;
