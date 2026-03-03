import { useState, useRef, useEffect, useCallback } from "react";
import { Loader2, Play, RefreshCw, Download } from "lucide-react";
import logo from "@/assets/ettaqwa-profile-logo.png";

interface Word {
  text: string;
  start: number;
  end: number;
}

interface TranscriptionResult {
  text: string;
  words: Word[];
}

type SubtitleSegment = { text: string; start: number; end: number };

const buildSegments = (words: Word[], chunkSize = 6): SubtitleSegment[] => {
  const segments: SubtitleSegment[] = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    const chunk = words.slice(i, i + chunkSize);
    segments.push({
      text: chunk.map((w) => w.text).join(" "),
      start: chunk[0].start,
      end: chunk[chunk.length - 1].end,
    });
  }
  return segments;
};

const getSubtitleAtTime = (segments: SubtitleSegment[], time: number): string => {
  return segments.find((s) => time >= s.start && time <= s.end)?.text || "";
};

const StoryVideoOverlay = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [transcription, setTranscription] = useState<TranscriptionResult | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const logoImgRef = useRef<HTMLImageElement | null>(null);

  const videoSrc = "/videos/story-video.mov";

  // Preload logo image for canvas drawing
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logo;
    img.onload = () => { logoImgRef.current = img; };
  }, []);

  const transcribeVideo = async () => {
    setIsTranscribing(true);
    setError(null);
    try {
      const videoResponse = await fetch(videoSrc);
      const videoBlob = await videoResponse.blob();
      const formData = new FormData();
      formData.append("audio", videoBlob, "video.mov");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-transcribe`,
        {
          method: "POST",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error(`Fehler: ${response.status}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setTranscription(data);
    } catch (err) {
      console.error("Transcription failed:", err);
      setError(err instanceof Error ? err.message : "Transkription fehlgeschlagen");
    } finally {
      setIsTranscribing(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const segments = transcription?.words?.length ? buildSegments(transcription.words) : [];
  const subtitle = getSubtitleAtTime(segments, currentTime);

  // Draw one frame with overlay onto a canvas
  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, video: HTMLVideoElement, time: number, w: number, h: number) => {
      // Video frame
      ctx.drawImage(video, 0, 0, w, h);

      // Top gradient
      const topGrad = ctx.createLinearGradient(0, 0, 0, h * 0.15);
      topGrad.addColorStop(0, "rgba(0,0,0,0.6)");
      topGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, h * 0.15);

      // Bottom gradient
      const botGrad = ctx.createLinearGradient(0, h, 0, h * 0.85);
      botGrad.addColorStop(0, "rgba(0,0,0,0.7)");
      botGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, h * 0.85, w, h * 0.15);

      // Logo (top left)
      const logoSize = Math.round(w * 0.13);
      const logoPad = Math.round(w * 0.04);
      const logoRadius = Math.round(logoSize * 0.25);
      // White rounded rect background
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(logoPad, logoPad, logoSize, logoSize, logoRadius);
      ctx.fillStyle = "white";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
      // Logo image
      if (logoImgRef.current) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(logoPad, logoPad, logoSize, logoSize, logoRadius);
        ctx.clip();
        ctx.drawImage(logoImgRef.current, logoPad, logoPad, logoSize, logoSize);
        ctx.restore();
      }

      // Handle text (top right)
      ctx.save();
      ctx.font = `bold ${Math.round(w * 0.032)}px system-ui, sans-serif`;
      ctx.fillStyle = "white";
      ctx.textAlign = "right";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 8;
      ctx.fillText("@dzemat_et_taqwa", w - logoPad, logoPad + Math.round(w * 0.04));
      ctx.restore();

      // Subtitle
      const sub = getSubtitleAtTime(segments, time);
      if (sub) {
        ctx.save();
        const fontSize = Math.round(w * 0.042);
        ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
        ctx.textAlign = "center";

        // Measure & draw bg
        const maxWidth = w * 0.85;
        const metrics = ctx.measureText(sub);
        const textW = Math.min(metrics.width, maxWidth);
        const padX = Math.round(w * 0.035);
        const padY = Math.round(w * 0.02);
        const boxX = (w - textW) / 2 - padX;
        const boxY = h * 0.82 - padY;
        const boxW = textW + padX * 2;
        const boxH = fontSize + padY * 2;
        const boxR = Math.round(w * 0.02);

        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, boxR);
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fill();

        // Text
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;
        ctx.fillText(sub, w / 2, h * 0.82 + fontSize * 0.75, maxWidth);
        ctx.restore();
      }

      // Website (bottom center)
      ctx.save();
      ctx.font = `600 ${Math.round(w * 0.028)}px system-ui, sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 6;
      ctx.fillText("et-taqwa.com", w / 2, h * 0.97);
      ctx.restore();
    },
    [segments]
  );

  // Export video with overlay
  const exportVideo = useCallback(async () => {
    if (!transcription || !videoRef.current) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      const W = 1080;
      const H = 1920;

      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;

      // Create offscreen video element for export
      const exportVideo = document.createElement("video");
      exportVideo.src = videoSrc;
      exportVideo.muted = true;
      exportVideo.playsInline = true;
      exportVideo.crossOrigin = "anonymous";

      await new Promise<void>((resolve) => {
        exportVideo.onloadeddata = () => resolve();
        exportVideo.load();
      });

      const duration = exportVideo.duration;
      const fps = 30;
      const totalFrames = Math.floor(duration * fps);

      // Use MediaRecorder with canvas stream
      const stream = canvas.captureStream(fps);

      // Add audio track from original video
      // We need to capture audio separately
      const audioCtx = new AudioContext();
      const audioSource = audioCtx.createMediaElementSource(exportVideo);
      const audioDest = audioCtx.createMediaStreamDestination();
      audioSource.connect(audioDest);
      audioSource.connect(audioCtx.destination); // so we can hear playback

      // Merge video + audio streams
      const combinedStream = new MediaStream([
        ...stream.getVideoTracks(),
        ...audioDest.stream.getAudioTracks(),
      ]);

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: "video/webm;codecs=vp9",
        videoBitsPerSecond: 8_000_000,
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const downloadPromise = new Promise<void>((resolve) => {
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "instagram-story.webm";
          a.click();
          URL.revokeObjectURL(url);
          resolve();
        };
      });

      mediaRecorder.start();

      // Play video and capture frames
      exportVideo.currentTime = 0;
      await exportVideo.play();

      const renderLoop = () => {
        if (exportVideo.ended || exportVideo.paused) {
          mediaRecorder.stop();
          audioCtx.close();
          return;
        }

        drawFrame(ctx, exportVideo, exportVideo.currentTime, W, H);
        setExportProgress(Math.min(100, Math.round((exportVideo.currentTime / duration) * 100)));
        requestAnimationFrame(renderLoop);
      };

      renderLoop();

      await downloadPromise;
    } catch (err) {
      console.error("Export failed:", err);
      setError("Export fehlgeschlagen: " + (err instanceof Error ? err.message : "Unbekannter Fehler"));
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  }, [transcription, drawFrame]);

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-white text-xl font-bold">Instagram Story Video – 9:16</h1>

      {/* Controls */}
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={transcribeVideo}
          disabled={isTranscribing || isExporting}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          {isTranscribing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Transkribiere...
            </>
          ) : transcription ? (
            <>
              <RefreshCw className="w-4 h-4" />
              Neu transkribieren
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Untertitel generieren
            </>
          )}
        </button>

        {transcription && (
          <button
            onClick={exportVideo}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-colors"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exportiere... {exportProgress}%
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Video herunterladen
              </>
            )}
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Story Preview (9:16 aspect ratio) */}
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

        {/* Dark gradient overlay top */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: 160,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
          }}
        />

        {/* Logo top left */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <div
            className="rounded-2xl overflow-hidden shadow-lg"
            style={{ width: 56, height: 56, backgroundColor: "white" }}
          >
            <img src={logo} alt="Et Taqwa" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Handle top right */}
        <div className="absolute top-5 right-4 pointer-events-none">
          <span
            className="text-white font-bold text-xs"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
          >
            @dzemat_et_taqwa
          </span>
        </div>

        {/* Dark gradient overlay bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 200,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          }}
        />

        {/* Subtitle */}
        {subtitle && (
          <div className="absolute bottom-16 left-3 right-3 pointer-events-none flex justify-center">
            <div
              className="px-4 py-2 rounded-xl text-center"
              style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
            >
              <p
                className="text-white font-bold leading-snug"
                style={{ fontSize: 18, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
              >
                {subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Website bottom */}
        <div className="absolute bottom-4 left-0 right-0 pointer-events-none flex justify-center">
          <span
            className="text-white/80 font-semibold text-xs"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
          >
            et-taqwa.com
          </span>
        </div>
      </div>

      {/* Full transcription text */}
      {transcription && (
        <div className="max-w-md mt-2">
          <p className="text-white/50 text-xs text-center mb-1">Voller Text:</p>
          <p className="text-white/70 text-sm text-center leading-relaxed">
            {transcription.text}
          </p>
        </div>
      )}

      <p className="text-white/30 text-xs">1080×1920 · 9:16 · Instagram Story</p>
    </div>
  );
};

export default StoryVideoOverlay;
