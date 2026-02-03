export function enableBootDiagnostics() {
  if (typeof window === "undefined") return;

  const ensureEl = () => {
    let el = document.getElementById("boot-diagnostics");
    if (!el) {
      el = document.createElement("div");
      el.id = "boot-diagnostics";
      el.className =
        "fixed inset-0 z-[99999] hidden p-4 bg-background text-foreground overflow-auto";

      const header = document.createElement("div");
      header.className = "text-sm font-semibold mb-2";
      header.textContent = "Boot diagnostics";

      const pre = document.createElement("pre");
      pre.className = "text-xs whitespace-pre-wrap leading-relaxed";
      pre.setAttribute("data-role", "content");

      el.appendChild(header);
      el.appendChild(pre);
      document.body.appendChild(el);
    }
    return el;
  };

  const show = (message: string) => {
    const el = ensureEl();
    const pre = el.querySelector('[data-role="content"]') as HTMLElement | null;
    if (pre) pre.textContent = message;
    el.classList.remove("hidden");
  };

  window.addEventListener("error", (e) => {
    const anyE = e as unknown as {
      message?: string;
      filename?: string;
      lineno?: number;
      colno?: number;
      error?: unknown;
    };
    show(
      [
        "[window.error]",
        anyE.message ?? "(no message)",
        anyE.filename ? `${anyE.filename}:${anyE.lineno ?? "?"}:${anyE.colno ?? "?"}` : "",
        anyE.error ? `\n${String(anyE.error)}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
  });

  window.addEventListener("unhandledrejection", (e) => {
    const anyE = e as PromiseRejectionEvent;
    show(`[unhandledrejection]\n${String(anyE.reason)}`);
  });

  // If nothing renders, show a hint after a short delay.
  window.setTimeout(() => {
    const root = document.getElementById("root");
    if (root && root.childElementCount === 0) {
      show(
        "[boot] App started, but nothing rendered into #root.\n\n" +
          "If you still see a blank screen, the WebView may not be loading the web assets."
      );
    }
  }, 4000);
}
