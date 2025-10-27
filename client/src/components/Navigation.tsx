import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl text-primary-foreground">✨</span>
            </div>
            <span className="text-xl font-bold font-serif">Bright Smile Dental</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="link-services"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="link-about"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="link-team"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="link-contact"
            >
              Contact
            </button>
            <Button onClick={() => scrollToSection("contact")} data-testid="button-book-appointment">
              Book Appointment
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-services-mobile"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-about-mobile"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-team-mobile"
              >
                Team
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left px-4 py-2 text-foreground hover:text-primary transition-colors font-medium"
                data-testid="link-contact-mobile"
              >
                Contact
              </button>
              <div className="px-4">
                <Button className="w-full" onClick={() => scrollToSection("contact")} data-testid="button-book-appointment-mobile">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
