import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock, Home, Users } from "lucide-react";
import { buildWhatsAppURL } from "@/lib/wa";
import { PHONE, MAP_URL } from "@/lib/constants";

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
  whatsapp: PHONE,
  address: "Firpo Farmhouse, [Location]",
} as const;

export default function Footer() {
  const handleWhatsAppClick = () => {
    const url = buildWhatsAppURL(PHONE, "Hi, I want to book the farmhouse");
    window.open(url, "_blank");
  };

  return (
    <footer className="bg-[#1B3A2D] text-[#F5ECD7]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#D4A843]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#D4A843] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#D4A843]">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#D4A843]" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-[#D4A843] transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-[#D4A843]" />
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4A843] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-[#D4A843]" />
                <span className="text-sm leading-relaxed">
                  {contactInfo.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Find Us */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[#D4A843]">
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
      <div className="border-t border-[#D4A843]/20 bg-[#1B3A2D]">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-[#F5ECD7]/80">
          <p>&copy; {new Date().getFullYear()} FARM NAME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
