import { useState, useRef, useEffect, useCallback } from "react";
import { Loader2, Download } from "lucide-react";
import logo from "@/assets/ettaqwa-profile-logo.png";

interface SubtitleSegment {
  start: number;
  end: number;
  text: string;
  de: string; // German translation
}

const segments: SubtitleSegment[] = [
  { start: 0.699, end: 3.699, text: "Gdje se kune vremenom pa kaže Svi su ljudi", de: "Wo Er bei der Zeit schwört und sagt: Alle Menschen" },
  { start: 4.019, end: 6.799, text: "na gubitku, osim onih koji vjeruju", de: "sind im Verlust, außer denen, die glauben" },
  { start: 7.679, end: 11.44, text: "i dobra djela čine i koji preporučuju", de: "und gute Taten vollbringen und einander empfehlen" },
  { start: 11.5, end: 14.639, text: "istinu, hak i istinu", de: "die Wahrheit, das Recht und die Wahrheit" },
  { start: 14.699, end: 19.739, text: "i sabur strpljenje. Znači, vjernicima ili", de: "und Geduld. Das heißt, den Gläubigen oder" },
  { start: 19.84, end: 20.679, text: "vjernici", de: "Gläubige" },
  { start: 22.799, end: 23.76, text: "nije dozvoljeno", de: "ist es nicht erlaubt" },
  { start: 24.92, end: 27.44, text: "samo za sebe da bude vjernik,", de: "nur für sich selbst gläubig zu sein," },
  { start: 28.779, end: 32.0, text: "već u okviru toga da je vjernik ili", de: "sondern im Rahmen dessen, gläubig zu sein oder" },
  { start: 32.099, end: 32.879, text: "vjernica", de: "Gläubige" },
  { start: 34.6, end: 35.779, text: "podrazumijeva se", de: "versteht es sich" },
  { start: 37.7, end: 38.579, text: "da istinu", de: "dass die Wahrheit" },
  { start: 39.659, end: 44.139, text: "prenosi drugima. Jedan od primjera koji", de: "anderen weitergegeben wird. Ein Beispiel, das" },
  { start: 44.239, end: 44.739, text: "često", de: "oft" },
  { start: 44.819, end: 46.799, text: "spominjemo", de: "erwähnt wird" },
  { start: 47.86, end: 49.42, text: "vezano za ovu temu", de: "bezüglich dieses Themas" },
  { start: 51.299, end: 52.059, text: "da je uzvišenija", de: "dass es erhabener ist" },
];

// Pre-compute timed words per segment
interface TimedWord {
  word: string;
  start: number;
  segStart: number;
  segEnd: number;
}

const timedWords: TimedWord[] = [];
for (const seg of segments) {
  const words = seg.text.split(/\s+/);
  const duration = seg.end - seg.start;
  const interval = words.length > 1 ? duration / words.length : duration;
  for (let i = 0; i < words.length; i++) {
    timedWords.push({
      word: words[i],
      start: seg.start + i * interval,
      segStart: seg.start,
      segEnd: seg.end,
    });
  }
}

const getVisibleTextAtTime = (time: number): string => {
  const currentSeg = segments.find((s) => time >= s.start && time <= s.end);
  if (!currentSeg) return "";
  const segWords = timedWords.filter(
    (w) => w.segStart === currentSeg.start && w.segEnd === currentSeg.end
  );
  const visible = segWords.filter((w) => time >= w.start);
  return visible.map((w) => w.word).join(" ");
};

const getGermanAtTime = (time: number): string => {
  const currentSeg = segments.find((s) => time >= s.start && time <= s.end);
  if (!currentSeg) return "";
  return currentSeg.de;
};

// Google Font for canvas
const FONT_FAMILY = "'Playfair Display', Georgia, serif";
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const StoryVideoOverlay = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number>(0);

  const videoSrc = "/videos/story-video.mov";

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logo;
    img.onload = () => { logoImgRef.current = img; };
  }, []);

  // Real-time sync with requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tick = () => {
      setCurrentTime(video.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    const onPlay = () => { rafRef.current = requestAnimationFrame(tick); };
    const onPause = () => cancelAnimationFrame(rafRef.current);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onPause);
    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onPause);
    };
  }, []);

  const subtitle = getVisibleTextAtTime(currentTime);
  const germanText = getGermanAtTime(currentTime);

  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, video: HTMLVideoElement, time: number, w: number, h: number) => {
      ctx.drawImage(video, 0, 0, w, h);

      // Top gradient
      const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.15);
      topGrad.addColorStop(0, "rgba(0,0,0,0.6)");
      topGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, h * 0.15);

      // Bottom gradient
      const botGrad = ctx.createLinearGradient(0, h, 0, h * 0.75);
      botGrad.addColorStop(0, "rgba(0,0,0,0.7)");
      botGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, h * 0.75, w, h * 0.25);

      // Logo
      const logoSize = Math.round(w * 0.13);
      const logoPad = Math.round(w * 0.04);
      const logoR = Math.round(logoSize * 0.25);
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(logoPad, logoPad, logoSize, logoSize, logoR);
      ctx.fillStyle = "white";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
      if (logoImgRef.current) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(logoPad, logoPad, logoSize, logoSize, logoR);
        ctx.clip();
        ctx.drawImage(logoImgRef.current, logoPad, logoPad, logoSize, logoSize);
        ctx.restore();
      }

      // Handle
      ctx.save();
      ctx.font = `bold ${Math.round(w * 0.032)}px system-ui, sans-serif`;
      ctx.fillStyle = "white";
      ctx.textAlign = "right";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 8;
      ctx.fillText("@dzemat_et_taqwa", w - logoPad, logoPad + Math.round(w * 0.04));
      ctx.restore();

      // Subtitle
      const sub = getVisibleTextAtTime(time);
      const de = getGermanAtTime(time);
      if (sub) {
        ctx.save();
        const fontSize = Math.round(w * 0.046);
        const deFontSize = Math.round(w * 0.03);
        ctx.textAlign = "center";
        const maxWidth = w * 0.88;

        // Measure both lines
        ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`;
        const subMetrics = ctx.measureText(sub);
        ctx.font = `italic 400 ${deFontSize}px ${FONT_FAMILY}`;
        const deMetrics = ctx.measureText(de);
        const textW = Math.max(Math.min(subMetrics.width, maxWidth), Math.min(deMetrics.width, maxWidth));

        const padX = Math.round(w * 0.045);
        const padY = Math.round(w * 0.03);
        const lineGap = Math.round(w * 0.018);
        const boxW = textW + padX * 2;
        const boxH = fontSize + deFontSize + lineGap + padY * 2;
        const boxX = (w - boxW) / 2;
        const boxY = h * 0.78 - padY;
        const boxR = Math.round(w * 0.02);

        // Background pill
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, boxR);
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fill();

        // Bosnian text
        ctx.font = `700 ${fontSize}px ${FONT_FAMILY}`;
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 3;
        ctx.fillText(sub, w / 2, boxY + padY + fontSize * 0.88, maxWidth);

        // German text
        ctx.font = `italic 400 ${deFontSize}px ${FONT_FAMILY}`;
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.shadowBlur = 2;
        ctx.fillText(de, w / 2, boxY + padY + fontSize + lineGap + deFontSize * 0.85, maxWidth);

        ctx.restore();
      }

      // Website
      ctx.save();
      ctx.font = `600 ${Math.round(w * 0.028)}px ${FONT_FAMILY}`;
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 6;
      ctx.fillText("et-taqwa.com", w / 2, h * 0.97);
      ctx.restore();
    },
    []
  );

  const exportVideo = useCallback(async () => {
    setIsExporting(true);
    setExportProgress(0);
    setError(null);

    try {
      const W = 1080;
      const H = 1920;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;

      const exportVid = document.createElement("video");
      exportVid.src = videoSrc;
      exportVid.muted = true;
      exportVid.playsInline = true;
      exportVid.crossOrigin = "anonymous";

      await new Promise<void>((resolve) => {
        exportVid.onloadeddata = () => resolve();
        exportVid.load();
      });

      const duration = exportVid.duration;
      const stream = canvas.captureStream(30);

      // Audio
      const audioCtx = new AudioContext();
      const audioSource = audioCtx.createMediaElementSource(exportVid);
      const audioDest = audioCtx.createMediaStreamDestination();
      audioSource.connect(audioDest);

      const combinedStream = new MediaStream([
        ...stream.getVideoTracks(),
        ...audioDest.stream.getAudioTracks(),
      ]);

      // Try MP4 first (Safari), fall back to WebM
      let mimeType = "video/mp4";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "video/webm;codecs=vp9";
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "video/webm";
      }

      const ext = mimeType.includes("mp4") ? "mp4" : "webm";

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType,
        videoBitsPerSecond: 8_000_000,
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const downloadPromise = new Promise<void>((resolve) => {
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `instagram-story.${ext}`;
          a.click();
          URL.revokeObjectURL(url);
          resolve();
        };
      });

      mediaRecorder.start();
      exportVid.currentTime = 0;
      await exportVid.play();

      const renderLoop = () => {
        if (exportVid.ended || exportVid.paused) {
          mediaRecorder.stop();
          audioCtx.close();
          return;
        }
        drawFrame(ctx, exportVid, exportVid.currentTime, W, H);
        setExportProgress(Math.min(100, Math.round((exportVid.currentTime / duration) * 100)));
        requestAnimationFrame(renderLoop);
      };
      renderLoop();

      await downloadPromise;
    } catch (err) {
      console.error("Export failed:", err);
      setError("Export fehlgeschlagen: " + (err instanceof Error ? err.message : "Unbekannt"));
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  }, [drawFrame]);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
        Instagram Story Video – 9:16
      </h1>

      {/* Story Preview */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{ width: 360, height: 640 }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          controls
          loop
          crossOrigin="anonymous"
        />

        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 160, background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }} />

        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="rounded-2xl overflow-hidden shadow-lg" style={{ width: 56, height: 56, backgroundColor: "white" }}>
            <img src={logo} alt="Et Taqwa" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="absolute top-5 right-4 pointer-events-none">
          <span className="text-white font-bold text-xs" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>@dzemat_et_taqwa</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 200, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />

        {subtitle && (
          <div className="absolute bottom-14 left-3 right-3 pointer-events-none flex justify-center">
            <div className="px-4 py-3 rounded-xl text-center" style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
              <p className="text-white font-bold leading-snug" style={{ fontSize: 16, fontFamily: "'Playfair Display', serif", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                {subtitle}
              </p>
              {germanText && (
                <p className="text-white/60 italic leading-snug mt-1" style={{ fontSize: 12, fontFamily: "'Playfair Display', serif" }}>
                  {germanText}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-0 right-0 pointer-events-none flex justify-center">
          <span className="text-white/80 font-semibold text-xs" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)", fontFamily: "'Playfair Display', serif" }}>et-taqwa.com</span>
        </div>
      </div>

      <button
        onClick={exportVideo}
        disabled={isExporting}
        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-colors"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Exportiere... {exportProgress}%
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Video herunterladen
          </>
        )}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      <p className="text-white/30 text-xs">1080×1920 · 9:16 · Wort-für-Wort Untertitel</p>
    </div>
  );
};

export default StoryVideoOverlay;
