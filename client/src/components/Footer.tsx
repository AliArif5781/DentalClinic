import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl text-primary-foreground">✨</span>
              </div>
              <span className="text-xl font-bold font-serif">Bright Smile</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Your trusted partner for exceptional dental care and beautiful, healthy smiles.
            </p>
            <div className="flex gap-4">
              <button
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                data-testid="button-facebook"
                onClick={() => console.log("Facebook clicked")}
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                data-testid="button-instagram"
                onClick={() => console.log("Instagram clicked")}
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                data-testid="button-twitter"
                onClick={() => console.log("Twitter clicked")}
              >
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-services"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-about"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-team"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>General Dentistry</li>
              <li>Cosmetic Dentistry</li>
              <li>Dental Implants</li>
              <li>Orthodontics</li>
              <li>Emergency Care</li>
              <li>Pediatric Dentistry</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>123 Main Street, Suite 200</li>
              <li>Anytown, CA 12345</li>
              <li className="pt-2">(555) 123-4567</li>
              <li>info@brightsmile.dental</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>© 2024 Bright Smile Dental. All rights reserved.</div>
          <div className="flex gap-6">
            <button className="hover:text-primary transition-colors" data-testid="link-privacy">
              Privacy Policy
            </button>
            <button className="hover:text-primary transition-colors" data-testid="link-terms">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
