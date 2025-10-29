import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Home } from "lucide-react";

export default function AuthNav() {
  const [, setLocation] = useLocation();

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-lg text-primary-foreground">🦷</span>
            </div>
            <span className="text-xl font-bold">Lume Dental</span>
          </div>

          <Button 
            variant="outline"
            onClick={() => setLocation("/")}
            className="gap-2"
            data-testid="button-home"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </nav>
  );
}
