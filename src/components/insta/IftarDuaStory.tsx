import { forwardRef } from "react";
import logo from "@/assets/logo.png";

const IftarDuaStory = forwardRef<HTMLDivElement>((_, ref) => {
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



        {/* Title */}
        <h2 style={{
          fontSize: "6cqi", fontWeight: 800, lineHeight: 1.05,
          background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          IFTAR DOVA
        </h2>
        <p style={{ fontSize: "3cqi", fontWeight: 600, opacity: 0.45, letterSpacing: "0.12em" }}>
          BITTGEBET ZUM FASTENBRECHEN
        </p>

        {/* Divider */}
        <div style={{
          width: "14%", height: 2, margin: "1cqi 0",
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
        }} />

        {/* Arabic Dua */}
        <div style={{
          width: "88%", padding: "4% 5%", borderRadius: 16,
          background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(94,234,212,0.05))",
          border: "1px solid rgba(52,211,153,0.3)",
          marginTop: "1cqi",
        }}>
          <p style={{
            fontSize: "5cqi", fontWeight: 700, lineHeight: 1.6,
            fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
            direction: "rtl",
            marginBottom: "2%",
          }}>
            ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ
          </p>
          <p style={{
            fontSize: "2.6cqi", fontWeight: 500, lineHeight: 1.5,
            opacity: 0.55, fontStyle: "italic", letterSpacing: "0.02em",
            marginTop: "2%",
          }}>
            Dhehebez-zama'u webtelletil-'urūqu we thebetel-edžru inšā'allāh
          </p>
        </div>

        {/* Bosnian */}
        <div style={{
          width: "88%", padding: "3% 5%", borderRadius: 14,
          background: "rgba(52,211,153,0.04)",
          border: "1px solid rgba(52,211,153,0.1)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8cqi",
        }}>
          <p style={{
            fontSize: "2.8cqi", lineHeight: 1.5, fontStyle: "italic",
            opacity: 0.7, fontWeight: 500,
          }}>
            „Žeđ je nestala, vene su se natopile i nagrada je potvrđena, ako Bog da."
          </p>
          <p style={{
            fontSize: "2.4cqi", lineHeight: 1.5, opacity: 0.4,
          }}>
            „Der Durst ist vergangen, die Adern haben sich befeuchtet und die Belohnung ist gewiss, so Gott will."
          </p>
          <p style={{
            fontSize: "1.8cqi", opacity: 0.3, fontWeight: 600, letterSpacing: "0.05em",
          }}>
            Sunen Ebu Davud
          </p>
        </div>

      </div>

      {/* Footer – absolute positioned */}
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

IftarDuaStory.displayName = "IftarDuaStory";

export default IftarDuaStory;
