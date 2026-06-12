"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { buildWhatsAppURL } from "@/lib/wa";
import { PHONE, MAP_URL } from "@/lib/constants";
import { playfairDisplay } from "@/lib/fonts";
import { inter } from "@/lib/fonts";
import Image from "next/image";

import SectionCTA from "@/components/shared/SectionCTA";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    dayPreference: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build WhatsApp message from form data
    const message = `Assalamualaikum,\n\nI would like to book the farmhouse.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nDate Preference: ${formData.dayPreference || "TBD"}\nMessage: ${formData.message || "N/A"}\n\nAp details bata skty hn?`;

    const url = buildWhatsAppURL(PHONE, message);

    // Open WhatsApp in new tab
    window.open(url, "_blank");

    // Reset form
    setFormData({ name: "", phone: "", message: "", dayPreference: "" });
    setSubmitStatus("success");

    // Reset status after 3 seconds
    setTimeout(() => {
      setSubmitStatus("idle");
    }, 3000);

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#F5ECD7]">
      {/* Hero Section - Contact Background */}
      <section className="bg-[#1B3A2D] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/interior-main-building.jpg"
            alt="Contact Sunny FarmHouse"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1B3A2D]/70 to-[#1B3A2D]/90" />
        <div className="container mx-auto px-4 relative z-20">
          <h1
            className={`${playfairDisplay.className} mb-6 text-4xl md:text-5xl font-bold text-white`}
          >
            Get In Touch
          </h1>
          <p className={`${inter.className} text-xl text-[#F5ECD7]/90 max-w-2xl mx-auto`}>
            We're here to help you plan your perfect event
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2
                className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-8`}
              >
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4A843] rounded-full p-3">
                    <LucideIcons.Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1B3A2D] mb-1">Call Us</h3>
                    <a
                      href={`tel:+923312499496`}
                      className="text-gray-600 hover:text-[#D4A843] transition-colors"
                    >
                      +92 331 2499496
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      Monday - Saturday: 9 AM - 8 PM
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#25D366] rounded-full p-3">
                    <LucideIcons.MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1B3A2D] mb-1">WhatsApp</h3>
                    <a
                      href={`https://wa.me/923312499496`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#25D366] transition-colors"
                    >
                      +92 331 2499496
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#1B3A2D] rounded-full p-3">
                    <LucideIcons.Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1B3A2D] mb-1">Email</h3>
                    <a
                      href="mailto:info@firpofarmhouse.com"
                      className="text-gray-600 hover:text-[#1B3A2D] transition-colors"
                    >
                      info@firpofarmhouse.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4A843] rounded-full p-3">
                    <LucideIcons.MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1B3A2D] mb-1">Visit Us</h3>
                    <p className="text-gray-600">Sunny FarmHouse</p>
                    <p className="text-gray-600">Lahore - Kasur Road</p>
                    <p className="text-gray-600">Punjab, Pakistan</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4A843] rounded-full p-3">
                    <LucideIcons.Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1B3A2D] mb-1">Opening Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 9 AM - 8 PM</p>
                    <p className="text-gray-600">Sunday: By Appointment Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2
                className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-8`}
              >
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A843] focus:border-[#D4A843] transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A843] focus:border-[#D4A843] transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Day Preference */}
                <div>
                  <label htmlFor="dayPreference" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Day
                  </label>
                  <select
                    id="dayPreference"
                    name="dayPreference"
                    value={formData.dayPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A843] focus:border-[#D4A843] transition-colors bg-white"
                  >
                    <option value="">Select a preference</option>
                    <option value="weekday">Weekday (Mon-Thu)</option>
                    <option value="friday">Friday</option>
                    <option value="weekend">Weekend (Sat-Sun)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A843] focus:border-[#D4A843] transition-colors"
                    placeholder="Tell us about your event..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-full font-semibold text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#25D366] hover:bg-[#20bd5a] focus:ring-[#25D366]"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Start Conversation on WhatsApp"}
                </button>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className="text-green-600 text-center font-medium">
                    Message opened in WhatsApp! Please complete your booking.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 bg-[#F5ECD7]">
        <div className="container mx-auto px-4">
          <div className="w-full">
            <h2
              className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-center mb-8 text-[#1B3A2D]`}
            >
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
        headline="Ready to Book Your Event?"
        btnText="Book Now on WhatsApp"
      />
    </div>
  );
}
