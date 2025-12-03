import { NavLink } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <nav className="bg-card/95 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={logo} alt="Et-Taqwa Moschee" className="h-12 w-auto" />
            <div className="hidden md:block">
              <div className="text-lg font-bold text-foreground tracking-tight">Et-Taqwa Moschee</div>
              <div className="text-sm text-primary font-arabic">مسجد التقوى</div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            <NavLink
              to="/auth"
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            >
              Admin
            </NavLink>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="ml-2 gap-2 border-border/50 hover:border-primary hover:bg-primary/5"
            >
              <Languages className="h-4 w-4" />
              {language === "bs" ? "DE" : "BS"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-1 animate-fade-in border-t border-border/50">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            >
              Admin
            </NavLink>
            <div className="pt-2 px-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="w-full gap-2"
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