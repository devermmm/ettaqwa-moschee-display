import { NavLink } from "react-router-dom";
import { Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "./Logo";

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
    <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo className="h-12 w-12" />
            <div className="hidden md:block">
              <div className="text-lg font-bold text-[#2d7b7f]">Et-Taqwa Moschee</div>
              <div className="text-sm text-[#2d7b7f] font-amiri">مسجد التقوى - Wien</div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/auth"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
              Admin
            </NavLink>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="ml-2 flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              {language === "bs" ? "DE" : "BS"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin
            </NavLink>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center gap-2"
            >
              <Languages className="h-4 w-4" />
              {language === "bs" ? "Deutsch" : "Bosanski"}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
