import { forwardRef } from "react";
import logo from "@/assets/logo.png";

export interface QuranVerseData {
  arabic: string;
  bosnian: string;
  german: string;
  reference: string;
  caption: string;
}

const quranVerses: QuranVerseData[] = [
  // ── Trost & Hoffnung ──
  {
    arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
    bosnian: "I sigurno će ti Gospodar tvoj dati, pa ćeš zadovoljan biti!",
    german: "Und dein Herr wird dir geben, und du wirst zufrieden sein.",
    reference: "Ad-Duha 93:5",
    caption: `✨ „I sigurno će ti Gospodar tvoj dati, pa ćeš zadovoljan biti!"\n\nDein Herr wird dir geben, und du wirst zufrieden sein. 🤲\n\n#quran #islam #allah #dua #sabr #geduld #vertrauen #iman #islamzitate #bosnisch #deutsch #džemat #ettaqwa #wien #mosque #ayah #reminder #islamicreminder #muslimcommunity #quranverse`,
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    bosnian: "Zaista, uz teškoću je olakšanje!",
    german: "Wahrlich, mit der Erschwernis kommt die Erleichterung.",
    reference: "Ash-Sharh 94:6",
    caption: `💎 „Zaista, uz teškoću je olakšanje!"\n\nMit jeder Erschwernis kommt Erleichterung. Halte durch. 🌿\n\n#quran #islam #sabr #geduld #hoffnung #ashsharh #allah #deen #iman #islamzitate #bosnisch #deutsch #džemat #ettaqwa #wien #quranverse #islamicquotes #motivation #trost #muslime`,
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    bosnian: "A onaj ko se u Allaha pouzdaje — pa Njemu je On dovoljan!",
    german: "Und wer auf Allah vertraut — der genügt ihm.",
    reference: "At-Talaq 65:3",
    caption: `🤲 „Ko se u Allaha pouzdaje — Njemu je On dovoljan!"\n\nVertraue auf Allah – Er genügt dir. ☁️\n\n#tawakkul #vertrauen #allah #quran #islam #iman #deen #islamzitate #bosnisch #deutsch #ettaqwa #wien #džemat #islamicreminder #quranverse #glaube #muslimcommunity #faith`,
  },
  {
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    bosnian: "A, doista, u spominjanju Allaha srca se smiruju!",
    german: "Wahrlich, im Gedenken Allahs finden die Herzen Ruhe.",
    reference: "Ar-Ra'd 13:28",
    caption: `🕊️ „U spominjanju Allaha srca se smiruju!"\n\nIm Gedenken Allahs finden die Herzen Ruhe. 💚\n\n#dhikr #zikr #allah #quran #islam #innerfrieden #ruhe #herz #iman #islamzitate #bosnisch #deutsch #ettaqwa #wien #džemat #quranverse #islamicquotes #peace #seelenfrieden`,
  },
  {
    arabic: "ادْعُونِي أَسْتَجِبْ لَكُمْ",
    bosnian: "Molite Me, Ja ću vam se odazvati!",
    german: "Ruft Mich an, Ich werde euch erhören!",
    reference: "Ghafir 40:60",
    caption: `🌙 „Molite Me, Ja ću vam se odazvati!"\n\nRuft Mich an – Ich werde euch erhören! 🤲\n\n#dua #gebet #allah #quran #islam #bittgebet #erhörung #iman #islamzitate #bosnisch #deutsch #ettaqwa #wien #džemat #quranverse #islamicreminder #prayer #muslime`,
  },
  {
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    bosnian: "On je s vama gdje god bili!",
    german: "Und Er ist mit euch, wo immer ihr auch seid.",
    reference: "Al-Hadid 57:4",
    caption: `🌍 „On je s vama gdje god bili!"\n\nEr ist mit euch, wo immer ihr auch seid. 💫\n\n#allah #quran #islam #allahisnear #nähe #trost #iman #islamzitate #bosnisch #deutsch #ettaqwa #wien #džemat #quranverse #islamicquotes #glaube #reminder`,
  },
  {
    arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ",
    bosnian: "A Mi smo mu bliži od žile kucavice!",
    german: "Und Wir sind ihm näher als seine Halsschlagader.",
    reference: "Qaf 50:16",
    caption: `❤️ „Mi smo mu bliži od žile kucavice!"\n\nWir sind ihm näher als seine Halsschlagader. Allahu Akbar. 🥹\n\n#allah #quran #islam #nähe #liebe #iman #subhanallah #islamzitate #bosnisch #deutsch #ettaqwa #wien #džemat #quranverse #islamicreminder #emotional #herz`,
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    bosnian: "Sjećajte se vi Mene, i Ja ću se vas sjetiti!",
    german: "Gedenkt Meiner, so gedenke Ich eurer!",
    reference: "Al-Baqarah 2:152",
    caption: `🌿 „Sjećajte se vi Mene, i Ja ću se vas sjetiti!"\n\nGedenkt Meiner, so gedenke Ich eurer. 💚\n\n#dhikr #zikr #allah #quran #islam #gedenken #iman #deen #islamzitate #bosnisch #deutsch #ettaqwa #wien #džemat #quranverse #islamicquotes #reminder #muslimcommunity`,
  },

  // ── Angst einflößend / Akhirah / Warnung ──
  {
    arabic: "يَوْمَ تَرَوْنَهَا تَذْهَلُ كُلُّ مُرْضِعَةٍ عَمَّا أَرْضَعَتْ وَتَضَعُ كُلُّ ذَاتِ حَمْلٍ حَمْلَهَا وَتَرَى النَّاسَ سُكَارَىٰ وَمَا هُم بِسُكَارَىٰ وَلَٰكِنَّ عَذَابَ اللَّهِ شَدِيدٌ",
    bosnian: "Toga Dana ćete vidjeti kako je svaka dojilja ono što doji zaboravila, a svaka trudnica svoj plod pobacila — i vidjet ćeš ljude pijane, a oni neće pijani biti, nego će Allahova kazna strašna biti!",
    german: "An jenem Tag wird jede Stillende vergessen, was sie stillt, und jede Schwangere ihre Last abwerfen — du siehst die Menschen wie betrunken, doch sie sind nicht betrunken, aber Allahs Strafe ist gewaltig!",
    reference: "Al-Hajj 22:2",
    caption: `⚡ „Vidjet ćeš ljude pijane, a oni neće pijani biti, nego će Allahova kazna strašna biti!"\n\nDu siehst die Menschen wie betrunken — doch Allahs Strafe ist gewaltig. 😰\n\n#akhirah #jenseits #quran #islam #allah #angst #tawbah #reue #sudnjidan #tagdesjüngstengerichts #islamzitate #bosnisch #deutsch #ettaqwa #wien #warnung #islamicreminder #deen`,
  },
  {
    arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ",
    bosnian: "Svako živo biće će smrt okusiti! I tek na Sudnjem danu dobićete u potpunosti plaće vaše.",
    german: "Jede Seele wird den Tod kosten! Und erst am Tag der Auferstehung werdet ihr euren vollen Lohn erhalten.",
    reference: "Ali 'Imran 3:185",
    caption: `💀 „Svako živo biće će smrt okusiti!"\n\nJede Seele wird den Tod kosten. Bist du vorbereitet? 🕳️\n\n#tod #smrt #akhirah #quran #islam #allah #sudnjidan #vorbereitung #islamzitate #bosnisch #deutsch #ettaqwa #wien #quranverse #islamicreminder #deen #warnung #reue`,
  },
  {
    arabic: "أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَاكُمْ عَبَثًا وَأَنَّكُمْ إِلَيْنَا لَا تُرْجَعُونَ",
    bosnian: "Zar ste mislili da smo vas uzalud stvorili i da Nam se nećete vratiti?!",
    german: "Habt ihr etwa gedacht, dass Wir euch sinnlos erschaffen haben und dass ihr nicht zu Uns zurückgebracht werdet?!",
    reference: "Al-Mu'minun 23:115",
    caption: `🔥 „Zar ste mislili da smo vas uzalud stvorili?!"\n\nHabt ihr gedacht, dass Wir euch sinnlos erschaffen haben?! 😳\n\n#sinndeslebens #zweck #quran #islam #allah #akhirah #warnung #islamzitate #bosnisch #deutsch #ettaqwa #wien #quranverse #deen #tawbah #reue #islamicreminder`,
  },
  {
    arabic: "وَاتَّقُوا يَوْمًا تُرْجَعُونَ فِيهِ إِلَى اللَّهِ ۖ ثُمَّ تُوَفَّىٰ كُلُّ نَفْسٍ مَّا كَسَبَتْ وَهُمْ لَا يُظْلَمُونَ",
    bosnian: "I bojte se Dana u kojem ćete se Allahu vratiti — kada će svako dobiti ono što je zaslužio, i nikome neće nepravda učinjena biti!",
    german: "Und fürchtet den Tag, an dem ihr zu Allah zurückgebracht werdet — da wird jeder Seele vergolten, was sie erworben hat, und niemandem wird Unrecht getan!",
    reference: "Al-Baqarah 2:281",
    caption: `⚠️ „Bojte se Dana u kojem ćete se Allahu vratiti!"\n\nFürchtet den Tag, an dem ihr zu Allah zurückkehrt. Nikome neće nepravda učinjena biti. 😢\n\n#sudnjidan #quran #islam #allah #akhirah #warnung #tawbah #angst #islamzitate #bosnisch #deutsch #ettaqwa #wien #quranverse #islamicreminder #deen`,
  },
  {
    arabic: "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ ۚ إِنَّ زَلْزَلَةَ السَّاعَةِ شَيْءٌ عَظِيمٌ",
    bosnian: "O ljudi, bojte se Gospodara svoga! Zaista, potres Sudnjeg dana bit će nešto strašno!",
    german: "O ihr Menschen, fürchtet euren Herrn! Wahrlich, das Beben der Stunde ist etwas Gewaltiges!",
    reference: "Al-Hajj 22:1",
    caption: `🌋 „Zaista, potres Sudnjeg dana bit će nešto strašno!"\n\nDas Beben der Stunde ist etwas Gewaltiges! Fürchtet euren Herrn. 😱\n\n#sudnjidan #kijametskidan #quran #islam #allah #potres #angst #warnung #islamzitate #bosnisch #deutsch #ettaqwa #wien #quranverse #islamicreminder #deen #akhirah`,
  },
  {
    arabic: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۝ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ",
    bosnian: "Ko uradi koliko trun dobra — vidjet će ga! I ko uradi koliko trun zla — vidjet će ga!",
    german: "Wer auch nur ein Stäubchen Gutes tut, wird es sehen! Und wer auch nur ein Stäubchen Böses tut, wird es sehen!",
    reference: "Az-Zalzalah 99:7-8",
    caption: `⚖️ „Ko uradi koliko trun dobra — vidjet će ga! I ko uradi koliko trun zla — vidjet će ga!"\n\nJedes Stäubchen zählt. Gut oder böse. ⏳\n\n#gerechtigkeit #quran #islam #allah #akhirah #sudnjidan #dobro #zlo #islamzitate #bosnisch #deutsch #ettaqwa #wien #quranverse #islamicreminder #deen #warnung`,
  },
  {
    arabic: "يَوْمَ يَفِرُّ الْمَرْءُ مِنْ أَخِيهِ ۝ وَأُمِّهِ وَأَبِيهِ ۝ وَصَاحِبَتِهِ وَبَنِيهِ ۝ لِكُلِّ امْرِئٍ مِّنْهُمْ يَوْمَئِذٍ شَأْنٌ يُغْنِيهِ",
    bosnian: "Toga Dana čovjek će pobjeći od brata svoga, i od majke svoje, i od oca svoga, i od žene svoje, i od sinova svojih — svakom čovjeku će toga Dana biti samo do sebe!",
    german: "An jenem Tag wird der Mensch vor seinem Bruder fliehen, vor seiner Mutter und seinem Vater, vor seiner Frau und seinen Kindern — jeder von ihnen wird an jenem Tag nur mit sich selbst beschäftigt sein!",
    reference: "'Abasa 80:34-37",
    caption: `😰 „Toga Dana čovjek će pobjeći od brata svoga, i od majke, i od oca..."\n\nAn jenem Tag flieht jeder — selbst vor der eigenen Familie. Jeder ist nur mit sich selbst beschäftigt. 💔\n\n#sudnjidan #quran #islam #allah #akhirah #familie #angst #warnung #islamzitate #bosnisch #deutsch #ettaqwa #wien #quranverse #islamicreminder #deen #tawbah`,
  },
  {
    arabic: "وَلَا تَحْسَبَنَّ اللَّهَ غَافِلًا عَمَّا يَعْمَلُ الظَّالِمُونَ",
    bosnian: "I nikako ne misli da je Allah nemaran prema onome što zulumćari rade!",
    german: "Und denke ja nicht, dass Allah achtlos ist gegenüber dem, was die Ungerechten tun!",
    reference: "Ibrahim 14:42",
    caption: `👁️ „Nikako ne misli da je Allah nemaran prema onome što zulumćari rade!"\n\nAllah sieht alles. Denke nicht, Er sei achtlos. ⚡\n\n#gerechtigkeit #zulm #quran #islam #allah #warnung #islamzitate #bosnisch #deutsch #ettaqwa #wien #quranverse #islamicreminder #deen #akhirah #angst`,
  },
  // ── Herzzerreißend / Emotional ──
  {
    arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ ۖ وَعَسَىٰ أَن تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَّكُمْ ۗ وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ",
    bosnian: "Možda nešto ne volite, a to je dobro za vas; i možda nešto volite, a to je loše za vas. Allah zna, a vi ne znate!",
    german: "Vielleicht verabscheut ihr etwas, und es ist gut für euch; und vielleicht liebt ihr etwas, und es ist schlecht für euch. Allah weiß, und ihr wisst nicht!",
    reference: "Al-Baqarah 2:216",
    caption: `🌧️ „Možda nešto ne volite, a to je dobro za vas..."\n\nAllah weiß, und ihr wisst nicht. Vertraue Seinem Plan. 🤲\n\n#qadr #schicksal #vertrauen #quran #islam #allah #tawakkul #sabr #islamzitate #bosnisch #deutsch #ettaqwa #wien #quranverse #islamicreminder #deen #glaube`,
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    bosnian: "Zaista je Allah sa strpljivima!",
    german: "Wahrlich, Allah ist mit den Geduldigen!",
    reference: "Al-Baqarah 2:153",
    caption: `🌿 „Zaista je Allah sa strpljivima!"\n\nAllah ist mit den Geduldigen. Halte durch. 💚\n\n#sabr #geduld #allah #quran #islam #iman #trost #hoffnung #islamzitate #bosnisch #deutsch #ettaqwa #wien #quranverse #islamicreminder #deen #muslime #strpljenje`,
  },
];

interface QuranVersePostProps {
  verseIndex?: number;
}

const QuranVersePost = forwardRef<HTMLDivElement, QuranVersePostProps>(({ verseIndex = 0 }, ref) => {
  const verse = quranVerses[verseIndex];
  const isLong = verse.arabic.length > 120;

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
        padding: "6% 7%", textAlign: "center", color: "white",
      }}>
        {/* Top: Logo + Name */}
        <div style={{
          display: "flex", alignItems: "center", gap: "2cqi", marginBottom: "2cqi",
        }}>
          <img src={logo} alt="Et-Taqwa" style={{ width: "4.5cqi", height: "4.5cqi", objectFit: "contain" }} />
          <p style={{
            fontSize: "1.6cqi", fontWeight: 600, letterSpacing: "0.2em",
            textTransform: "uppercase", opacity: 0.4,
          }}>
            Džemat Et-Taqwa
          </p>
        </div>

        {/* Decorative top line */}
        <div style={{
          width: "20%", height: 1, marginBottom: "3cqi",
          background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.3), transparent)",
        }} />

        {/* Arabic verse */}
        <p style={{
          fontSize: isLong ? "4cqi" : "6.5cqi",
          fontFamily: "'Amiri', 'Noto Naskh Arabic', serif",
          lineHeight: 1.7,
          marginBottom: "2.5cqi",
          maxWidth: "92%",
          background: "linear-gradient(180deg, #ffffff 30%, rgba(52,211,153,0.85) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 400,
        }} dir="rtl">
          {verse.arabic}
        </p>

        {/* Decorative diamond */}
        <div style={{
          width: "1.5cqi", height: "1.5cqi", marginBottom: "2cqi",
          transform: "rotate(45deg)",
          border: "1px solid rgba(52,211,153,0.3)",
        }} />

        {/* Bosnian translation */}
        <p style={{
          fontSize: isLong ? "2.5cqi" : "3.2cqi",
          lineHeight: 1.5, fontWeight: 600,
          marginBottom: "1.2cqi", maxWidth: "88%",
          fontStyle: "italic",
          opacity: 0.9,
        }}>
          „{verse.bosnian}"
        </p>

        {/* German translation */}
        <p style={{
          fontSize: isLong ? "2cqi" : "2.6cqi",
          lineHeight: 1.45, fontWeight: 400,
          marginBottom: "2cqi", maxWidth: "88%",
          opacity: 0.5,
        }}>
          „{verse.german}"
        </p>

        {/* Reference */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "1cqi",
          padding: "0.8% 3%", borderRadius: 50,
          background: "rgba(52,211,153,0.08)",
          border: "1px solid rgba(52,211,153,0.15)",
          marginBottom: "2cqi",
        }}>
          <span style={{ fontSize: "1.3cqi", opacity: 0.3 }}>📖</span>
          <span style={{
            fontSize: "1.6cqi", fontWeight: 600, opacity: 0.5,
            letterSpacing: "0.05em",
          }}>
            {verse.reference}
          </span>
        </div>

        {/* Bottom handle */}
        <p style={{
          fontSize: "1.6cqi", fontWeight: 600, opacity: 0.3,
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
