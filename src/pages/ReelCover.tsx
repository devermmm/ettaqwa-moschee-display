import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { domToPng } from "modern-screenshot";
import logo from "@/assets/ettaqwa-profile-logo.png";

const ReelCover = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const today = new Date();
  const dateStr = `${today.getDate()}.${today.getMonth() + 1}.${String(today.getFullYear()).slice(2)}`;

  const exportImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await domToPng(cardRef.current, {
        width: 1080,
        height: 1920,
        quality: 1,
        scale: 1080 / cardRef.current.offsetWidth,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `reel-cover-${dateStr}.png`;
      a.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-white text-xl font-bold">Reel Titelbild – 9:16</h1>

      {/* Card Preview */}
      <div
        ref={cardRef}
        className="relative overflow-hidden flex flex-col items-center justify-center"
        style={{
          width: 360,
          height: 640,
          background: "linear-gradient(160deg, #0a1a12 0%, #0d2818 30%, #14532d 60%, #0a1a12 100%)",
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: "40%",
            height: 3,
            background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-8">
          {/* Date */}
          <span
            className="tracking-[0.3em] uppercase"
            style={{
              fontSize: 14,
              color: "rgba(34,197,94,0.7)",
              fontWeight: 500,
              letterSpacing: "0.3em",
            }}
          >
            {dateStr}
          </span>

          {/* Divider */}
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(255,255,255,0.15)",
            }}
          />

          {/* KHUTBA */}
          <h2
            className="text-center"
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "white",
              letterSpacing: "0.15em",
              lineHeight: 1.1,
            }}
          >
            KHUTBA
          </h2>

          {/* Logo */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: 80,
              height: 80,
              backgroundColor: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <img src={logo} alt="Et Taqwa" className="w-full h-full object-contain" />
          </div>

          {/* ET TAQWA */}
          <h3
            className="text-center"
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.25em",
            }}
          >
            ET TAQWA
          </h3>

          {/* Divider */}
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(255,255,255,0.15)",
            }}
          />

          {/* Website */}
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.15em",
            }}
          >
            et-taqwa.com
          </span>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "40%",
            height: 3,
            background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)",
          }}
        />
      </div>

      <button
        onClick={exportImage}
        disabled={isExporting}
        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-colors"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Exportiere...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Bild herunterladen
          </>
        )}
      </button>
      <p className="text-white/30 text-xs">1080×1920 · 9:16 · Instagram Reel Cover</p>
    </div>
  );
};

export default ReelCover;
