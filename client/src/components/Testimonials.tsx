import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Jennifer Martinez",
    treatment: "Dental Implants",
    text: "The team at Bright Smile Dental made my implant procedure so easy and painless. I'm thrilled with my new smile and the professional care I received.",
    initials: "JM",
  },
  {
    name: "David Thompson",
    treatment: "Cosmetic Dentistry",
    text: "After years of being self-conscious about my teeth, Dr. Anderson gave me the confidence to smile again. The teeth whitening results are amazing!",
    initials: "DT",
  },
  {
    name: "Lisa Chen",
    treatment: "Family Dentistry",
    text: "We've been coming here for 5 years with our whole family. The staff is wonderful with kids, and we always feel welcomed and well cared for.",
    initials: "LC",
  },
  {
    name: "Robert Williams",
    treatment: "Emergency Care",
    text: "Had a dental emergency on a weekend and they saw me immediately. Professional, caring, and got me out of pain quickly. Highly recommend!",
    initials: "RW",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4" data-testid="text-testimonials-title">
            What Our Patients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied patients have to say about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8" data-testid={`card-testimonial-${index}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg mb-6 leading-relaxed" data-testid={`text-testimonial-quote-${index}`}>
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold" data-testid={`text-testimonial-name-${index}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-testimonial-treatment-${index}`}>
                    {testimonial.treatment}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
