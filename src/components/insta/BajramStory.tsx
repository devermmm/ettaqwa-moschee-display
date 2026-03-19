import { forwardRef } from "react";
import logo from "@/assets/logo.png";

const PROGRAM_ITEMS = [
  { time: "05:30", label: "Sabah namaz" },
  { time: "od Sabaha", label: "Učenje Kur'ana i ilahija u izvodbi Elnura Mujezinovića" },
  { time: "06:45", label: "Prvi termin Bajram namaza" },
  { time: "07:30", label: "Drugi termin Bajram namaza" },
];

const BajramStory = forwardRef<HTMLDivElement>((_, ref) => {
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
      {/* Subtle pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      {/* Decorative arc */}
      <div style={{
        position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
        width: "160%", aspectRatio: "1", borderRadius: "50%",
        border: "1px solid rgba(52,211,153,0.06)",
      }} />

      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%", height: "100%",
        padding: "8% 7%", textAlign: "center", color: "white",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "14%", objectFit: "contain", marginBottom: "2%" }} />

        {/* Mosque name */}
        <p style={{
          fontSize: "2.2cqi", fontWeight: 500, letterSpacing: "0.22em",
          textTransform: "uppercase", opacity: 0.45, marginBottom: "6%",
        }}>
          Džemat Et-Taqwa · Wien
        </p>

        {/* Title */}
        <h2 style={{
          fontSize: "7cqi", fontWeight: 800, lineHeight: 1.05, marginBottom: "0.5%",
          background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          BAJRAMSKI
        </h2>
        <h2 style={{
          fontSize: "7cqi", fontWeight: 800, lineHeight: 1.05, marginBottom: "1%",
          background: "linear-gradient(90deg, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          PROGRAM
        </h2>
        <p style={{ fontSize: "2.5cqi", fontWeight: 500, opacity: 0.35, letterSpacing: "0.12em", marginBottom: "5%" }}>
          EID-PROGRAMM
        </p>

        {/* Divider */}
        <div style={{
          width: "16%", height: 2, marginBottom: "5%",
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
        }} />

        {/* Schedule */}
        <div style={{
          width: "90%", display: "flex", flexDirection: "column", gap: "2cqi",
        }}>
          {PROGRAM_ITEMS.map(({ time, label }, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "3cqi",
              padding: "2.5% 4%", borderRadius: 12,
              background: i === 2
                ? "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))"
                : "rgba(255,255,255,0.03)",
              border: i === 2
                ? "1px solid rgba(52,211,153,0.25)"
                : "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{
                background: "linear-gradient(135deg, #0d9b6a, #34d399)",
                color: "white",
                fontSize: "2.8cqi", fontWeight: 700,
                padding: "1.2% 3.5%",
                borderRadius: 8,
                minWidth: "26%",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}>
                {time}
              </div>
              <span style={{
                fontSize: "2.8cqi", fontWeight: 500,
                opacity: i === 2 ? 1 : 0.75,
                textAlign: "left", lineHeight: 1.3, flex: 1,
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Greeting */}
        <div style={{
          width: "85%", padding: "3% 5%", borderRadius: 14,
          background: "rgba(52,211,153,0.06)",
          border: "1px solid rgba(52,211,153,0.12)",
          marginBottom: "4%",
        }}>
          <p style={{
            fontSize: "4cqi", fontWeight: 700, lineHeight: 1.2,
            background: "linear-gradient(90deg, #34d399, #6ee7b7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "1%",
          }}>
            Bajram Šerif Mubarek Olsun
          </p>
          <p style={{ fontSize: "2.5cqi", opacity: 0.4, fontWeight: 500 }}>
            Eid Mubarak
          </p>
        </div>

        {/* Date & Location */}
        <p style={{
          fontSize: "3cqi", fontWeight: 700, opacity: 0.8,
          marginBottom: "0.5%",
        }}>
          Petak, 20. Mart 2026
        </p>
        <p style={{ fontSize: "2cqi", opacity: 0.3, marginBottom: "1%" }}>
          Voitgasse 21 · 1220 Wien
        </p>
      </div>
    </div>
  );
});

BajramStory.displayName = "BajramStory";

export default BajramStory;
