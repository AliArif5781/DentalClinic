import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import femaleDentist from "@assets/generated_images/Female_dentist_professional_headshot_b0471bd8.png";
import maleDentist from "@assets/generated_images/Male_dentist_professional_headshot_10d77a39.png";

const teamMembers = [
  {
    name: "Dr. Sarah Anderson",
    specialty: "General & Cosmetic Dentistry",
    credentials: "DDS, 15 years experience",
    image: femaleDentist,
    initials: "SA",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Orthodontics & Implants",
    credentials: "DMD, MBA, 12 years experience",
    image: maleDentist,
    initials: "MC",
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatric Dentistry",
    credentials: "DDS, Pediatric Specialist",
    image: femaleDentist,
    initials: "ER",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4" data-testid="text-team-title">
            Meet Our Expert Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our experienced dentists are dedicated to providing you with the highest quality care 
            and helping you achieve optimal oral health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="p-8 text-center hover-elevate active-elevate-2 transition-all"
              data-testid={`card-team-${index}`}
            >
              <Avatar className="w-32 h-32 mx-auto mb-6">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback className="text-2xl">{member.initials}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold mb-2" data-testid={`text-team-name-${index}`}>
                {member.name}
              </h3>
              <p className="text-primary font-semibold mb-2" data-testid={`text-team-specialty-${index}`}>
                {member.specialty}
              </p>
              <p className="text-sm text-muted-foreground" data-testid={`text-team-credentials-${index}`}>
                {member.credentials}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
