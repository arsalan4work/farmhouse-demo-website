"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function FloatingWhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (tooltipRef.current && (e.target as HTMLElement).closest("#wa-float-btn")) {
        const rect = tooltipRef.current.getBoundingClientRect();
        const buttonRect = (e.target as HTMLElement).getBoundingClientRect();
        // Position tooltip to the left of the button
        const left = buttonRect.left - rect.width - 10;
        const top = buttonRect.top + buttonRect.height / 2 - rect.height / 2;
        tooltipRef.current.style.left = `${left}px`;
        tooltipRef.current.style.top = `${top}px`;
      }
    };

    if (showTooltip) {
      document.addEventListener("mousemove", handleMouseMove);
    }
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [showTooltip]);

  return (
    <>
      {/* Floating Button */}
      <Link
        id="wa-float-btn"
        href="/booking"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="fixed bottom-6 right-6 z-50 flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
        {isHovered && !prefersReducedMotion && (
          <span className="absolute inset-0 rounded-full bg-[#25D366]/50 animate-pulse" />
        )}
      </Link>

      {/* Tooltip */}
      {showTooltip && (
        <div
          ref={tooltipRef}
          className="fixed bottom-6 right-[calc(100%+12px)] hidden -translate-y-1/2 transform rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 animate-in fade-in slide-in-from-right-4"
          style={{ top: "50%" }}
          role="tooltip"
        >
          Chat with us
          <div className="absolute left-0 top-1/2 -translate-y-1/2 transform translate-x-[-6px] text-gray-900">
            <svg
              width="12"
              height="24"
              viewBox="0 0 12 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.5 0L0 12L11.5 24V0Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
