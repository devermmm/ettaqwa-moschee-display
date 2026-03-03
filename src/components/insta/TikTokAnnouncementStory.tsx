import { forwardRef } from "react";
import logo from "@/assets/logo.png";

const TIKTOK_ICON = (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
  </svg>
);

const TikTokAnnouncementStory = forwardRef<HTMLDivElement>((_, ref) => {
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

      {/* Decorative arc */}
      <div style={{
        position: "absolute", top: "-25%", left: "50%", transform: "translateX(-50%)",
        width: "140%", aspectRatio: "1", borderRadius: "50%",
        border: "1px solid rgba(52,211,153,0.06)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
        padding: "10% 8%", textAlign: "center", color: "white",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "16%", objectFit: "contain", marginBottom: "4%" }} />

        <p style={{
          fontSize: "2.5cqi", fontWeight: 500, letterSpacing: "0.22em",
          textTransform: "uppercase", opacity: 0.5, marginBottom: "6cqi",
        }}>
          Džemat Et-Taqwa · Wien
        </p>

        {/* TikTok Icon large */}
        <div style={{
          width: "18%", aspectRatio: "1", marginBottom: "4%",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(94,234,212,0.05))",
          border: "1px solid rgba(52,211,153,0.25)",
          fontSize: "8cqi",
        }}>
          {TIKTOK_ICON}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: "6.5cqi", fontWeight: 800, lineHeight: 1.05, marginBottom: "1%",
          letterSpacing: "-0.02em",
        }}>
          WIR SIND JETZT
        </h2>
        <h2 style={{
          fontSize: "6.5cqi", fontWeight: 800, lineHeight: 1.05, marginBottom: "4%",
          background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          AUF TIKTOK!
        </h2>

        {/* Divider */}
        <div style={{
          width: "14%", height: 2, marginBottom: "4%",
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
        }} />

        {/* Bosnian */}
        <h3 style={{
          fontSize: "5cqi", fontWeight: 700, lineHeight: 1.15, marginBottom: "1%", opacity: 0.85,
        }}>
          SADA SMO I
        </h3>
        <h3 style={{
          fontSize: "5cqi", fontWeight: 700, lineHeight: 1.15, marginBottom: "5%",
          background: "linear-gradient(90deg, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          NA TIKTOKU!
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "3cqi", lineHeight: 1.5, opacity: 0.6, marginBottom: "6%", maxWidth: "85%",
        }}>
          Folgt uns für kurze Videos & Einblicke
          <br />
          Pratite nas za kratke video sadržaje
        </p>

        {/* Profile button – designed to look like a tappable link sticker */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: "2cqi",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "2.5cqi",
            padding: "2.5% 7%", borderRadius: 50,
            background: "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(94,234,212,0.12))",
            border: "1.5px solid rgba(52,211,153,0.4)",
            fontSize: "4.5cqi", fontWeight: 800,
            boxShadow: "0 0 30px rgba(52,211,153,0.15)",
          }}>
            {TIKTOK_ICON}
            @ET.TAQWA
          </div>

          {/* Swipe-up hint arrow */}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5cqi",
            opacity: 0.4, marginTop: "1cqi",
          }}>
            <svg width="3cqi" height="3cqi" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "4cqi", height: "4cqi" }}>
              <polyline points="18 15 12 9 6 15" />
            </svg>
            <span style={{ fontSize: "2cqi", fontWeight: 600, letterSpacing: "0.1em" }}>
              PROFIL BESUCHEN
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: "3%", left: 0, right: 0, zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3cqi",
      }}>
        <p style={{ fontSize: "1.8cqi", opacity: 0.3, margin: 0, color: "white" }}>
          Voitgasse 21 · 1220 Wien
        </p>
        <p style={{ fontSize: "2cqi", fontWeight: 600, opacity: 0.35, margin: 0, color: "white" }}>
          @dzemat_et_taqwa
        </p>
      </div>
    </div>
  );
});

TikTokAnnouncementStory.displayName = "TikTokAnnouncementStory";

export default TikTokAnnouncementStory;
