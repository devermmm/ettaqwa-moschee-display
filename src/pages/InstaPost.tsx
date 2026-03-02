import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import VaktijaStory from "@/components/insta/VaktijaStory";
import instaBg from "@/assets/instagram-announcement.jpg";
import ramadanBg from "@/assets/ramadan-story-bg.jpg";
import logo from "@/assets/logo.png";
import logoTransparent from "@/assets/logo-transparent.png";
import profileLogo from "@/assets/ettaqwa-profile-logo.png";
import highlightHadith from "@/assets/highlight-hadith.png";
import highlightSpenden from "@/assets/highlight-spenden.png";
import mapVienna from "@/assets/map-vienna.png";
import highlightStandort from "@/assets/highlight-standort.png";

const INSTA_ICON = (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const InstaPost = () => {
  const postRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const ramadanRef = useRef<HTMLDivElement>(null);
  const spendenRef = useRef<HTMLDivElement>(null);
  const standortRef = useRef<HTMLDivElement>(null);
  const vaktijaRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (ref: React.RefObject<HTMLDivElement>, filename: string, targetW: number, targetH: number) => {
    if (!ref.current || downloading) return;
    setDownloading(filename);
    try {
      const { domToPng } = await import("modern-screenshot");
      const el = ref.current;
      const currentWidth = el.offsetWidth;
      const scaleFactor = targetW / currentWidth;
      
      const dataUrl = await domToPng(el, {
        scale: scaleFactor,
        width: currentWidth,
        height: el.offsetHeight,
        backgroundColor: "#001a0d",
        fetchProxyUrl: undefined,
      } as any);
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-6">
      <h1 className="text-2xl font-bold text-foreground">Instagram Post Preview</h1>
      
      <div
        ref={postRef}
        style={{
          width: "min(100%, 1080px)",
          aspectRatio: "1 / 1",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          containerType: "inline-size",
        }}
      >
        {/* Background */}
        <img
          src={instaBg}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, rgba(2,48,32,0.75) 0%, rgba(0,30,20,0.92) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "8%",
            textAlign: "center",
            color: "white",
          }}
        >
          {/* Logo */}
          <img
            src={logo}
            alt="Et-Taqwa"
            style={{ width: "14%", objectFit: "contain", marginBottom: "4%" }}
          />

          {/* Subtitle */}
          <p style={{
            fontSize: "2.5cqi",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0.6,
            marginBottom: "4%",
          }}>
            Džemat Et-Taqwa
          </p>

          {/* German Title */}
          <h2 style={{
            fontSize: "5.5cqi",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "0.5%",
            letterSpacing: "-0.02em",
          }}>
            WIR SIND OFFIZIELL
          </h2>
          <h2 style={{
            fontSize: "5.5cqi",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "3%",
            letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            AUF INSTAGRAM!
          </h2>

          {/* Decorative line */}
          <div style={{
            width: "12%",
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)",
            marginBottom: "3%",
          }} />

          {/* Bosnian Title */}
          <h3 style={{
            fontSize: "4.5cqi",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: "0.5%",
            opacity: 0.85,
          }}>
            ZVANIČNO SMO
          </h3>
          <h3 style={{
            fontSize: "4.5cqi",
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: "4%",
            background: "linear-gradient(90deg, #6ee7b7, #5eead4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            NA INSTAGRAMU!
          </h3>

          {/* Description */}
          <p style={{
            fontSize: "2.5cqi",
            lineHeight: 1.5,
            opacity: 0.7,
            marginBottom: "4%",
            maxWidth: "80%",
          }}>
            Folgt uns für Neuigkeiten & Veranstaltungen
            <br />
            Pratite nas za vijesti i dešavanja iz džemata
          </p>

          {/* Handle pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2%",
            padding: "2% 5%",
            background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(94,234,212,0.1))",
            borderRadius: 50,
            border: "1px solid rgba(52,211,153,0.3)",
            fontSize: "3.5cqi",
            fontWeight: 700,
          }}>
            {INSTA_ICON}
            @dzemat_et_taqwa
          </div>

          <p style={{
            fontSize: "2cqi",
            opacity: 0.4,
            marginTop: "3%",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            Folgt uns ✦ Pratite nas ✦ Podijelite
          </p>
        </div>
      </div>

      <Button onClick={() => handleDownload(postRef, "ettaqwa-instagram-post.png", 1080, 1080)} size="lg" className="gap-2" disabled={!!downloading}>
        {downloading === "ettaqwa-instagram-post.png" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        Post herunterladen (1080×1080)
      </Button>

      {/* ===== STORY VERSION ===== */}
      <h2 className="text-xl font-bold text-foreground mt-8">Instagram Story Preview</h2>

      <div
        ref={storyRef}
        style={{
          width: "min(100%, 540px)",
          aspectRatio: "9 / 16",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          containerType: "inline-size",
        }}
      >
        <img src={instaBg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(2,48,32,0.7) 0%, rgba(0,30,20,0.95) 100%)" }} />

        <div style={{
          position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
          padding: "10% 8%", textAlign: "center", color: "white",
        }}>
          <img src={logo} alt="Et-Taqwa" style={{ width: "20%", objectFit: "contain", marginBottom: "6%" }} />

          <p style={{ fontSize: "3cqi", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.6, marginBottom: "6%" }}>
            Džemat Et-Taqwa
          </p>

          <h2 style={{ fontSize: "7cqi", fontWeight: 800, lineHeight: 1.1, marginBottom: "1%", letterSpacing: "-0.02em" }}>
            WIR SIND OFFIZIELL
          </h2>
          <h2 style={{
            fontSize: "7cqi", fontWeight: 800, lineHeight: 1.1, marginBottom: "5%", letterSpacing: "-0.02em",
            background: "linear-gradient(90deg, #34d399, #6ee7b7, #5eead4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            AUF INSTAGRAM!
          </h2>

          <div style={{ width: "15%", height: 2, background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)", marginBottom: "5%" }} />

          <h3 style={{ fontSize: "5.5cqi", fontWeight: 700, lineHeight: 1.15, marginBottom: "1%", opacity: 0.85 }}>
            ZVANIČNO SMO
          </h3>
          <h3 style={{
            fontSize: "5.5cqi", fontWeight: 700, lineHeight: 1.15, marginBottom: "6%",
            background: "linear-gradient(90deg, #6ee7b7, #5eead4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            NA INSTAGRAMU!
          </h3>

          <p style={{ fontSize: "3cqi", lineHeight: 1.5, opacity: 0.7, marginBottom: "6%", maxWidth: "85%" }}>
            Folgt uns für Neuigkeiten & Veranstaltungen
            <br />
            Pratite nas za vijesti i dešavanja iz džemata
          </p>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "2%", padding: "2.5% 6%",
            background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(94,234,212,0.1))",
            borderRadius: 50, border: "1px solid rgba(52,211,153,0.3)", fontSize: "4cqi", fontWeight: 700,
          }}>
            {INSTA_ICON}
            @dzemat_et_taqwa
          </div>

          <p style={{ fontSize: "2.5cqi", opacity: 0.4, marginTop: "5%", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Folgt uns ✦ Pratite nas
          </p>
        </div>
      </div>

      <Button onClick={() => handleDownload(storyRef, "ettaqwa-instagram-story.png", 1080, 1920)} size="lg" className="gap-2" disabled={!!downloading}>
        {downloading === "ettaqwa-instagram-story.png" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        Story herunterladen (1080×1920)
      </Button>

      {/* ===== VAKTIJA STORY ===== */}
      <h2 className="text-xl font-bold text-foreground mt-8">Vaktija Story (Gebetszeiten)</h2>

      <VaktijaStory ref={vaktijaRef} />

      <Button onClick={() => handleDownload(vaktijaRef, "ettaqwa-vaktija-story.png", 1080, 1920)} size="lg" className="gap-2" disabled={!!downloading}>
        {downloading === "ettaqwa-vaktija-story.png" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        Vaktija Story herunterladen (1080×1920)
      </Button>

      {/* ===== RAMADAN HADITH STORY ===== */}
      <h2 className="text-xl font-bold text-foreground mt-8">Ramadan Hadith Story</h2>

      <div
        ref={ramadanRef}
        style={{
          width: "min(100%, 540px)",
          aspectRatio: "9 / 16",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          containerType: "inline-size",
          background: "radial-gradient(ellipse at 50% 30%, #003d1f 0%, #001a0d 60%, #000d06 100%)",
        }}
      >

        <div style={{
          position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
          padding: "12% 9%", textAlign: "center", color: "white",
        }}>


          {/* Hadith BS */}
          <p style={{
            fontSize: "3.5cqi", lineHeight: 1.65, fontWeight: 500, fontStyle: "italic",
            marginBottom: "4%", maxWidth: "85%",
          }}>
            „Ko posti Ramazan vjerujući i nadajući se nagradi, bit će mu oprošteni prethodni grijesi."
          </p>

          {/* Divider */}
          <div style={{ width: "12%", height: 1, background: "rgba(255,255,255,0.15)", marginBottom: "4%" }} />

          {/* Hadith DE */}
          <p style={{
            fontSize: "3cqi", lineHeight: 1.65, fontWeight: 400, opacity: 0.6,
            marginBottom: "4%", maxWidth: "85%",
          }}>
            „Wer den Ramadan mit Glauben und Hoffnung auf Belohnung fastet, dem werden seine vorherigen Sünden vergeben."
          </p>

          <p style={{ fontSize: "2cqi", opacity: 0.35, marginBottom: "8%", fontWeight: 600, letterSpacing: "0.05em" }}>
            Sahih Bukhari
          </p>

          {/* Handle */}
          <p style={{ fontSize: "2.8cqi", fontWeight: 600, opacity: 0.4 }}>
            @dzemat_et_taqwa
          </p>
        </div>
      </div>

      <Button onClick={() => handleDownload(ramadanRef, "ettaqwa-ramadan-hadith-story.png", 1080, 1920)} size="lg" className="gap-2" disabled={!!downloading}>
        {downloading === "ettaqwa-ramadan-hadith-story.png" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        Ramadan Story herunterladen (1080×1920)
      </Button>

      {/* ===== SPENDEN STORY ===== */}
      <h2 className="text-xl font-bold text-foreground mt-8">Spenden Story</h2>

      <div
        ref={spendenRef}
        style={{
          width: "min(100%, 540px)",
          aspectRatio: "9 / 16",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          containerType: "inline-size",
          background: "radial-gradient(ellipse at 50% 40%, #1a3a2a 0%, #0d1f15 60%, #060f0a 100%)",
        }}
      >
        <div style={{
          position: "relative", zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", width: "100%", height: "100%",
          padding: "10% 8%", textAlign: "center", color: "white",
        }}>

          {/* Heart icon */}
          <div style={{
            width: "12%", aspectRatio: "1", marginBottom: "5%", display: "flex",
            alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(52,211,153,0.3)", borderRadius: "50%",
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(52,211,153,0.8)" strokeWidth="1.5" style={{ width: "55%" }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: "6.5cqi", fontWeight: 800, lineHeight: 1.05, marginBottom: "2%", letterSpacing: "0.03em",
          }}>
            SPENDE FÜR
          </h2>
          <h2 style={{
            fontSize: "6.5cqi", fontWeight: 800, lineHeight: 1.05, marginBottom: "2%",
            background: "linear-gradient(90deg, #34d399, #6ee7b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            DEINEN DŽEMAT
          </h2>

          <p style={{ fontSize: "3cqi", opacity: 0.5, marginBottom: "6%", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Doniraj za svoj džemat
          </p>

          {/* Divider */}
          <div style={{ width: "15%", height: 1, background: "rgba(255,255,255,0.1)", marginBottom: "6%" }} />

          {/* Bank info */}
          <div style={{
            background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)",
            borderRadius: 16, padding: "5% 7%", marginBottom: "4%", width: "90%",
            textAlign: "left",
          }}>
            <p style={{ fontSize: "2.2cqi", opacity: 0.5, marginBottom: "2%", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Bankverbindung
            </p>
            <p style={{ fontSize: "2.8cqi", fontWeight: 600, marginBottom: "1.5%" }}>
              Islamische Gemeinschaft Et-Taqwa
            </p>
            <p style={{ fontSize: "2.5cqi", opacity: 0.7, marginBottom: "1%" }}>
              IBAN: AT58 2011 1826 7414 0900
            </p>
            <p style={{ fontSize: "2.5cqi", opacity: 0.7 }}>
              Verwendungszweck: Spende
            </p>
          </div>

          {/* Quran verse */}
          <p style={{
            fontSize: "2.8cqi", lineHeight: 1.6, fontStyle: "italic", opacity: 0.55,
            marginBottom: "2%", maxWidth: "88%",
          }}>
            „Ko udijeli sadaku, makar pola hurme, od lijepe zarade — Allah je prima Svojom desnicom."
          </p>
          <p style={{
            fontSize: "2.3cqi", lineHeight: 1.6, opacity: 0.4,
            marginBottom: "5%", maxWidth: "88%",
          }}>
            „Wer auch nur eine halbe Dattel als Spende gibt, von einem guten Erwerb — Allah nimmt sie mit Seiner Rechten an."
            <br />
            <span style={{ fontSize: "0.85em", opacity: 0.7 }}>— Sahih Bukhari</span>
          </p>

          {/* Handle */}
          <p style={{ fontSize: "2.8cqi", fontWeight: 600, opacity: 0.4 }}>
            @dzemat_et_taqwa
          </p>
        </div>
      </div>

      <Button onClick={() => handleDownload(spendenRef, "ettaqwa-spenden-story.png", 1080, 1920)} size="lg" className="gap-2" disabled={!!downloading}>
        {downloading === "ettaqwa-spenden-story.png" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        Spenden Story herunterladen (1080×1920)
      </Button>

      {/* ===== STANDORT STORY ===== */}
      <h2 className="text-xl font-bold text-foreground mt-8">Standort Story</h2>

      <div
        ref={standortRef}
        style={{
          width: "min(100%, 540px)",
          aspectRatio: "9 / 16",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          containerType: "inline-size",
        }}
      >
        {/* Map image - cropped to hide status bar and search bar */}
        <img src={mapVienna} alt="" style={{
          position: "absolute", left: 0, right: 0, width: "100%", height: "115%",
          objectFit: "cover", objectPosition: "center 8%", top: "-5%",
        }} />




        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "12%", zIndex: 5,
          background: "linear-gradient(180deg, rgba(15,20,30,1) 0%, rgba(15,20,30,0.8) 50%, transparent 100%)",
        }} />

        {/* Bottom overlay with info */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
          background: "linear-gradient(180deg, transparent 0%, rgba(10,15,20,0.85) 40%, rgba(10,15,20,0.97) 100%)",
          padding: "30% 8% 8%",
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", color: "white",
        }}>
          <h2 style={{
            fontSize: "5.5cqi", fontWeight: 800, lineHeight: 1.1, marginBottom: "2%",
          }}>
            BESUCHE UNS
          </h2>

          <p style={{ fontSize: "3cqi", opacity: 0.5, marginBottom: "5%", letterSpacing: "0.1em" }}>
            Posjeti nas
          </p>

          <div style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 16, padding: "4% 6%", width: "85%", marginBottom: "5%",
          }}>
            <p style={{ fontSize: "3.5cqi", fontWeight: 700, marginBottom: "1.5%" }}>
              📍 Voitgasse 21
            </p>
            <p style={{ fontSize: "2.8cqi", opacity: 0.6 }}>
              1220 Wien, Österreich
            </p>
          </div>

          <p style={{ fontSize: "2.8cqi", fontWeight: 600, opacity: 0.35 }}>
            @dzemat_et_taqwa
          </p>
        </div>
      </div>

      <Button onClick={() => handleDownload(standortRef, "ettaqwa-standort-story.png", 1080, 1920)} size="lg" className="gap-2" disabled={!!downloading}>
        {downloading === "ettaqwa-standort-story.png" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        Standort Story herunterladen (1080×1920)
      </Button>

      {/* ===== HIGHLIGHT ICON ===== */}
      <h2 className="text-xl font-bold text-foreground mt-8">Highlight Icon – Hadith</h2>

      <div className="rounded-full overflow-hidden border border-border" style={{ width: 160, height: 160 }}>
        <img src={highlightHadith} alt="Hadith Highlight" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      <a href={highlightHadith} download="ettaqwa-highlight-hadith.png">
        <Button size="lg" className="gap-2">
          <Download className="w-5 h-5" />
          Highlight Icon herunterladen
        </Button>
      </a>

      {/* ===== HIGHLIGHT ICON SPENDEN ===== */}
      <h2 className="text-xl font-bold text-foreground mt-8">Highlight Icon – Spenden</h2>

      <div className="rounded-full overflow-hidden border border-border" style={{ width: 160, height: 160 }}>
        <img src={highlightSpenden} alt="Spenden Highlight" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      <a href={highlightSpenden} download="ettaqwa-highlight-spenden.png">
        <Button size="lg" className="gap-2">
          <Download className="w-5 h-5" />
          Highlight Icon herunterladen
        </Button>
      </a>

      {/* ===== HIGHLIGHT ICON STANDORT ===== */}
      <h2 className="text-xl font-bold text-foreground mt-8">Highlight Icon – Standort</h2>

      <div className="rounded-full overflow-hidden border border-border" style={{ width: 160, height: 160 }}>
        <img src={highlightStandort} alt="Standort Highlight" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      <a href={highlightStandort} download="ettaqwa-highlight-standort.png">
        <Button size="lg" className="gap-2">
          <Download className="w-5 h-5" />
          Highlight Icon herunterladen
        </Button>
      </a>

      {/* ===== PROFILE LOGO ===== */}
      <h2 className="text-xl font-bold text-foreground mt-8">Profilbild Logo</h2>

      <div className="rounded-xl overflow-hidden border border-border" style={{ width: "min(100%, 400px)" }}>
        <img src={profileLogo} alt="Et-Taqwa Profilbild" style={{ width: "100%", display: "block" }} />
      </div>

      <a href={profileLogo} download="ettaqwa-profilbild.png">
        <Button size="lg" className="gap-2">
          <Download className="w-5 h-5" />
          Profilbild herunterladen
        </Button>
      </a>

      <p className="text-sm text-muted-foreground max-w-md text-center mb-8">
        Alle Bilder werden in voller Instagram-Auflösung heruntergeladen.
      </p>
    </div>
  );
};

export default InstaPost;
