import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import instaBg from "@/assets/instagram-announcement.jpg";
import logo from "@/assets/logo.png";

const InstaPost = () => {
  const postRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!postRef.current) return;
    const { domToPng } = await import("modern-screenshot");
    const dataUrl = await domToPng(postRef.current, {
      width: 1080,
      height: 1080,
      scale: 1,
    });
    const link = document.createElement("a");
    link.download = "ettaqwa-instagram-announcement.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-6">
      <h1 className="text-2xl font-bold text-foreground">Instagram Post Preview</h1>
      
      {/* Post Preview */}
      <div
        ref={postRef}
        style={{
          width: 540,
          height: 540,
          position: "relative",
          overflow: "hidden",
          borderRadius: 0,
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        }}
      >
        {/* Background Image */}
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
        {/* Dark overlay for better text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,40,30,0.7) 0%, rgba(0,50,35,0.85) 50%, rgba(0,30,20,0.95) 100%)",
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
            height: "100%",
            padding: "40px 30px",
            textAlign: "center",
            color: "white",
          }}
        >
          {/* Logo */}
          <img
            src={logo}
            alt="Et-Taqwa"
            style={{ width: 60, height: 60, marginBottom: 16, borderRadius: 12 }}
          />

          {/* Title */}
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.7,
              marginBottom: 8,
            }}
          >
            DZEMAT ET-TAQWA TEAM
          </p>

          {/* Main Announcement - German */}
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 6,
              letterSpacing: "-0.02em",
            }}
          >
            WIR SIND OFFIZIELL
          </h2>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #34d399, #5eead4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AUF INSTAGRAM! 📸
          </h2>

          {/* Divider */}
          <div
            style={{
              width: 50,
              height: 2,
              background: "rgba(255,255,255,0.3)",
              borderRadius: 2,
              marginBottom: 20,
            }}
          />

          {/* Bosnian */}
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            ZVANIČNO SMO
          </h3>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 20,
              background: "linear-gradient(90deg, #34d399, #5eead4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NA INSTAGRAMU! 📸
          </h3>

          {/* Instagram handle placeholder */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              background: "rgba(255,255,255,0.12)",
              borderRadius: 50,
              border: "1px solid rgba(255,255,255,0.15)",
              fontSize: 14,
              fontWeight: 600,
              marginTop: 4,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @dzematettaqwa
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 11,
              opacity: 0.5,
              marginTop: 16,
              letterSpacing: "0.1em",
            }}
          >
            FOLGT UNS • PRATITE NAS
          </p>
        </div>
      </div>

      {/* Download Button */}
      <Button onClick={handleDownload} size="lg" className="gap-2">
        <Download className="w-5 h-5" />
        Als PNG herunterladen
      </Button>

      <p className="text-sm text-muted-foreground max-w-md text-center">
        Klicke auf "Als PNG herunterladen" um den Post als 1080x1080 Bild zu speichern. 
        Du kannst den Instagram-Handle oben anpassen falls nötig.
      </p>
    </div>
  );
};

export default InstaPost;
