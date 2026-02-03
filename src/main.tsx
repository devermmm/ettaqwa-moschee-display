import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { enableBootDiagnostics } from "./lib/bootDiagnostics";

enableBootDiagnostics();

// Apply saved settings on startup (defensive: in some native WebViews storage can throw)
try {
  const savedFontSize = localStorage.getItem("app-font-size") || "medium";
  document.documentElement.setAttribute("data-font-size", savedFontSize);

  const savedDarkMode = localStorage.getItem("app-dark-mode") === "true";
  if (savedDarkMode) {
    document.documentElement.classList.add("dark");
  }
} catch {
  // ignore
}

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
