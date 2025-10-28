import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";
import heroPortrait from "@assets/generated_images/dental-doctor.png";

export default function LandingHero() {
  const [, setLocation] = useLocation();
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const time = today.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              data-testid="text-hero-title"
            >
              Your Perfect Smile Starts with Lume Dental
            </h1>
            <p
              className="text-lg text-muted-foreground"
              data-testid="text-hero-subtitle"
            >
              Advanced dental care with a gentle touch.
              <br />
              Book your appointment today.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
              <Card className="p-6 bg-card">
                <h3 className="font-bold mb-3">Working Hours</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    Monday - Friday<span className="ml-4">9AM - 9PM</span>
                  </div>
                  <div>
                    Saturday, Sunday<span className="ml-2">10AM - 6PM</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t text-sm">
                  <span className="text-muted-foreground">Today </span>
                  <span className="font-semibold">
                    {dayName}, {time}
                  </span>
                </div>
              </Card>

              <Card
                className="p-6 bg-primary text-primary-foreground cursor-pointer hover-elevate active-elevate-2 transition-all flex items-center justify-between"
                onClick={() => setLocation("/booking")}
                data-testid="card-book-appointment"
              >
                <span className="text-xl font-bold">Book an Appointment</span>
                <ArrowUpRight className="w-6 h-6" />
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-primary/20">
              <img
                src={heroPortrait}
                alt="Happy patient with bright smile"
                className="w-full h-auto object-cover"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
