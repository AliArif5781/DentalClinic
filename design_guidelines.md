# Dental Clinic Landing Page - Design Guidelines

## Design Approach
**Reference-Based Design** drawing from premium healthcare and service industry leaders (modern dental practices, medical spas, boutique healthcare). Focus on trust-building through clean, professional aesthetics with warm, welcoming touches that reduce patient anxiety.

## Typography System
- **Primary Font**: Inter (Google Fonts) - clean, professional, highly legible
- **Accent Font**: Playfair Display (for elegant headlines)
- **Hierarchy**:
  - Hero headline: text-5xl/text-6xl, font-bold (Playfair Display)
  - Section headings: text-3xl/text-4xl, font-bold
  - Subsections: text-xl/text-2xl, font-semibold
  - Body: text-base/text-lg, font-normal, leading-relaxed
  - Small text: text-sm

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-16 (mobile) to py-24/py-32 (desktop)
- Component gaps: gap-6, gap-8, gap-12
- Container: max-w-7xl with px-6 to px-8

## Page Structure & Sections

### 1. Navigation
Sticky header with transparent-to-solid transition on scroll
- Logo (left), navigation links (center), "Book Appointment" CTA button (right)
- Mobile: Hamburger menu

### 2. Hero Section (80vh minimum)
**Large hero image**: Modern dental office with natural lighting, patients smiling, or close-up of pristine dental equipment
- Overlay with subtle gradient for text legibility
- Headline + supporting tagline + two CTAs (primary "Book Appointment", secondary "Learn More")
- Trust indicators below CTAs: "20+ Years Experience" | "5000+ Happy Patients" | "Emergency Care Available"

### 3. Services Section
**Multi-column grid**: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- 6-8 service cards with icons (from Heroicons), title, brief description
- Services: General Dentistry, Cosmetic Dentistry, Orthodontics, Dental Implants, Emergency Care, Teeth Whitening, Preventive Care, Pediatric Dentistry
- Each card with soft rounded corners (rounded-xl), subtle shadows

### 4. Why Choose Us Section
**2-column layout**: Left side - image of dental team or modern facility; Right side - 4-5 key benefits
- Benefits with checkmark icons and bold headings
- Include: Advanced Technology, Experienced Team, Flexible Scheduling, Insurance Accepted, Pain-Free Treatments

### 5. Team Section
**3-column grid**: Feature 3-4 key dentists with professional photos
- Each card: circular headshot, name, specialty, brief credential
- "Meet Our Team" CTA linking to full team page

### 6. Testimonials Section
**2-column grid**: 4 testimonial cards with patient quotes
- Include patient name, treatment type, 5-star rating
- Use actual quotation marks for visual design

### 7. Contact & Location Section
**2-column layout**: 
- Left: Contact form (Name, Email, Phone, Preferred Date, Message)
- Right: Address, phone, email, hours, embedded map placeholder
- Include office hours clearly displayed

### 8. Footer
**3-column layout**: 
- Column 1: Logo, tagline, social media icons
- Column 2: Quick links (Services, About, Team, Contact)
- Column 3: Contact info, newsletter signup
- Bottom bar: Copyright, Privacy Policy, Terms

## Component Library

### Buttons
- Primary: Full background, medium rounded (rounded-lg), font-semibold, px-8 py-3
- Secondary: Outline style with border-2
- Buttons on images: backdrop-blur-sm with semi-transparent background

### Cards
- rounded-xl with shadow-lg
- p-6 to p-8 internal padding
- Hover: subtle lift effect (transform translate-y)

### Form Inputs
- rounded-lg borders
- py-3 px-4 padding
- Focus states with ring effect

### Icons
Use **Heroicons** via CDN - outline style for consistency
- Service icons: tooth, sparkles, shield, clock
- Checkmarks for benefits
- Location, phone, email for contact

## Images Required
1. **Hero Image**: Wide dental office shot with warm, natural lighting (2000x1200px minimum)
2. **Services Images**: Modern dental equipment close-ups (optional background images for cards)
3. **Team Photos**: 3-4 professional headshots with neutral backgrounds
4. **Facility Image**: Modern, clean dental office interior for "Why Choose Us"
5. **Testimonial Avatars**: Generic patient photos or illustrated avatars

## Accessibility
- Consistent focus indicators on all interactive elements
- Proper heading hierarchy (h1 → h6)
- Alt text for all images
- Form labels properly associated
- Minimum contrast ratios met

## Animations
Use sparingly:
- Fade-in on scroll for sections
- Subtle hover lift on cards
- Smooth scroll to sections from navigation