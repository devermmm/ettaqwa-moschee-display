import { forwardRef } from "react";
import logo from "@/assets/logo.png";

const TarawihStory = forwardRef<HTMLDivElement>((_, ref) => {
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
      {/* Pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      {/* Decorative top arc */}
      <div style={{
        position: "absolute", top: "-25%", left: "50%", transform: "translateX(-50%)",
        width: "140%", aspectRatio: "1", borderRadius: "50%",
        border: "1px solid rgba(52,211,153,0.06)",
      }} />

      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
        padding: "8% 7%", textAlign: "center", color: "white", gap: "1.5cqi",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "13%", objectFit: "contain" }} />
        <p style={{
          fontSize: "2cqi", fontWeight: 500, letterSpacing: "0.22em",
          textTransform: "uppercase", opacity: 0.5, marginBottom: "2cqi",
        }}>
          Džemat Et-Taqwa · Wien
        </p>

        {/* Moon icon */}
        <div style={{
          fontSize: "8cqi", lineHeight: 1, marginBottom: "1cqi",
        }}>
          🌙
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: "7cqi", fontWeight: 800, lineHeight: 1.05,
          background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          TERAVIJA
        </h2>
        <p style={{ fontSize: "3cqi", fontWeight: 600, opacity: 0.45, letterSpacing: "0.12em" }}>
          TARAWIH-GEBET
        </p>

        {/* Divider */}
        <div style={{
          width: "14%", height: 2, margin: "1cqi 0",
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
        }} />

        {/* Time card */}
        <div style={{
          width: "80%", padding: "4% 5%", borderRadius: 16,
          background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(94,234,212,0.05))",
          border: "1px solid rgba(52,211,153,0.3)",
          marginTop: "1cqi",
        }}>
          <p style={{
            fontSize: "2.2cqi", opacity: 0.5, marginBottom: "1%",
            letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            Danas / Heute
          </p>
          <p style={{
            fontSize: "10cqi", fontWeight: 800, fontVariantNumeric: "tabular-nums",
            background: "linear-gradient(90deg, #34d399, #6ee7b7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}>
            20:00
          </p>
        </div>

        {/* Info */}
        <p style={{
          fontSize: "2.8cqi", lineHeight: 1.6, opacity: 0.6,
          maxWidth: "85%", marginTop: "2cqi",
        }}>
          Pozivamo vas na teraviju namaz u našem džematu.
        </p>
        <p style={{
          fontSize: "2.5cqi", lineHeight: 1.6, opacity: 0.4,
          maxWidth: "85%",
        }}>
          Wir laden euch herzlich zum Tarawih-Gebet in unserer Moschee ein.
        </p>

        {/* Verse */}
        <div style={{
          width: "88%", marginTop: "2cqi",
          padding: "3% 5%", borderRadius: 14,
          background: "rgba(52,211,153,0.04)",
          border: "1px solid rgba(52,211,153,0.1)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8cqi",
        }}>
          <p style={{
            fontSize: "2.5cqi", lineHeight: 1.5, fontStyle: "italic",
            opacity: 0.6, fontWeight: 500,
          }}>
            „Ko klanja teraviju iz imana i nadajući se nagradi, bit će mu oprošteni prethodni grijesi."
          </p>
          <p style={{
            fontSize: "2.2cqi", lineHeight: 1.5, opacity: 0.35,
          }}>
            „Wer das Tarawih-Gebet aus Glauben und Hoffnung auf Belohnung verrichtet, dem werden seine vorherigen Sünden vergeben."
          </p>
          <p style={{
            fontSize: "1.8cqi", opacity: 0.3, fontWeight: 600, letterSpacing: "0.05em",
          }}>
            Sahih Bukhari & Muslim
          </p>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <p style={{ fontSize: "1.8cqi", opacity: 0.3, margin: 0 }}>
          📍 Voitgasse 21 · 1220 Wien
        </p>
        <p style={{ fontSize: "2cqi", fontWeight: 600, opacity: 0.35, margin: 0 }}>
          @dzemat_et_taqwa
        </p>
      </div>
    </div>
  );
});

TarawihStory.displayName = "TarawihStory";

export default TarawihStory;
