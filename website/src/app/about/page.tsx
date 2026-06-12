"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { buildWhatsAppURL } from "@/lib/wa";
import { PHONE } from "@/lib/constants";
import { playfairDisplay } from "@/lib/fonts";
import { inter } from "@/lib/fonts";

import StatsCounter from "@/components/shared/StatsCounter";
import SectionCTA from "@/components/shared/SectionCTA";

const values = [
  {
    id: "excellence",
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service, ensuring every event is memorable.",
    icon: "Star",
  },
  {
    id: "hospitality",
    title: "Hospitality",
    description: "We treat every guest like family, creating a welcoming and warm atmosphere.",
    icon: "Heart",
  },
  {
    id: "integrity",
    title: "Integrity",
    description: "We believe in honesty, transparency, and building trust with every client.",
    icon: "ShieldCheck",
  },
  {
    id: "community",
    title: "Community",
    description: "We are proud to serve our local community and support local traditions.",
    icon: "Users",
  },
] as const;

const handleBookNow = () => {
  const url = buildWhatsAppURL(PHONE, "Assalamualaikum, Mujhe apka farmhouse book krwana ha. Date: [Date] Guests: [Guests]");
  window.open(url, "_blank");
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#F5ECD7]">
      {/* Hero Section - Farmhouse Background */}
      <section className="bg-[#1B3A2D] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/interior-main-building.jpg"
            alt="About Sunny FarmHouse"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1B3A2D]/70 to-[#1B3A2D]/90" />
        <div className="container mx-auto px-4 relative z-20">
          <h1
            className={`${playfairDisplay.className} mb-6 text-4xl md:text-5xl font-bold text-white`}
          >
            About Sunny FarmHouse
          </h1>
          <p className={`${inter.className} text-xl text-[#F5ECD7]/90 max-w-2xl mx-auto`}>
            Experience the charm of countryside living at Sunny FarmHouse
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2
                className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-[#1B3A2D]`}
              >
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Established in 2010, Sunny FarmHouse has been hosting unforgettable events for over a decade. What began as a modest family property has grown into one of the most sought-after venue destinations in the region.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our journey began with a simple vision: to create a space where families and communities could come together to celebrate life's most important moments. From intimate gatherings to grand celebrations, we have been honored to be part of countless special occasions.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Today, we combine traditional charm with modern amenities to provide our guests with an exceptional experience. Our team is dedicated to ensuring every detail of your event is perfectly executed.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-[#D4A843] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/pools.jpg"
                  alt="Sunny Farmhouse Pool"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#D4A843]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatsCounter value={1000} label="Happy Guests" />
            <StatsCounter value={3} label="AC Rooms" />
            <StatsCounter value={200} label="Happy Clients" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2
            className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B3A2D]`}
          >
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const iconKey = value.icon as keyof typeof LucideIcons;
              const Icon = LucideIcons[iconKey] as React.FC<React.SVGProps<SVGSVGElement>>;
              return (
                <div
                  key={value.id}
                  className="bg-[#F5ECD7] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <Icon size={48} className="text-[#1B3A2D] mx-auto mb-4" />
                  <h3 className={`${playfairDisplay.className} text-xl font-bold mb-2 text-[#1B3A2D]`}>
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team/About Callout */}
      <section className="py-20 bg-[#1B3A2D]">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-white mb-6`}
          >
            Meet Our Team
          </h2>
          <p className={`${inter.className} text-xl text-[#F5ECD7]/90 max-w-2xl mx-auto mb-8`}>
            Our dedicated team is here to make your event extraordinary
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Ahmed Khan", role: "Event Manager", img: "AH" },
              { name: "Sara Ali", role: "Coordination Lead", img: "SA" },
              { name: "Imran Ahmed", role: "Operations Head", img: "IA" },
            ].map((member, idx) => (
              <div key={idx} className="bg-[#F5ECD7] rounded-2xl p-6">
                <div className="w-20 h-20 bg-[#1B3A2D] rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold mb-4">
                  {member.img}
                </div>
                <h3 className="font-bold text-[#1B3A2D]">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
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
