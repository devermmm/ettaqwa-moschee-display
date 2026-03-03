import { useState, useRef, useEffect } from "react";
import { Loader2, Play, RefreshCw } from "lucide-react";
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

const StoryVideoOverlay = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [transcription, setTranscription] = useState<TranscriptionResult | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoSrc = "/videos/story-video.mov";

  const transcribeVideo = async () => {
    setIsTranscribing(true);
    setError(null);

    try {
      // Fetch the video file
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

      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }

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

  // Get current subtitle text based on video time
  const getCurrentSubtitle = (): string => {
    if (!transcription?.words?.length) return "";

    // Group words into subtitle segments (~6 words each)
    const segments: { text: string; start: number; end: number }[] = [];
    const chunkSize = 6;

    for (let i = 0; i < transcription.words.length; i += chunkSize) {
      const chunk = transcription.words.slice(i, i + chunkSize);
      segments.push({
        text: chunk.map((w) => w.text).join(" "),
        start: chunk[0].start,
        end: chunk[chunk.length - 1].end,
      });
    }

    const current = segments.find(
      (s) => currentTime >= s.start && currentTime <= s.end
    );

    return current?.text || "";
  };

  const subtitle = getCurrentSubtitle();

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-white text-xl font-bold">Instagram Story Video – 9:16</h1>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={transcribeVideo}
          disabled={isTranscribing}
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
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Story Preview (9:16 aspect ratio) */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{ width: 360, height: 640 }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          controls
          loop
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
            style={{
              width: 56,
              height: 56,
              backgroundColor: "white",
            }}
          >
            <img
              src={logo}
              alt="Et Taqwa"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Handle top right */}
        <div className="absolute top-5 right-4 pointer-events-none">
          <span
            className="text-white font-bold text-xs"
            style={{
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
            }}
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
              style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                className="text-white font-bold leading-snug"
                style={{
                  fontSize: 18,
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}
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
