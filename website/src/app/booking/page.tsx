"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { PACKAGES, FACILITIES, MAP_URL, PHONE } from "@/lib/constants";
import { buildWhatsAppURL } from "@/lib/wa";
import { playfairDisplay } from "@/lib/fonts";
import { inter } from "@/lib/fonts";

import PricingCard from "@/components/ui/PricingCard";
import SectionCTA from "@/components/shared/SectionCTA";

const faqItems = [
  {
    id: "faq-1",
    question: "What is the minimum guest count?",
    answer: "There is no minimum guest count. We welcome events of all sizes.",
  },
  {
    id: "faq-2",
    question: "What is the cancellation policy?",
    answer: "Cancellations made 30 days prior to the event date receive a full refund. Cancellations within 30 days are subject to a 50% fee.",
  },
  {
    id: "faq-3",
    question: "Are outside decorators allowed?",
    answer: "Yes, you are welcome to bring your own decorators. We also offer in-house decoration services.",
  },
  {
    id: "faq-4",
    question: "Is parking available for guests?",
    answer: "Yes, we have ample parking space for up to 100 vehicles.",
  },
  {
    id: "faq-5",
    question: "What are the check-in and check-out times?",
    answer: "Day bookings: 10 AM to 10 PM. Night bookings: 6 PM to 10 AM next day.",
  },
] as const;

// WhatsApp message template for booking
const BOOKING_WHATSAPP_TEMPLATE = `Assalamualaikum,

Mujhe apka FarmHouse book krwana ha.

Name: {name} ,
Phone: {phone} ,
Date: {date} ,
Number of Guests: {guests} ,
Message: {message} ,

Ap baki details bata skty hn?`;

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, phone, date, guests, message } = formData;

    // Build WhatsApp message from form data
    const messageTemplate = BOOKING_WHATSAPP_TEMPLATE
      .replace("{name}", name)
      .replace("{phone}", phone)
      .replace("{date}", date)
      .replace("{guests}", guests.toString())
      .replace("{message}", message || "N/A");

    const url = buildWhatsAppURL(PHONE, messageTemplate);

    // Open WhatsApp in new tab
    window.open(url, "_blank");

    // Reset form
    setFormData({ name: "", phone: "", date: "", guests: 1, message: "" });
    setSubmitStatus("success");

    // Reset status after 3 seconds
    setTimeout(() => {
      setSubmitStatus("idle");
    }, 3000);

    setIsSubmitting(false);
  };

  const handleCorporateInquiry = () => {
    const url = buildWhatsAppURL(PHONE, "Hi, I represent a corporate organization and would like to discuss event options.");
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F5ECD7]">
      {/* Hero Section - Booking Background */}
      <section className="bg-[#1B3A2D] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/interior-main-building.jpg"
            alt="Book Your Event at Sunny FarmHouse"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1B3A2D]/70 to-[#1B3A2D]/90" />
        <div className="container mx-auto px-4 relative z-20">
          <h1
            className={`${playfairDisplay.className} mb-6 text-4xl md:text-5xl font-bold text-white`}
          >
            Choose Your Package
          </h1>
          <p className={`${inter.className} text-xl text-[#F5ECD7]/90 max-w-2xl mx-auto`}>
            Select from our three packages to find the perfect option for your event
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B3A2D]`}>
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

      {/* Booking Form Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#D4A843]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-[#1B3A2D]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <div className="text-center mb-12">
            <h2 className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold mb-4 text-[#1B3A2D]`}>
              Book Your Event
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you to confirm your booking
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <label htmlFor="name" className="block text-sm font-semibold text-[#1B3A2D] mb-2 ml-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LucideIcons.User size={20} className="text-[#D4A843]" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setActiveField("name")}
                  onBlur={() => setActiveField(null)}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 text-black ${
                    activeField === "name"
                      ? "border-[#D4A843] ring-4 ring-[#D4A843]/20 bg-white "
                      : "border-gray-200 focus:border-[#D4A843] focus:ring-4 focus:ring-[#D4A843]/10 hover:border-[#D4A843]"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="group">
              <label htmlFor="phone" className="block text-sm font-semibold text-[#1B3A2D] mb-2 ml-1">
                Your Phone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LucideIcons.Phone size={20} className="text-[#D4A843]" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setActiveField("phone")}
                  onBlur={() => setActiveField(null)}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 text-black ${
                    activeField === "phone"
                      ? "border-[#D4A843] ring-4 ring-[#D4A843]/20 bg-white"
                      : "border-gray-200 focus:border-[#D4A843] focus:ring-4 focus:ring-[#D4A843]/10 hover:border-[#D4A843]"
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Date Field */}
            <div className="group">
              <label htmlFor="date" className="block text-sm font-semibold text-[#1B3A2D] mb-2 ml-1">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LucideIcons.Calendar size={20} className="text-[#D4A843]" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  onFocus={() => setActiveField("date")}
                  onBlur={() => setActiveField(null)}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 text-black ${
                    activeField === "date"
                      ? "border-[#D4A843] ring-4 ring-[#D4A843]/20 bg-white"
                      : "border-gray-200 focus:border-[#D4A843] focus:ring-4 focus:ring-[#D4A843]/10 hover:border-[#D4A843]"
                  }`}
                />
              </div>
            </div>

            {/* Guests Field */}
            <div className="group">
              <label htmlFor="guests" className="block text-sm font-semibold text-[#1B3A2D] mb-2 ml-1">
                Number of Guests <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LucideIcons.Users size={20} className="text-[#D4A843]" />
                </div>
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  required
                  min="1"
                  max="500"
                  value={formData.guests}
                  onChange={handleChange}
                  onFocus={() => setActiveField("guests")}
                  onBlur={() => setActiveField(null)}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 text-black ${
                    activeField === "guests"
                      ? "border-[#D4A843] ring-4 ring-[#D4A843]/20 bg-white"
                      : "border-gray-200 focus:border-[#D4A843] focus:ring-4 focus:ring-[#D4A843]/10 hover:border-[#D4A843]"
                  }`}
                  placeholder="Enter number of guests"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="group">
              <label htmlFor="message" className="block text-sm font-semibold text-[#1B3A2D] mb-2 ml-1">
                Additional Messages
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                  <LucideIcons.MessageCircle size={18} className="text-[#D4A843]" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField("message")}
                  onBlur={() => setActiveField(null)}
                  className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 resize-none text-black ${
                    activeField === "message"
                      ? "border-[#D4A843] ring-4 ring-[#D4A843]/20 bg-white"
                      : "border-gray-200 focus:border-[#D4A843] focus:ring-4 focus:ring-[#D4A843]/10 hover:border-[#D4A843]"
                  }`}
                  placeholder="Tell us about your event..."
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-400 pointer-events-none">
                  {formData.message.length} chars
                </div>
              </div>
            </div>

            {/* Submit Button with Magic Animation */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full group overflow-hidden rounded-2xl py-5 px-8 font-bold text-lg text-white transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:shadow-2xl hover:shadow-[#25D366]/40 hover:-translate-y-1"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <LucideIcons.Loader className="animate-spin" size={20} />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <LucideIcons.Send size={20} />
                      Start Conversation on WhatsApp
                    </>
                  )}
                </span>
                {/* Button shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            </div>

            {/* Success Message with Animation */}
            {submitStatus === "success" && (
              <div className="animate-bounce-in bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                  <LucideIcons.CheckCircle size={24} />
                  Message opened in WhatsApp! Please complete your booking.
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#F5ECD7]">
        <div className="container mx-auto px-4">
          <h2 className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B3A2D]`}>
            How It Works
          </h2>

          <div className="flex flex-col items-center">
            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-8 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-[#D4A843] opacity-50 -translate-y-1/2 z-0" />

              {[
                {
                  step: 1,
                  title: "Inquiry",
                  description: "Contact us via WhatsApp to check availability and get pricing details",
                  icon: "MessageCircle",
                },
                {
                  step: 2,
                  title: "Confirmation",
                  description: "Once you decide, we'll send a confirmation email with all details",
                  icon: "CheckCircle",
                },
                {
                  step: 3,
                  title: "Payment",
                  description: "Complete your booking with a security deposit",
                  icon: "CreditCard",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-20 h-20 rounded-full bg-white text-[#1B3A2D] flex items-center justify-center text-2xl font-bold mb-4 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#D4A843]/30">
                    {item.step}
                  </div>
                  <div className="mb-4 p-4 rounded-full bg-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D4A843]">
                    <LucideIcons.MessageCircle size={32} className="text-[#D4A843] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className={`${playfairDisplay.className} text-xl font-bold mb-2 text-[#1B3A2D] group-hover:text-[#D4A843] transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Mobile connector dots */}
            <div className="flex md:hidden gap-4 mt-8">
              <div className="w-4 h-4 rounded-full bg-[#1B3A2D]" />
              <div className="w-4 h-4 rounded-full bg-[#D4A843]" />
              <div className="w-4 h-4 rounded-full bg-[#1B3A2D]" />
              <div className="w-4 h-4 rounded-full bg-[#D4A843]" />
              <div className="w-4 h-4 rounded-full bg-[#1B3A2D]" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-center mb-12 text-[#1B3A2D]`}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#D4A843]/50 group"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer select-none bg-gradient-to-r from-white to-gray-50 group-hover:from-[#F5ECD7]/50 group-hover:to-white transition-all">
                    <h3 className="font-semibold text-[#1B3A2D] group-hover:text-[#D4A843] transition-colors">
                      {faq.question}
                    </h3>
                    <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition-all group-open:border-[#D4A843] group-open:text-[#D4A843] group-hover:scale-110 transition-transform">
                      <LucideIcons.Plus size={18} className="group-open:rotate-45 transition-transform" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-600 bg-gray-50/50 group-hover:bg-gray-50 transition-colors">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Callout */}
      <section className="py-20 bg-[#1B3A2D]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A843]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <LucideIcons.Briefcase size={64} className="text-[#D4A843] mx-auto mb-6 relative z-10" />
            <h2
              className={`${playfairDisplay.className} text-3xl md:text-4xl font-bold text-[#1B3A2D] mb-4 relative z-10`}
            >
              Corporate Events?
            </h2>
            <p className="text-gray-600 mb-8 text-lg relative z-10">
              We offer special packages and discounts for corporate events, team building activities, and business conferences.
            </p>
            <button
              onClick={handleCorporateInquiry}
              className="rounded-full bg-[#25D366] px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-[#20bd5a] hover:scale-105 hover:shadow-2xl hover:shadow-[#25D366]/40 relative z-10"
            >
              Enquire for Corporate Rates
            </button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 bg-[#F5ECD7]">
        <div className="container mx-auto px-4">
          <div className="w-full rounded-xl overflow-hidden shadow-2xl">
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
      </section>

      {/* Bottom CTA */}
      <SectionCTA
        headline="Ready to Book Your Event?"
        btnText="Book Now on WhatsApp"
      />

      {/* Global styles for animations */}
      <style>{`
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
