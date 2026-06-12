"use client";

import Image from "next/image";
import { playfairDisplay } from "@/lib/fonts";
import { inter } from "@/lib/fonts";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F5ECD7]">
      {/* Hero Section - Privacy Background */}
      <section className="bg-[#1B3A2D] py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/interior-main-building.jpg"
            alt="Privacy at Sunny FarmHouse"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1B3A2D]/70 to-[#1B3A2D]/90" />
        <div className="container mx-auto px-4 relative z-20">
          <h1
            className={`${playfairDisplay.className} mb-6 text-4xl md:text-5xl font-bold text-white`}
          >
            Privacy Policy
          </h1>
          <p className={`${inter.className} text-xl text-[#F5ECD7]/90 max-w-2xl mx-auto`}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-gray-600">
            {/* Last Updated */}
            <div className="mb-8 text-right text-sm text-gray-500 italic">
              Last Updated: June 2026
            </div>

            {/* Introduction */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4`}>
              1. Introduction
            </h2>
            <p className="mb-6">
              Sunny FarmHouse ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose your information when you visit our website, use our services, or contact us.
            </p>
            <p>
              By using our website, you consent to the data practices described in this policy.
            </p>

            {/* Information Collection */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4 mt-8`}>
              2. Information We Collect
            </h2>
            <p className="mb-4 font-semibold text-[#1B3A2D]">2.1 Personal Data</p>
            <p className="mb-6">
              We may collect personal information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Name and contact information (email, phone, address)</li>
              <li>Payment information (if applicable)</li>
              <li>Event details and preferences</li>
              <li>Communications with our team</li>
            </ul>

            <p className="mb-4 font-semibold text-[#1B3A2D]">2.2 Automatic Data</p>
            <p className="mb-6">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>IP address and browser type</li>
              <li>Operating system and device information</li>
              <li>Pages viewed and time spent on our site</li>
              <li>Referral source and navigation data</li>
            </ul>

            {/* How We Use Information */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4 mt-8`}>
              3. How We Use Your Information
            </h2>
            <p className="mb-6">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>To process and fulfill your booking requests</li>
              <li>To communicate with you regarding your event</li>
              <li>To improve our website and services</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To comply with legal obligations</li>
            </ul>

            {/* WhatsApp Usage */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4 mt-8`}>
              4. WhatsApp Communication
            </h2>
            <p className="mb-6">
              We use WhatsApp as our primary communication platform. When you contact us via WhatsApp:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Your phone number is stored securely and used only for event-related communication</li>
              <li>We do not share your WhatsApp conversations with third parties</li>
              <li>You can delete conversations at any time on your device</li>
              <li>WhatsApp communications are subject to WhatsApp's Privacy Policy</li>
            </ul>

            {/* No Cookie Policy */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4 mt-8`}>
              5. Cookie Statement
            </h2>
            <p className="mb-6">
              <strong>We do not use cookies on this website.</strong>
            </p>
            <p className="mb-6">
              Sunny FarmHouse does not place any cookies, tracking pixels, or similar tracking technologies on our website. We do not collect personal information through automated means or track user behavior across our site.
            </p>
            <p>
              This approach aligns with our commitment to user privacy and minimal data collection.
            </p>

            {/* Data Protection */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4 mt-8`}>
              6. Data Security
            </h2>
            <p className="mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Unauthorized access</li>
              <li>Accidental loss or destruction</li>
              <li>Modification or disclosure</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            {/* Third-Party Links */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4 mt-8`}>
              7. Third-Party Links
            </h2>
            <p className="mb-6">
              Our website may contain links to third-party websites, including Google Maps for location display. We are not responsible for the privacy practices of these sites. We encourage you to review their privacy policies.
            </p>

            {/* Your Rights */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4 mt-8`}>
              8. Your Rights
            </h2>
            <p className="mb-6">
              You have the right to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p>
              To exercise these rights, contact us at <a href="mailto:info@firpofarmhouse.com" className="text-[#25D366] hover:underline">info@firpofarmhouse.com</a>.
            </p>

            {/* Policy Changes */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4 mt-8`}>
              9. Policy Changes
            </h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with a revised "Last Updated" date.
            </p>

            {/* Contact Us */}
            <h2 className={`${playfairDisplay.className} text-2xl font-bold text-[#1B3A2D] mb-4 mt-8`}>
              10. Contact Us
            </h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-[#F5ECD7] p-6 rounded-lg space-y-3">
              <p className="flex items-center gap-2">
                <span className="text-[#1B3A2D]">Phone:</span>
                <a href="tel:+923312499496" className="text-[#25D366] hover:underline">+92 331 2499496</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#1B3A2D]">WhatsApp:</span>
                <a href="https://wa.me/923312499496" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">+92 331 2499496</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#1B3A2D]">Email:</span>
                <a href="mailto:info@firpofarmhouse.com" className="text-[#25D366] hover:underline">info@firpofarmhouse.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
