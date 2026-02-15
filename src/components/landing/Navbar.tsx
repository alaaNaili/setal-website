import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/languageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t("nav.howItWorks"), href: "/#how-it-works" },
    { label: t("nav.citizens"), href: "/#citizens" },
    { label: t("nav.municipalities"), href: "/#municipalities" },
    { label: t("nav.blog"), href: "/blog" },
    // { label: t("nav.impact"), href: "#impact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-transparent"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex h-12 items-center justify-between md:h-16">
          {/* LEFT: Logo block */}
          <div className="rounded-full bg-background/40 px-3 py-1 backdrop-blur-lg shadow-soft">
            <a href="/" className="flex gap-2 items-center ">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg md:h-10 md:w-9">
                <img
                  src="/SETAL.png"
                  alt="Setal logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold md:text-base">S.E.T.A.L.</span>
            </a>
          </div>

          {/* CENTER: Pages block */}
          <div className="hidden rounded-full bg-background/40 shadow-soft px-8 py-3 backdrop-blur-lg md:flex">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          {/* RIGHT: Language Switcher + Contact / CTA block */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link to="/Help">
              <Button className="text-base rounded-full px-4 py-2">
                {t("nav.contact")}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur-lg md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-16 border-b border-border bg-background p-6 shadow-lg md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-2 border-border" />
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <Button variant="default" className="flex-1">
                  {t("nav.getStarted")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;