import { forwardRef } from "react";
import logo from "@/assets/logo.png";

const PROGRAM_ITEMS = [
  { time: "05:30", label: "Sabah namaz" },
  { time: "od Sabaha", label: "Učenje Kur'ana i ilahija" },
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
        background: "linear-gradient(180deg, #f0f5f2 0%, #e8f0ec 40%, #dfe9e3 100%)",
      }}
    >
      {/* Subtle pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "radial-gradient(circle at 30% 70%, #0d7c5c 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%", height: "100%",
        padding: "10% 8%", textAlign: "center", color: "#1a3a2a",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "16%", objectFit: "contain", marginBottom: "1.5%" }} />

        {/* Mosque name */}
        <p style={{
          fontSize: "2.2cqi", fontWeight: 600, letterSpacing: "0.08em",
          color: "#0d7c5c", marginBottom: "6%",
        }}>
          @dzemat_et_taqwa
        </p>

        {/* Title */}
        <h2 style={{
          fontSize: "8cqi", fontWeight: 800, lineHeight: 1.05,
          color: "#1a3a2a", marginBottom: "1%",
          letterSpacing: "-0.02em",
        }}>
          Bajramski
        </h2>
        <h2 style={{
          fontSize: "8cqi", fontWeight: 800, lineHeight: 1.05,
          color: "#1a3a2a", marginBottom: "6%",
          letterSpacing: "-0.02em",
        }}>
          program
        </h2>

        {/* Schedule items */}
        <div style={{
          width: "92%", display: "flex", flexDirection: "column", gap: "2.5cqi",
          alignItems: "stretch",
        }}>
          {PROGRAM_ITEMS.map(({ time, label }, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "4cqi",
            }}>
              <div style={{
                background: "linear-gradient(135deg, #0d7c5c, #15a076)",
                color: "white",
                fontSize: "3cqi", fontWeight: 700,
                padding: "1.5% 4%",
                borderRadius: 10,
                minWidth: "28%",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}>
                {time}
              </div>
              <span style={{
                fontSize: "3cqi", fontWeight: 500,
                color: "#2d4a3a", textAlign: "left",
                lineHeight: 1.3,
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Greeting */}
        <p style={{
          fontSize: "4cqi", fontWeight: 700,
          color: "#0d7c5c", marginBottom: "2%",
          lineHeight: 1.2,
        }}>
          Bajram Šerif Mubarek Olsun
        </p>

        {/* Date & Location */}
        <p style={{
          fontSize: "3cqi", fontWeight: 700,
          color: "#1a3a2a", marginBottom: "0.5%",
        }}>
          Petak, 20. Mart 2026
        </p>
        <p style={{
          fontSize: "2.5cqi", fontWeight: 500,
          color: "#5a7a6a",
        }}>
          1220 WIEN, VOITGASSE 21
        </p>
      </div>
    </div>
  );
});

BajramStory.displayName = "BajramStory";

export default BajramStory;
