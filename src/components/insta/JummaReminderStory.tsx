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
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
        padding: "8% 7%", textAlign: "center", color: "white", gap: "1.8cqi",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "13%", objectFit: "contain" }} />
        <p style={{
          fontSize: "2cqi", fontWeight: 500, letterSpacing: "0.22em",
          textTransform: "uppercase", opacity: 0.5, marginBottom: "1.5cqi",
        }}>
          Džemat Et-Taqwa
        </p>

        {/* Title */}
        <h3 style={{
          fontSize: "5cqi", fontWeight: 800, lineHeight: 1.05,
          background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginTop: "0.5cqi",
        }}>
          DŽUMA-NAMAZ
        </h3>
        <p style={{ fontSize: "2.5cqi", fontWeight: 600, opacity: 0.45 }}>
          FREITAGSGEBET
        </p>

        {/* Divider */}
        <div style={{
          width: "14%", height: 2,
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
        }} />

        {/* Times */}
        <div style={{ width: "84%", display: "flex", flexDirection: "column", gap: "2cqi" }}>
          <div style={{
            padding: "3% 5%", borderRadius: 16,
            background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(94,234,212,0.05))",
            border: "1px solid rgba(52,211,153,0.3)",
          }}>
            <p style={{ fontSize: "2cqi", opacity: 0.5, marginBottom: "0.5%", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              1. Termin · Hutba
            </p>
            <p style={{
              fontSize: "6.5cqi", fontWeight: 800, fontVariantNumeric: "tabular-nums",
              background: "linear-gradient(90deg, #34d399, #6ee7b7)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}>
              12:15
            </p>
          </div>

          <div style={{
            padding: "3% 5%", borderRadius: 16,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <p style={{ fontSize: "2cqi", opacity: 0.5, marginBottom: "0.5%", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              2. Termin · Hutba
            </p>
            <p style={{
              fontSize: "6.5cqi", fontWeight: 800, fontVariantNumeric: "tabular-nums",
              lineHeight: 1, opacity: 0.85,
            }}>
              13:00
            </p>
          </div>
        </div>

        {/* Verse */}
        <p style={{
          fontSize: "3cqi", fontFamily: "'Amiri', serif", lineHeight: 1.5,
          maxWidth: "88%", direction: "rtl", opacity: 0.6, marginTop: "1cqi",
        }}>
          إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ
        </p>
        <p style={{ fontSize: "2.2cqi", lineHeight: 1.4, opacity: 0.45, fontStyle: "italic", maxWidth: "82%" }}>
          Kada se u petak pozove na namaz, požurite Allaha spominjati.
        </p>
        <p style={{ fontSize: "1.8cqi", opacity: 0.3 }}>
          Al-Jumu'ah 62:9
        </p>

        {/* Footer */}
        <div style={{ marginTop: "1cqi" }}>
          <p style={{ fontSize: "1.8cqi", opacity: 0.3, letterSpacing: "0.09em" }}>
            📍 Voitgasse 21 · 1220 Wien
          </p>
          <p style={{ fontSize: "2cqi", fontWeight: 600, opacity: 0.35, marginTop: "0.4cqi" }}>
            @dzemat_et_taqwa
          </p>
        </div>
      </div>
    </div>
  );
});

JummaReminderStory.displayName = "JummaReminderStory";

export default JummaReminderStory;
