import { Card } from "@/components/ui/card";
import { ArrowUpRight, Clock, Shield, Award, Heart } from "lucide-react";
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
    <>
      <section className="min-h-[calc(100vh-5rem)] bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:via-transparent dark:to-accent/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium border border-primary/20">
                <Award className="w-4 h-4" />
                <span>Trusted by 10,000+ Happy Patients</span>
              </div>
              
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text"
                data-testid="text-hero-title"
              >
                Your Perfect Smile Starts with Lume Dental
              </h1>
              
              <p
                className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                data-testid="text-hero-subtitle"
              >
                Advanced dental care with a gentle touch. Experience personalized treatment from our expert team in a comfortable, modern environment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
                <Card className="p-6 bg-card border-border hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Working Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium text-foreground">9AM - 9PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday, Sunday</span>
                      <span className="font-medium text-foreground">10AM - 6PM</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t text-sm">
                    <span className="text-muted-foreground">Today </span>
                    <span className="font-semibold text-foreground">
                      {dayName}, {time}
                    </span>
                  </div>
                </Card>

                <Card
                  className="p-6 bg-primary text-primary-foreground cursor-pointer hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 flex items-center justify-between group"
                  onClick={() => setLocation("/booking")}
                  data-testid="card-book-appointment"
                >
                  <span className="text-xl font-bold">Book an Appointment</span>
                  <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Card>
              </div>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 delay-150">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
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

      <section className="py-20 bg-muted/30 dark:bg-muted/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Lume Dental?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We combine cutting-edge technology with compassionate care to deliver exceptional dental experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="card-feature-expertise">
              <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Care</h3>
              <p className="text-muted-foreground">
                Our experienced dentists stay current with the latest techniques and technologies to provide you with the best possible care.
              </p>
            </Card>

            <Card className="p-8 bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="card-feature-comfort">
              <div className="w-12 h-12 rounded-lg bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Patient Comfort</h3>
              <p className="text-muted-foreground">
                We prioritize your comfort with a relaxing environment, gentle techniques, and transparent communication every step of the way.
              </p>
            </Card>

            <Card className="p-8 bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="card-feature-technology">
              <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Modern Technology</h3>
              <p className="text-muted-foreground">
                State-of-the-art equipment and digital systems ensure precise diagnoses and efficient, comfortable treatments.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
