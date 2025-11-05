import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { LogOut, LogIn } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingNav() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: authData } = useQuery<{ user?: any }>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/logout", {});
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
    },
  });

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

          <div className="hidden md:flex items-center gap-6">
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
            
            <div className="flex items-center gap-3 ml-2">
              <ThemeToggle />
              
              <Button 
                onClick={() => setLocation("/booking")} 
                className="bg-foreground text-background hover:bg-foreground/90"
                data-testid="button-book-nav"
              >
                Book an Appointment
              </Button>
              
              {authData?.user ? (
                <Button 
                  variant="outline"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                  className="gap-2"
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => setLocation("/login")}
                  className="gap-2"
                  data-testid="button-login-nav"
                >
                  <LogIn className="w-4 h-4" />
                  Doctor Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
