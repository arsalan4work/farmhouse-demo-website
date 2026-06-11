"use client";

import { PricingTier } from "@/lib/constants";
import { buildWhatsAppURL } from "@/lib/wa";
import { interMono } from "@/lib/fonts";

type PricingCardProps = {
  tier: PricingTier;
  bookMsg: string;
};

export default function PricingCard({ tier, bookMsg }: PricingCardProps) {
  const whatsappUrl = buildWhatsAppURL(
    "923312499496",
    `Assalamualaikum, Mujhe apka farmhouse book krwana ha. Date: [Date] Guests: [Guests]`
  );

  return (
    <div
      className={`flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      {/* Title Badge */}
      <div
        className={`mb-4 rounded-full px-4 py-2 text-sm font-semibold text-white ${
          tier.highlighted ? "bg-[#D4A843]" : "bg-[#1B3A2D]"
        }`}
      >
        {tier.label}
      </div>

      {/* Period Text */}
      <p className="mb-6 text-center text-sm text-gray-500">{tier.period}</p>

      {/* 3 Rows */}
      <div className="w-full space-y-4">
        {/* Row 1: Day */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <span className="text-gray-700">Day</span>
          <div className="flex flex-col items-end">
            <span className={`font-mono text-2xl text-[#1B3A2D]`}>
              Rs. {tier.rates.day.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">day-only</span>
          </div>
        </div>

        {/* Row 2: Night */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <span className="text-gray-700">Night</span>
          <div className="flex flex-col items-end">
            <span className={`font-mono text-2xl text-[#1B3A2D]`}>
              Rs. {tier.rates.night.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">night-only</span>
          </div>
        </div>

        {/* Row 3: Day + Night */}
        <div className="flex items-center justify-between pb-2">
          <span className="font-semibold text-gray-900">Day + Night</span>
          <div className="flex flex-col items-end">
            <span className={`font-mono text-2xl text-[#1B3A2D]`}>
              Rs. {tier.rates.dayAndNight.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">combined rate</span>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full rounded-full bg-[#25D366] px-6 py-3 text-center font-semibold text-white transition-all hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        Book Now
      </a>
    </div>
  );
}
