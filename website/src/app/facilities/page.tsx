"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { FACILITIES, MAP_URL, PHONE } from "@/lib/constants";
import { buildWhatsAppURL } from "@/lib/wa";
import { playfairDisplay } from "@/lib/fonts";
import { inter } from "@/lib/fonts";

import FacilityCard from "@/components/ui/FacilityCard";
import SectionCTA from "@/components/shared/SectionCTA";

const poolFacilities = [
  {
    id: "main-pool",
    name: "Main Swimming Pool",
    description: "25-meter Olympic-sized pool with changing rooms and lifeguard",
    capacity: "50 guests",
    features: ["Lifeguard on duty", "Changing facilities", "Sun loungers"],
  },
  {
    id: "children-pool",
    name: "Children's Pool",
    description: "Shallow pool designed specifically for kids' safety and fun",
    capacity: "20 guests",
    features: ["Water slides", "Shallow area", "Sun shelter"],
  },
] as const;

const handleEnquire = () => {
  const url = buildWhatsAppURL(PHONE, "Hi, I'm interested in booking. Please share your available dates and pricing details.");
  window.open(url, "_blank");
};

const handleBookNow = () => {
  const url = buildWhatsAppURL(PHONE, "Assalamualaikum, Mujhe apka farmhouse book krwana ha. Date: [Date] Guests: [Guests]");
  window.open(url, "_blank");
};

// Facility-specific images from public folder
const getFacilityImage = (facilityId: string) => {
  const images: Record<string, string> = {
    "ac-bedrooms": "/air-condition-rooms.jpg",
    "swimming-pool": "/pools.jpg",
    "cricket-ground": "/circket-play-area.jpg",
    "bbq-patio": "/outdoor-kitchen.jpg",
    "parking": "/parking-area.jpg",
    "play-equipment": "/variety-of-slides.jpg",
    "outdoor-sitting": "/outdoor-sitting.jpg",
    "indoor-games": "/indoor-sitting.jpg",
    "attached-bathrooms": "/attached-bathrooms.jpeg",
  };
  return images[facilityId] || images["swimming-pool"];
};

export default function Facilities() {
  return (
    <div className="min-h-screen bg-[#F5ECD7]">
      {/* Hero Section - Farmhouse Exterior */}
      <section className="bg-[#1B3A2D] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/interior-main-building.jpg"
            alt="Sunny Farmhouse Exterior - Pakistani Venue"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1B3A2D]/70 to-[#1B3A2D]/90" />
        <div className="container mx-auto px-4 relative z-20">
          <h1
            className={`${playfairDisplay.className} mb-6 text-4xl md:text-5xl font-bold text-white`}
          >
            Our Facilities
          </h1>
          <p className={`${inter.className} text-xl text-[#F5ECD7]/90 max-w-2xl mx-auto`}>
            Experience the best in venue amenities and services
          </p>
        </div>
      </section>

      {/* Pool Highlight Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B3A2D]`}>
            Swimming Pool Complex
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {poolFacilities.map((pool, index) => (
              <div
                key={pool.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                {/* Pool Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={index === 0 ? "/pool-depth-6ft.jpg" : "/variety-of-slides.jpg"}
                    alt={pool.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                <h3 className={`${playfairDisplay.className} text-2xl font-bold mb-4 text-[#1B3A2D]`}>
                  {pool.name}
                </h3>
                <p className="text-gray-600 mb-6">{pool.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <LucideIcons.Users className="text-[#D4A843]" size={20} />
                    <span className="text-gray-700 font-medium">{pool.capacity}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <LucideIcons.CheckCircle className="text-[#D4A843]" size={20} />
                    <span className="text-gray-700">Featured amenity</span>
                  </div>
                </div>

                <h4 className="font-semibold text-[#1B3A2D] mb-3">Features:</h4>
                <ul className="space-y-2 mb-6">
                  {pool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <LucideIcons.CheckCircle size={16} className="text-[#D4A843]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleEnquire}
                  className="w-full rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-all hover:bg-[#20bd5a] hover:scale-105"
                >
                  Enquire on WhatsApp
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-[#F5ECD7]">
        <div className="container mx-auto px-4">
          <h2 className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B3A2D]`}>
            All Facilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((facility) => (
              <FacilityCard
                key={facility.id}
                name={facility.name}
                description={facility.description}
                iconName={facility.iconName}
                image={getFacilityImage(facility.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      <section className="py-20 bg-[#1B3A2D]">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-white mb-6`}
          >
            Ready to Book Your Event?
          </h2>
          <p className={`${inter.className} text-xl text-[#F5ECD7]/90 mb-8 max-w-2xl mx-auto`}>
            Contact us today to check availability and get a custom quote for your event
          </p>
          <button
            onClick={handleBookNow}
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-[#20bd5a] hover:scale-105"
          >
            Book Now on WhatsApp
          </button>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 bg-[#F5ECD7]">
        <div className="container mx-auto px-4">
          <div className="w-full">
            <h2 className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-center mb-8 text-[#1B3A2D]`}>
              Find Us
            </h2>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={MAP_URL}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Farmhouse Location"
              />
            </div>
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
