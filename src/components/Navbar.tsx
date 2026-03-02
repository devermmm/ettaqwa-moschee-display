import { NavLink } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.prayerTimes"), path: "/gebetszeiten" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.projects"), path: "/projects" },
    { name: t("nav.courses"), path: "/courses" },
    { name: language === "bs" ? "Novosti" : "Neuigkeiten", path: "/news" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "bs" ? "de" : "bs");
  };

  return (
    <nav className="bg-card/80 backdrop-blur-2xl border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Et-Taqwa Moschee" className="h-9 w-auto" />
            <div className="hidden md:block">
              <div className="text-base font-bold text-foreground tracking-tight">Et-Taqwa Moschee</div>
              <div className="text-xs text-muted-foreground font-amiri">مسجد التقوى - Wien</div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/auth"
              className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
              Login
            </NavLink>
            <div className="w-px h-5 bg-border mx-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Languages className="h-4 w-4" />
              <span className="text-xs font-semibold">{language === "bs" ? "DE" : "BS"}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-3 space-y-1 border-t border-border/50">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <NavLink
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </NavLink>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center gap-2 mt-1"
                >
                  <Languages className="h-4 w-4" />
                  {language === "bs" ? "Deutsch" : "Bosanski"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
