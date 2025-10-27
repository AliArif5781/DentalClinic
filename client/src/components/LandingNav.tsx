import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function LandingNav() {
  const [, setLocation] = useLocation();

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-md flex items-center justify-center">
              <span className="text-lg text-background">🦷</span>
            </div>
            <span className="text-xl font-bold">Lume Dental</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button className="text-foreground hover:text-foreground/70 transition-colors font-medium" data-testid="link-services">
              Services
            </button>
            <button className="text-foreground hover:text-foreground/70 transition-colors font-medium" data-testid="link-doctors">
              Doctors
            </button>
            <button className="text-foreground hover:text-foreground/70 transition-colors font-medium" data-testid="link-pricing">
              Pricing
            </button>
            <button className="text-foreground hover:text-foreground/70 transition-colors font-medium" data-testid="link-about">
              About us
            </button>
            <button className="text-foreground hover:text-foreground/70 transition-colors font-medium" data-testid="link-contacts">
              Contacts
            </button>
            <Button 
              onClick={() => setLocation("/booking")} 
              className="bg-foreground text-background hover:bg-foreground/90"
              data-testid="button-book-nav"
            >
              Book an Appointment
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
