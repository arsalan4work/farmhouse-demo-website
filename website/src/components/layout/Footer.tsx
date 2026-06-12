import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock, Home, Users } from "lucide-react";
import { MAP_URL } from "@/lib/constants";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Facilities", href: "/facilities" },
  { name: "Booking", href: "/booking" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy", href: "/privacy" },
] as const;

const contactInfo = {
  phone: "+92 331 2499496",
  address: "Sunny FarmHouse, [Location]",
} as const;

export default function Footer() {
  return (
    <footer className="bg-[#1B3A5C] text-[#F5ECD7]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#6366F1]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#6366F1] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#6366F1]">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#6366F1]" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-[#6366F1] transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-[#6366F1]" />
                <Link
                  href="/booking"
                  className="hover:text-[#6366F1] transition-colors"
                >
                  Book Now on WhatsApp
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-[#6366F1]" />
                <span className="text-sm leading-relaxed">
                  {contactInfo.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Find Us */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#6366F1]">
              Find Us
            </h3>
            <div className="rounded-xl overflow-hidden">
              <iframe
                src={MAP_URL}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Farmhouse Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#6366F1]/20 bg-[#1B3A5C]">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-[#F5ECD7]/80">
          <p>&copy; {new Date().getFullYear()} Sunny FarmHouse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
