import { useRef, useState, type RefObject } from "react";
import { Download, ExternalLink, Loader2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type PosterExportActionsProps = {
  captureRef: RefObject<HTMLDivElement>;
  filename: string;
};

const dataUrlToBlob = (dataUrl: string) => {
  const [meta, base64 = ""] = dataUrl.split(",");
  const mimeType = meta.match(/data:(.*?);base64/)?.[1] ?? "image/png";
  const bytes = atob(base64);
  const buffer = new Uint8Array(bytes.length);

  for (let index = 0; index < bytes.length; index += 1) {
    buffer[index] = bytes.charCodeAt(index);
  }

  return new Blob([buffer], { type: mimeType });
};

const triggerDownload = async (url: string, filename: string) => {
  try {
    const blob = url.startsWith("data:")
      ? dataUrlToBlob(url)
      : await fetch(url).then((response) => {
          if (!response.ok) throw new Error("Download failed");
          return response.blob();
        });

    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = blobUrl;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    return true;
  } catch {
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    return Boolean(opened);
  }
};

const shareExport = async (url: string, filename: string) => {
  if (typeof navigator.share !== "function" || typeof File === "undefined") {
    return false;
  }

  try {
    const file = new File([dataUrlToBlob(url)], filename, { type: "image/png" });

    if (typeof navigator.canShare === "function" && !navigator.canShare({ files: [file] })) {
      return false;
    }

    await navigator.share({
      files: [file],
      title: filename,
    });

    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return true;
    }

    return false;
  }
};

const PosterExportActions = ({ captureRef, filename }: PosterExportActionsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [latestExport, setLatestExport] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleExport = async () => {
    if (!captureRef.current || isExporting) return;

    setIsExporting(true);

    try {
      const { domToPng } = await import("modern-screenshot");
      const element = captureRef.current;
      const currentWidth = element.offsetWidth;
      const targetWidth = 2480;
      const scaleFactor = Math.max(2, targetWidth / currentWidth);

      const dataUrl = await domToPng(element, {
        scale: scaleFactor,
        width: currentWidth,
        height: element.offsetHeight,
        backgroundColor: "#ffffff",
        fetchProxyUrl: undefined,
      } as any);

      setLatestExport(dataUrl);
      requestAnimationFrame(() => {
        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

      if (!isTouchDevice) {
        await triggerDownload(dataUrl, filename);
      }

      toast({
        title: "Plakat erstellt",
        description: isTouchDevice
          ? "Unten kannst du das Bild ohne URL oder Seitenzahl speichern."
          : "Das Plakat wurde als sauberes Bild exportiert.",
      });
    } catch (error) {
      console.error("Poster export failed:", error);
      toast({
        title: "Export fehlgeschlagen",
        description: "Das Plakat konnte nicht erstellt werden.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-[210mm] flex flex-col gap-3">
      <Button onClick={handleExport} disabled={isExporting} className="h-12 gap-2">
        {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {isExporting ? "Plakat wird erstellt..." : latestExport ? "Plakat neu erstellen" : "Plakat ohne Link speichern"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Nutze diesen Export statt Drucken — so verschwinden URL und „Seite 1 von 1“ komplett.
      </p>

      {latestExport && (
        <div ref={previewRef} className="rounded-xl border border-border bg-card/90 p-4 flex flex-col gap-3 shadow-sm">
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            <img src={latestExport} alt={filename} className="block h-auto w-full" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
              <Button
                className="h-11 gap-2"
                onClick={async () => {
                  const shared = await shareExport(latestExport, filename);
                  if (!shared) {
                    toast({
                      title: "Teilen nicht möglich",
                      description: "Nutze alternativ Bild öffnen oder Bild speichern.",
                    });
                  }
                }}
              >
                <Share2 className="h-4 w-4" />
                Teilen / Speichern
              </Button>
            )}

            <a
              href={latestExport}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-opacity hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              Bild öffnen
            </a>

            <Button
              variant="outline"
              className="h-11"
              onClick={async () => {
                const downloaded = await triggerDownload(latestExport, filename);
                if (!downloaded) {
                  toast({
                    title: "Download blockiert",
                    description: "Öffne das Bild und speichere es dort direkt.",
                  });
                }
              }}
            >
              Bild speichern
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosterExportActions;
