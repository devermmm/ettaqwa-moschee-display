import { NavLink } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.prayerTimes"), path: "/gebetszeiten" },
    { name: t("nav.about"), path: "/about" },
    { name: language === "bs" ? "Novosti" : "Neuigkeiten", path: "/news" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "bs" ? "de" : "bs");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">
      <div
        className={`max-w-6xl mx-auto rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-card/85 backdrop-blur-2xl shadow-lg border border-border/50"
            : "bg-card/40 backdrop-blur-xl border border-white/10"
        }`}
      >
        <div className="flex justify-between items-center h-14 sm:h-16 px-4 sm:px-6">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Et-Taqwa Moschee" className="h-8 w-auto" />
            <div className="hidden lg:block">
              <div className="text-sm font-bold text-foreground tracking-tight leading-tight">Et-Taqwa</div>
              <div className="text-[10px] text-muted-foreground font-amiri leading-tight">مسجد التقوى</div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
            >
              <Languages className="h-3.5 w-3.5" />
              <span className="text-xs font-bold">{language === "bs" ? "DE" : "BS"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-muted/60 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-3 pb-4 space-y-0.5 border-t border-border/30 pt-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground/80 hover:bg-muted/60"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted/60 transition-colors mt-1"
                >
                  <Languages className="h-4 w-4" />
                  {language === "bs" ? "Deutsch" : "Bosanski"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
