import { forwardRef, useState } from "react";
import logo from "@/assets/logo.png";

const quranVerses = [
  {
    arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
    bosnian: "I sigurno će ti Gospodar tvoj dati, pa ćeš zadovoljan biti!",
    german: "Und dein Herr wird dir geben, und du wirst zufrieden sein.",
    reference: "Ad-Duha 93:5",
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    bosnian: "Zaista, uz teškoću je olakšanje!",
    german: "Wahrlich, mit der Erschwernis kommt die Erleichterung.",
    reference: "Ash-Sharh 94:6",
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    bosnian: "A onaj ko se u Allaha pouzdaje — pa Njemu je On dovoljan!",
    german: "Und wer auf Allah vertraut — der genügt ihm.",
    reference: "At-Talaq 65:3",
  },
  {
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    bosnian: "A, doista, u spominjanju Allaha srca se smiruju!",
    german: "Wahrlich, im Gedenken Allahs finden die Herzen Ruhe.",
    reference: "Ar-Ra'd 13:28",
  },
  {
    arabic: "ادْعُونِي أَسْتَجِبْ لَكُمْ",
    bosnian: "Molite Me, Ja ću vam se odazvati!",
    german: "Ruft Mich an, Ich werde euch erhören!",
    reference: "Ghafir 40:60",
  },
  {
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    bosnian: "On je s vama gdje god bili!",
    german: "Und Er ist mit euch, wo immer ihr auch seid.",
    reference: "Al-Hadid 57:4",
  },
  {
    arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ",
    bosnian: "A Mi smo mu bliži od žile kucavice!",
    german: "Und Wir sind ihm näher als seine Halsschlagader.",
    reference: "Qaf 50:16",
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    bosnian: "Sjećajte se vi Mene, i Ja ću se vas sjetiti!",
    german: "Gedenkt Meiner, so gedenke Ich eurer!",
    reference: "Al-Baqarah 2:152",
  },
];

interface QuranVersePostProps {
  verseIndex?: number;
}

const QuranVersePost = forwardRef<HTMLDivElement, QuranVersePostProps>(({ verseIndex = 0 }, ref) => {
  const verse = quranVerses[verseIndex];

  return (
    <div
      ref={ref}
      style={{
        width: "min(100%, 540px)",
        aspectRatio: "1 / 1",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        containerType: "inline-size",
        background: "radial-gradient(ellipse at 50% 30%, #0a2a1a 0%, #061510 40%, #030b08 80%, #000000 100%)",
      }}
    >
      {/* Subtle geometric pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(52,211,153,0.3) 1px, transparent 1px),
          radial-gradient(circle at 80% 80%, rgba(52,211,153,0.2) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px, 60px 60px",
      }} />

      {/* Top decorative arc */}
      <div style={{
        position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)",
        width: "140%", aspectRatio: "1", borderRadius: "50%",
        border: "1px solid rgba(52,211,153,0.06)",
      }} />

      {/* Bottom glow */}
      <div style={{
        position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)",
        width: "80%", aspectRatio: "1", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
        padding: "8% 8%", textAlign: "center", color: "white",
      }}>
        {/* Top: Logo + Name */}
        <div style={{
          display: "flex", alignItems: "center", gap: "2cqi", marginBottom: "3cqi",
        }}>
          <img src={logo} alt="Et-Taqwa" style={{ width: "5cqi", height: "5cqi", objectFit: "contain" }} />
          <p style={{
            fontSize: "1.8cqi", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", opacity: 0.4,
          }}>
            Džemat Et-Taqwa
          </p>
        </div>

        {/* Decorative top line */}
        <div style={{
          width: "20%", height: 1, marginBottom: "4cqi",
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.3), transparent)",
        }} />

        {/* Arabic verse */}
        <p style={{
          fontSize: "6.5cqi",
          fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
          lineHeight: 1.7,
          marginBottom: "3.5cqi",
          maxWidth: "90%",
          background: "linear-gradient(180deg, #ffffff 30%, rgba(52,211,153,0.85) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 400,
        }} dir="rtl">
          {verse.arabic}
        </p>

        {/* Decorative diamond */}
        <div style={{
          width: "2cqi", height: "2cqi", marginBottom: "3cqi",
          transform: "rotate(45deg)",
          border: "1px solid rgba(52,211,153,0.3)",
        }} />

        {/* Bosnian translation */}
        <p style={{
          fontSize: "3.2cqi", lineHeight: 1.55, fontWeight: 600,
          marginBottom: "1.5cqi", maxWidth: "85%",
          fontStyle: "italic",
          opacity: 0.9,
        }}>
          „{verse.bosnian}"
        </p>

        {/* German translation */}
        <p style={{
          fontSize: "2.6cqi", lineHeight: 1.5, fontWeight: 400,
          marginBottom: "2.5cqi", maxWidth: "85%",
          opacity: 0.5,
        }}>
          „{verse.german}"
        </p>

        {/* Reference */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "1cqi",
          padding: "1% 3.5%", borderRadius: 50,
          background: "rgba(52,211,153,0.08)",
          border: "1px solid rgba(52,211,153,0.15)",
          marginBottom: "3cqi",
        }}>
          <span style={{ fontSize: "1.5cqi", opacity: 0.3 }}>📖</span>
          <span style={{
            fontSize: "1.8cqi", fontWeight: 600, opacity: 0.5,
            letterSpacing: "0.05em",
          }}>
            {verse.reference}
          </span>
        </div>

        {/* Bottom handle */}
        <p style={{
          fontSize: "1.8cqi", fontWeight: 600, opacity: 0.3,
          letterSpacing: "0.08em",
        }}>
          @dzemat_et_taqwa
        </p>
      </div>
    </div>
  );
});

QuranVersePost.displayName = "QuranVersePost";

export { quranVerses };
export default QuranVersePost;
