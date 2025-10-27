import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Appointment Request Submitted",
      description: "We'll contact you shortly to confirm your appointment.",
    });
    setFormData({ name: "", email: "", phone: "", preferredDate: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4" data-testid="text-contact-title">
            Schedule Your Appointment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your smile? Get in touch with us today and let's start your journey 
            to optimal oral health.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6" data-testid="text-form-title">
              Request an Appointment
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="input-name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="input-email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  data-testid="input-phone"
                />
              </div>
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  data-testid="input-date"
                />
              </div>
              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  data-testid="input-message"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-submit-appointment">
                Submit Request
              </Button>
            </form>
          </Card>

          <div className="space-y-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6" data-testid="text-contact-info-title">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Address</div>
                    <div className="text-muted-foreground" data-testid="text-address">
                      123 Main Street, Suite 200<br />
                      Anytown, CA 12345
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <div className="text-muted-foreground" data-testid="text-phone">
                      (555) 123-4567
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-muted-foreground" data-testid="text-email">
                      info@brightsmile.dental
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Office Hours</div>
                    <div className="text-muted-foreground space-y-1" data-testid="text-hours">
                      <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                      <div>Saturday: 9:00 AM - 3:00 PM</div>
                      <div>Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-primary text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">Emergency Care</h3>
              <p className="mb-4 text-primary-foreground/90">
                Dental emergencies can happen anytime. We're here to help 24/7.
              </p>
              <p className="text-xl font-bold" data-testid="text-emergency-phone">
                Emergency: (555) 911-CARE
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
