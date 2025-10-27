import { Check } from "lucide-react";
import facilityImage from "@assets/generated_images/Modern_dental_treatment_room_44c8212c.png";

const benefits = [
  {
    title: "Advanced Technology",
    description: "State-of-the-art equipment for precise, comfortable treatments",
  },
  {
    title: "Experienced Team",
    description: "Highly qualified dentists with decades of combined experience",
  },
  {
    title: "Flexible Scheduling",
    description: "Evening and weekend appointments to fit your busy life",
  },
  {
    title: "Insurance Accepted",
    description: "We work with most major insurance providers",
  },
  {
    title: "Pain-Free Treatments",
    description: "Modern techniques ensuring your comfort throughout every procedure",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={facilityImage}
              alt="Modern dental facility"
              className="rounded-xl shadow-lg w-full object-cover"
              data-testid="img-facility"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6" data-testid="text-why-choose-title">
              Why Choose Bright Smile Dental?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're committed to providing exceptional dental care in a warm, welcoming environment. 
              Our patient-first approach ensures you receive personalized treatment that exceeds your expectations.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4" data-testid={`benefit-${index}`}>
                  <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1" data-testid={`text-benefit-title-${index}`}>
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-benefit-desc-${index}`}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
