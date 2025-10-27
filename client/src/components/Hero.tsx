import { Button } from "@/components/ui/button";
import { Award, Clock, Users } from "lucide-react";
import heroImage from "@assets/generated_images/Modern_dental_clinic_reception_fbf6df97.png";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight" data-testid="text-hero-title">
            Your Smile, Our Priority
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
            Experience exceptional dental care with our team of experienced professionals. 
            We combine advanced technology with compassionate service to give you the 
            healthy, beautiful smile you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" onClick={() => scrollToSection("contact")} data-testid="button-hero-book">
              Book Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-sm bg-background/50"
              onClick={() => scrollToSection("services")}
              data-testid="button-hero-learn"
            >
              Learn More
            </Button>
          </div>

          <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold" data-testid="text-experience-years">20+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold" data-testid="text-happy-patients">5000+</div>
                <div className="text-sm text-muted-foreground">Happy Patients</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold" data-testid="text-emergency-care">24/7</div>
                <div className="text-sm text-muted-foreground">Emergency Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
