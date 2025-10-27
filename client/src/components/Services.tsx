import { Card } from "@/components/ui/card";
import { Sparkles, Shield, Activity, Zap, Clock, Baby } from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "General Dentistry",
    description: "Comprehensive oral health care including routine check-ups, cleanings, and preventive treatments to keep your smile healthy.",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with teeth whitening, veneers, and bonding procedures for a confident, radiant appearance.",
  },
  {
    icon: Shield,
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions that look and function like natural teeth with our advanced implant technology.",
  },
  {
    icon: Zap,
    title: "Orthodontics",
    description: "Straighten your teeth with traditional braces or clear aligners for a perfectly aligned, beautiful smile.",
  },
  {
    icon: Clock,
    title: "Emergency Care",
    description: "Immediate dental care when you need it most. We're here for dental emergencies 24/7 to relieve your pain.",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    description: "Gentle, specialized care for children's dental needs in a fun, comfortable environment that kids love.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4" data-testid="text-services-title">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive dental care tailored to your unique needs, delivered with expertise and compassion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-8 hover-elevate active-elevate-2 transition-all cursor-pointer"
                data-testid={`card-service-${index}`}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3" data-testid={`text-service-title-${index}`}>
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-service-desc-${index}`}>
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
