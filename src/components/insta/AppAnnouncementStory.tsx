import { forwardRef } from "react";
import logo from "@/assets/logo.png";
import appIcon from "@/assets/app-icon.png";
import badgeAppStore from "@/assets/badge-appstore.svg";
import badgeGooglePlay from "@/assets/badge-googleplay.svg";

const FEATURES = [
  { icon: "🕌", text: "Gebetszeiten" },
  { icon: "📖", text: "Quran & Hadith" },
  { icon: "📰", text: "Vijesti" },
  { icon: "🔔", text: "Ezan" },
  { icon: "🧭", text: "Qibla" },
  { icon: "📚", text: "Kursevi" },
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
          textTransform: "uppercase", opacity: 0.45, marginBottom: "0.5cqi",
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

        {/* Phone mockup */}
        <div style={{
          position: "relative",
          width: "48%",
          aspectRatio: "9 / 16",
          borderRadius: "6cqi",
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          border: "3px solid rgba(255,255,255,0.15)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(52,211,153,0.08), inset 0 0 30px rgba(0,0,0,0.3)",
          overflow: "hidden",
          margin: "1cqi 0",
        }}>
          {/* Phone notch */}
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: "40%", height: "3.5%", borderRadius: "0 0 12px 12px",
            background: "rgba(0,0,0,0.8)", zIndex: 5,
          }} />
          {/* Screen content - app preview */}
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(180deg, #0a3d2a 0%, #001a0d 40%, #000d06 100%)",
            display: "flex", flexDirection: "column", alignItems: "center",
            padding: "12% 8% 6%", gap: "3%",
          }}>
            <img src={appIcon} alt="" style={{ width: "25%", borderRadius: "18%", marginBottom: "2%" }} />
            <div style={{ fontSize: "2.2cqi", fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>ET TAQWA</div>
            <div style={{ fontSize: "1.3cqi", opacity: 0.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>Gebetszeiten</div>
            
            {/* Mini prayer times */}
            {[
              { name: "Zora", time: "05:42" },
              { name: "Podne", time: "12:15" },
              { name: "Ikindija", time: "15:48" },
              { name: "Akšam", time: "18:12", highlight: true },
              { name: "Jacija", time: "19:35" },
            ].map((p, i) => (
              <div key={i} style={{
                width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "3% 5%", borderRadius: 8,
                background: p.highlight
                  ? "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.05))"
                  : "rgba(255,255,255,0.04)",
                border: p.highlight ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{ fontSize: "1.4cqi", fontWeight: 600, opacity: p.highlight ? 1 : 0.7 }}>{p.name}</span>
                <span style={{
                  fontSize: "1.6cqi", fontWeight: 700, fontVariantNumeric: "tabular-nums",
                  color: p.highlight ? "#6ee7b7" : "white",
                }}>{p.time}</span>
              </div>
            ))}
          </div>
          {/* Reflection */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: "5.5cqi", fontWeight: 800, lineHeight: 1.05,
          background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginTop: "0.5cqi",
        }}>
          NAŠA APLIKACIJA
        </h2>
        <p style={{ fontSize: "3cqi", fontWeight: 700, opacity: 0.65, lineHeight: 1.1 }}>
          UNSERE OFFIZIELLE APP
        </p>

        {/* Feature pills */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "1.2cqi", marginTop: "0.5cqi", maxWidth: "92%",
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "1cqi",
              padding: "1% 3%", borderRadius: 50,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "2cqi", fontWeight: 600, opacity: 0.7,
            }}>
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Store badges */}
        <div style={{
          display: "flex", alignItems: "center", gap: "2cqi",
          marginTop: "1.5cqi",
        }}>
          <img src={badgeAppStore} alt="App Store" style={{ height: "5.5cqi" }} />
          <img src={badgeGooglePlay} alt="Google Play" style={{ height: "5.5cqi" }} />
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
