import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import instaBg from "@/assets/instagram-announcement.jpg";
import ramadanBg from "@/assets/ramadan-story-bg.jpg";
import logo from "@/assets/logo.png";
import logoTransparent from "@/assets/logo-transparent.png";
import profileLogo from "@/assets/ettaqwa-profile-logo.png";

const INSTA_ICON = (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const InstaPost = () => {
  const postRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const ramadanRef = useRef<HTMLDivElement>(null);
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
      });
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
        }}
      >
        <img src={ramadanBg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />

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
