import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";

// Apply saved font size on startup
const savedFontSize = localStorage.getItem("app-font-size") || "medium";
document.documentElement.setAttribute("data-font-size", savedFontSize);

// Apply saved dark mode on startup
const savedDarkMode = localStorage.getItem("app-dark-mode") === "true";
if (savedDarkMode) {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
