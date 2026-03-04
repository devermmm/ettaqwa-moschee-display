import { forwardRef, useMemo } from "react";
import logo from "@/assets/logo.png";

export interface CountdownEvent {
  id: string;
  labelBs: string;
  labelDe: string;
  emoji: string;
  targetDate: Date;
}

const DEFAULT_EVENTS: CountdownEvent[] = [
  {
    id: "ramadan-2026",
    labelBs: "Ramazan 2026",
    labelDe: "Ramadan 2026",
    emoji: "🌙",
    targetDate: new Date("2026-02-18"),
  },
  {
    id: "eid-fitr-2026",
    labelBs: "Ramazanski Bajram 2026",
    labelDe: "Eid al-Fitr 2026",
    emoji: "🎉",
    targetDate: new Date("2026-03-20"),
  },
  {
    id: "eid-adha-2026",
    labelBs: "Kurban Bajram 2026",
    labelDe: "Eid al-Adha 2026",
    emoji: "🐑",
    targetDate: new Date("2026-05-27"),
  },
  {
    id: "jumma",
    labelBs: "Džuma-namaz",
    labelDe: "Freitagsgebet",
    emoji: "🕌",
    targetDate: getNextFriday(),
  },
];

function getNextFriday(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = (5 - day + 7) % 7 || 7;
  const friday = new Date(now);
  friday.setDate(now.getDate() + diff);
  friday.setHours(12, 0, 0, 0);
  return friday;
}

function getDaysUntil(target: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const t = new Date(target);
  t.setHours(0, 0, 0, 0);
  const diff = t.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

interface Props {
  event?: CountdownEvent;
}

export const countdownEvents = DEFAULT_EVENTS;

const CountdownStory = forwardRef<HTMLDivElement, Props>(({ event }, ref) => {
  const activeEvent = event || DEFAULT_EVENTS[0];
  const daysLeft = useMemo(() => getDaysUntil(activeEvent.targetDate), [activeEvent]);

  const digits = String(daysLeft).padStart(2, "0").split("");

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
        background: "radial-gradient(ellipse at 50% 25%, #003d1f 0%, #001a0d 55%, #000d06 100%)",
      }}
    >
      {/* Subtle pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />

      {/* Glow behind number */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
        width: "70%", aspectRatio: "1", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.08) 0%, transparent 70%)",
      }} />

      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
        padding: "10% 8%", textAlign: "center", color: "white",
      }}>
        {/* Logo */}
        <img src={logo} alt="Et-Taqwa" style={{ width: "12%", objectFit: "contain", marginBottom: "2%" }} />

        <p style={{
          fontSize: "2.2cqi", fontWeight: 500, letterSpacing: "0.25em",
          textTransform: "uppercase", opacity: 0.4, marginBottom: "6%",
        }}>
          Džemat Et-Taqwa · Wien
        </p>

        {/* Emoji */}
        <span style={{ fontSize: "10cqi", marginBottom: "3%" }}>{activeEvent.emoji}</span>

        {/* Event name BS */}
        <p style={{
          fontSize: "5.5cqi", fontWeight: 800, lineHeight: 1.15, marginBottom: "1%",
          letterSpacing: "-0.02em",
        }}>
          {activeEvent.labelBs.toUpperCase()}
        </p>

        {/* Event name DE */}
        <p style={{
          fontSize: "3.5cqi", fontWeight: 600, opacity: 0.5,
          fontStyle: "italic", marginBottom: "6%",
        }}>
          {activeEvent.labelDe}
        </p>

        {/* Divider */}
        <div style={{
          width: "20%", height: 1, marginBottom: "6%",
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)",
        }} />

        {/* Countdown number */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "2cqi", marginBottom: "2%" }}>
          {digits.map((d, i) => (
            <div key={i} style={{
              width: "14cqi", height: "18cqi",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 20,
              background: "linear-gradient(180deg, rgba(52,211,153,0.12) 0%, rgba(52,211,153,0.03) 100%)",
              border: "1px solid rgba(52,211,153,0.2)",
            }}>
              <span style={{
                fontSize: "14cqi", fontWeight: 900,
                background: "linear-gradient(180deg, #ffffff 30%, #34d399 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontVariantNumeric: "tabular-nums",
              }}>
                {d}
              </span>
            </div>
          ))}
        </div>

        {/* "Tage" label */}
        <p style={{
          fontSize: "4cqi", fontWeight: 700, marginBottom: "1%",
          letterSpacing: "0.15em", textTransform: "uppercase",
        }}>
          {daysLeft === 1 ? "DAN" : "DANA"}
        </p>
        <p style={{
          fontSize: "3cqi", fontWeight: 500, opacity: 0.45,
          fontStyle: "italic", marginBottom: "6%",
        }}>
          {daysLeft === 1 ? "Tag" : "Tage"}
        </p>

        {/* Motivational text */}
        <p style={{
          fontSize: "3cqi", fontWeight: 600, opacity: 0.6,
          lineHeight: 1.5, maxWidth: "85%", marginBottom: "2%",
        }}>
          {daysLeft === 0
            ? "Danas je dan! 🤲 Heute ist der Tag!"
            : daysLeft <= 7
            ? "Pripremite se! 🤲 Bereitet euch vor!"
            : "Brojimo dane zajedno ☝️ Wir zählen gemeinsam"}
        </p>

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

CountdownStory.displayName = "CountdownStory";

export default CountdownStory;
