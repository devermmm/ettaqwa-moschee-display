import { forwardRef } from "react";
import logo from "@/assets/logo.png";
import appIcon from "@/assets/app-icon.png";

const FEATURES = [
  { icon: "🕌", text: "Gebetszeiten / Vaktija" },
  { icon: "📖", text: "Quran & Hadith" },
  { icon: "📰", text: "Vijesti / Nachrichten" },
  { icon: "🔔", text: "Ezan Benachrichtigungen" },
  { icon: "🧭", text: "Qibla Kompass" },
  { icon: "📚", text: "Kursevi / Kurse" },
];

const AppAnnouncementStory = forwardRef<HTMLDivElement>((_, ref) => {
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
        background: "radial-gradient(ellipse at 50% 15%, #003d1f 0%, #001a0d 50%, #000d06 100%)",
      }}
    >
      {/* Pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      {/* Top arc */}
      <div style={{
        position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
        width: "150%", aspectRatio: "1", borderRadius: "50%",
        border: "1px solid rgba(52,211,153,0.06)",
      }} />

      {/* Bottom glow */}
      <div style={{
        position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)",
        width: "80%", aspectRatio: "1", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
      }} />

      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
        padding: "8% 7%", textAlign: "center", color: "white", gap: "1.2cqi",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "12%", objectFit: "contain" }} />
        <p style={{
          fontSize: "2cqi", fontWeight: 500, letterSpacing: "0.22em",
          textTransform: "uppercase", opacity: 0.45, marginBottom: "1cqi",
        }}>
          Džemat Et-Taqwa · Wien
        </p>

        {/* "Coming Soon" badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "1.5cqi",
          padding: "1.2% 5%", borderRadius: 50, marginBottom: "1cqi",
          background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(94,234,212,0.08))",
          border: "1px solid rgba(52,211,153,0.35)",
        }}>
          <span style={{ fontSize: "2.5cqi" }}>🚀</span>
          <span style={{
            fontSize: "2.5cqi", fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #34d399, #6ee7b7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            USKORO / BALD
          </span>
        </div>

        {/* App mockup */}
        <div style={{
          width: "28%", aspectRatio: "1", borderRadius: "22%",
          background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(0,61,31,0.6))",
          border: "2px solid rgba(52,211,153,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(52,211,153,0.1)",
          margin: "1.5cqi 0",
          overflow: "hidden",
        }}>
          <img src={appIcon} alt="App" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "22%" }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: "6cqi", fontWeight: 800, lineHeight: 1.05,
          background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          NAŠA APLIKACIJA
        </h2>
        <p style={{ fontSize: "3.5cqi", fontWeight: 700, opacity: 0.7, lineHeight: 1.1 }}>
          UNSERE OFFIZIELLE APP
        </p>

        {/* Divider */}
        <div style={{
          width: "14%", height: 2, margin: "0.8cqi 0",
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
        }} />

        {/* Features grid */}
        <div style={{
          width: "88%", display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "1.8cqi", marginTop: "0.5cqi",
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "2cqi",
              padding: "2.5% 4%", borderRadius: 10,
              background: i === 0
                ? "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))"
                : "rgba(255,255,255,0.03)",
              border: i === 0
                ? "1px solid rgba(52,211,153,0.25)"
                : "1px solid rgba(255,255,255,0.06)",
            }}>
              <span style={{ fontSize: "3cqi" }}>{f.icon}</span>
              <span style={{
                fontSize: "2.2cqi", fontWeight: 600,
                opacity: i === 0 ? 1 : 0.7, textAlign: "left", lineHeight: 1.25,
              }}>
                {f.text}
              </span>
            </div>
          ))}
        </div>

        {/* Store badges text */}
        <div style={{
          display: "flex", alignItems: "center", gap: "2cqi",
          marginTop: "2cqi",
        }}>
          <div style={{
            padding: "1.5% 4%", borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "2cqi", fontWeight: 600, opacity: 0.6,
            display: "flex", alignItems: "center", gap: "1cqi",
          }}>
            <span>🍎</span> App Store
          </div>
          <div style={{
            padding: "1.5% 4%", borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "2cqi", fontWeight: 600, opacity: 0.6,
            display: "flex", alignItems: "center", gap: "1cqi",
          }}>
            <span>▶️</span> Google Play
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <p style={{ fontSize: "2.5cqi", fontWeight: 600, opacity: 0.5, margin: 0 }}>
          Ostanite povezani · Bleibt verbunden
        </p>
        <p style={{ fontSize: "2cqi", fontWeight: 600, opacity: 0.3, margin: 0 }}>
          @dzemat_et_taqwa
        </p>
      </div>
    </div>
  );
});

AppAnnouncementStory.displayName = "AppAnnouncementStory";

export default AppAnnouncementStory;
