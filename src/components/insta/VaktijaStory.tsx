import { forwardRef } from "react";
import logo from "@/assets/logo.png";
import { getPrayerTimesForDate } from "@/data/prayerTimes2025";

const PRAYER_LABELS = [
  { key: "fajr", bs: "Zora", de: "Fajr", icon: "🌙" },
  { key: "sunrise", bs: "Izl. sunca", de: "Sunrise", icon: "🌅" },
  { key: "dhuhr", bs: "Podne", de: "Dhuhr", icon: "☀️" },
  { key: "asr", bs: "Ikindija", de: "Asr", icon: "🌤️" },
  { key: "maghrib", bs: "Akšam", de: "Maghrib", icon: "🌇" },
  { key: "isha", bs: "Jacija", de: "Isha", icon: "🌑" },
] as const;

const MONTHS_BS = [
  "Januar", "Februar", "Mart", "April", "Maj", "Juni",
  "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar",
];

const DAYS_BS = ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"];

const VaktijaStory = forwardRef<HTMLDivElement>((_, ref) => {
  const today = new Date();
  const times = getPrayerTimesForDate(today);
  const dayName = DAYS_BS[today.getDay()];
  const dateStr = `${today.getDate()}. ${MONTHS_BS[today.getMonth()]} ${today.getFullYear()}`;

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

      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", width: "100%", height: "100%",
        padding: "8% 7%", textAlign: "center", color: "white",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "14%", objectFit: "contain", marginBottom: "3%" }} />

        {/* Mosque name */}
        <p style={{
          fontSize: "2.5cqi", fontWeight: 500, letterSpacing: "0.25em",
          textTransform: "uppercase", opacity: 0.5, marginBottom: "5%",
        }}>
          Džemat Et-Taqwa · Wien
        </p>

        {/* Day & Date */}
        <h2 style={{
          fontSize: "5cqi", fontWeight: 800, lineHeight: 1.1, marginBottom: "1%",
          letterSpacing: "-0.02em",
        }}>
          {dayName.toUpperCase()}
        </h2>
        <p style={{
          fontSize: "3cqi", fontWeight: 500, opacity: 0.6, marginBottom: "6%",
        }}>
          {dateStr}
        </p>

        {/* Divider */}
        <div style={{
          width: "20%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)",
          marginBottom: "6%",
        }} />

        {/* Title */}
        <h3 style={{
          fontSize: "4.5cqi", fontWeight: 700, marginBottom: "1%",
          background: "linear-gradient(90deg, #34d399, #6ee7b7)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          VAKTIJA
        </h3>
        <p style={{ fontSize: "2.2cqi", opacity: 0.35, marginBottom: "5%", letterSpacing: "0.1em" }}>
          GEBETSZEITEN
        </p>

        {/* Prayer times list */}
        <div style={{
          width: "88%", display: "flex", flexDirection: "column", gap: "2.5cqi",
        }}>
          {PRAYER_LABELS.map(({ key, bs, icon }) => (
            <div key={key} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "3% 5%", borderRadius: 12,
              background: key === "maghrib"
                ? "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))"
                : "rgba(255,255,255,0.03)",
              border: key === "maghrib"
                ? "1px solid rgba(52,211,153,0.25)"
                : "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "3cqi" }}>
                <span style={{ fontSize: "3.5cqi" }}>{icon}</span>
                <span style={{
                  fontSize: "3.2cqi", fontWeight: 600,
                  opacity: key === "maghrib" ? 1 : 0.8,
                }}>
                  {bs}
                </span>
              </div>
              <span style={{
                fontSize: "4cqi", fontWeight: 700, fontVariantNumeric: "tabular-nums",
                color: key === "maghrib" ? "#6ee7b7" : "white",
              }}>
                {times[key]}
              </span>
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
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

VaktijaStory.displayName = "VaktijaStory";

export default VaktijaStory;
