import { NavLink } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    <nav className="bg-card/98 backdrop-blur-md border-b border-border/40 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={logo} alt="Et-Taqwa Moschee" className="h-10 w-auto" />
            <div className="hidden md:block">
              <div className="text-base font-semibold text-foreground">Et-Taqwa Moschee</div>
              <div className="text-xs text-primary font-arabic">مسجد التقوى</div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="w-px h-5 bg-border/60 mx-2" />
            <NavLink
              to="/auth"
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              Admin
            </NavLink>
            <div className="flex items-center gap-1.5 ml-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="gap-1.5 h-9 border-border/50 hover:border-primary/30 hover:bg-primary/5 text-sm"
              >
                <Languages className="h-4 w-4" />
                {language === "bs" ? "DE" : "BS"}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-3 space-y-1 animate-fade-in border-t border-border/40">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            >
              Admin
            </NavLink>
            <div className="pt-2 px-3 flex gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex-1 gap-1.5 h-9 border-border/50"
              >
                <Languages className="h-4 w-4" />
                {language === "bs" ? "Deutsch" : "Bosanski"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;