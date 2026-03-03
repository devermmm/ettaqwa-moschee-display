import { useRef } from "react";
import { domToPng } from "modern-screenshot";
import { Download } from "lucide-react";
import logo from "@/assets/logo-transparent.png";

const TikTokOverlay = () => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!overlayRef.current) return;
    const dataUrl = await domToPng(overlayRef.current, {
      scale: 3,
      width: 1080,
      height: 1920,
      style: { transform: "scale(1)", transformOrigin: "top left" },
    });
    const link = document.createElement("a");
    link.download = "tiktok-overlay.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-white text-xl font-bold">TikTok Overlay</h1>

      {/* Preview container */}
      <div className="relative" style={{ width: 360, height: 640 }}>
        <div
          ref={overlayRef}
          style={{
            width: 1080,
            height: 1920,
            transform: "scale(0.3333)",
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {/* Fully transparent background */}
          <div
            style={{
              width: 1080,
              height: 1920,
              position: "relative",
              backgroundColor: "transparent",
            }}
          >
            {/* Bottom bar */}
            <div
              style={{
                position: "absolute",
                bottom: 80,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
              }}
            >
              {/* Logo */}
              <img
                src={logo}
                alt="Et Taqwa"
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "contain",
                  filter: "brightness(1.2) drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
                }}
              />

              {/* Social handles */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 40,
                }}
              >
                {/* Instagram */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span
                    style={{
                      color: "white",
                      fontSize: 32,
                      fontWeight: 700,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      textShadow: "0 2px 6px rgba(0,0,0,0.6)",
                    }}
                  >
                    @dzemat_et_taqwa
                  </span>
                </div>

                {/* TikTok */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
                  </svg>
                  <span
                    style={{
                      color: "white",
                      fontSize: 32,
                      fontWeight: 700,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      textShadow: "0 2px 6px rgba(0,0,0,0.6)",
                    }}
                  >
                    @et.taqwa
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm"
      >
        <Download className="w-5 h-5" />
        PNG herunterladen
      </button>
      <p className="text-white/40 text-xs">1080×1920 · Transparenter Hintergrund</p>
    </div>
  );
};

export default TikTokOverlay;
