"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { PACKAGES, FACILITIES, MAP_URL } from "@/lib/constants";
import { playfairDisplay } from "@/lib/fonts";
import { inter } from "@/lib/fonts";

import PricingCard from "@/components/ui/PricingCard";
import FacilityCard from "@/components/ui/FacilityCard";
import SectionCTA from "@/components/shared/SectionCTA";

// Occasions data
const occasions = [
  {
    id: "family",
    title: "Family Gatherings",
    description: "Create lasting memories with your loved ones in our spacious grounds",
    icon: "Users",
  },
  {
    id: "school",
    title: "School Events",
    description: "Perfect venue for school picnics, sports days, and cultural events",
    icon: "BookOpen",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    description: "Team building, conferences, and corporate retreats in nature",
    icon: "Briefcase",
  },
] as const;

// Social proof testimonials
const testimonials = [
  {
    id: 1,
    name: "Ayesha Khan",
    event: "Wedding - Jun 2024",
    text: "Sunny FarmHouse was simply magical! Every guest raved about the venue.",
    rating: 5,
  },
  {
    id: 2,
    name: "Saad Ahmed",
    event: "Corporate Retreat - May 2024",
    text: "Beautiful location with excellent facilities. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Fatima Zahra",
    event: "Birthday Party - Apr 2024",
    text: "The best venue we have ever booked. Staff was incredibly helpful.",
    rating: 5,
  },
  {
    id: 4,
    name: "Omar Farooq",
    event: "Photoshoot - Mar 2024",
    text: "The natural lighting and scenery made our photoshoot unforgettable.",
    rating: 5,
  },
  {
    id: 5,
    name: "Sarah Malik",
    event: "Family Reunion - Feb 2024",
    text: "Spacious, clean, and perfect for our family gathering. 10/10!",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5ECD7]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#1B3A2D] overflow-hidden">
        {/* Background image - Pool at Sunny FarmHouse */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/pools.jpg"
            alt="Sunny Farmhouse Pool - Pakistani Venue"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay with gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1B3A2D]/80 via-[#2D5A40]/70 to-[#1B3A2D]/80" />
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4A843] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#D4A843] via-transparent to-transparent" />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <h1
            className={`${playfairDisplay.className} mb-6 text-5xl md:text-7xl font-bold text-white leading-tight`}
          >
            Your Private Escape Awaits
          </h1>
          <p
            className={`${inter.className} mb-10 text-xl md:text-2xl text-[#F5ECD7]/90 max-w-2xl mx-auto`}
          >
            Experience the charm of countryside living at Sunny FarmHouse.
            Perfect for weddings, corporate events, and photoshoots.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/booking"
              className="rounded-full bg-[#25D366] px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-[#20bd5a] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#1B3A2D]"
            >
              Book Now
            </a>
            <a
              href="/booking"
              className="rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-[#1B3A2D] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1B3A2D]"
            >
              See Packages
            </a>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-[#D4A843] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "Users", label: "1000+ Happy ", desc: "Guests" },
              { icon: "BedDouble", label: "AC Rooms", desc: "3 Rooms" },
              { icon: "Flame", label: "BBQ Area", desc: "Outdoor" },
              { icon: "Trophy", label: "Cricket", desc: "Ground Available" },
            ].map((item, index) => {
              const iconKey = item.icon as keyof typeof LucideIcons;
              const Icon = LucideIcons[iconKey] as React.FC<{ size?: number; className?: string }>;
              return (
                <div key={index} className="flex flex-col items-center text-white">
                  <Icon size={32} className="mb-2 text-[#1B3A2D]" />
                  <span className="font-bold text-lg">{item.label}</span>
                  <span className="text-xs opacity-90">{item.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-20 bg-[#F5ECD7]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B3A2D]">
            Perfect for Every Occasion
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {occasions.map((occasion) => {
              const iconKey = occasion.icon as keyof typeof LucideIcons;
              const Icon = LucideIcons[iconKey] as React.FC<{ size?: number; className?: string }>;

              return (
                <div
                  key={occasion.id}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={48} className="text-[#D4A843] mb-6" />
                  <h3 className="text-2xl font-bold mb-3 text-[#1B3A2D]">
                    {occasion.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{occasion.description}</p>
                  <a
                    href="/booking"
                    className="w-full rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-all hover:bg-[#20bd5a] hover:scale-105"
                  >
                    Enquire Now
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B3A2D]">
            Our Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(PACKAGES).map(([key, packageData]) => (
              <PricingCard
                key={key}
                packageData={packageData}
                bookMsg="Book Now"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-[#F5ECD7]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B3A2D]">
            Trusted by 500+ Families
          </h2>

          <div className="flex flex-col items-center mb-8">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-8 h-8 text-[#D4A843]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#D4A843]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="text-sm font-semibold text-[#1B3A2D]">
                  {testimonial.name}
                </div>
                <div className="text-xs text-gray-500">{testimonial.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <SectionCTA
        headline="Ready to Make Memories?"
        btnText="Book Your Event Now"
      />
    </div>
  );
}
