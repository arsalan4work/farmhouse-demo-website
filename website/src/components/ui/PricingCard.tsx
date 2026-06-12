"use client";

import { Package } from "@/lib/constants";
import { inter, interMono } from "@/lib/fonts";

type PricingCardProps = {
  packageData: Package;
  bookMsg: string;
};

export default function PricingCard({ packageData, bookMsg }: PricingCardProps) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      {/* Title Badge */}
      <div
        className={`mb-4 rounded-full px-4 py-2 text-sm font-semibold text-white ${
          packageData.highlighted ? "bg-[#6366F1]" : "bg-[#1B3A5C]"
        }`}
      >
        {packageData.label}
      </div>

      {/* Period Text */}
      <p className="mb-6 text-center text-sm text-gray-500">{packageData.period}</p>

      {/* Time Slots Display */}
      <div className="w-full space-y-3 mb-6">
        {/* Day Rate */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div>
            <span className="font-semibold text-gray-900 block">DAY</span>
            <span className="text-xs text-gray-500">{packageData.day.time}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className={`font-mono text-xl text-[#1B3A5C]`}>
              Rs. {packageData.day.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Night Rate */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div>
            <span className="font-semibold text-gray-900 block">NIGHT</span>
            <span className="text-xs text-gray-500">{packageData.night.time}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className={`font-mono text-xl text-[#1B3A5C]`}>
              Rs. {packageData.night.price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Day + Night Rate */}
        <div className="flex items-center justify-between pb-2">
          <div>
            <span className="font-semibold text-gray-900 block">DAY + NIGHT</span>
            <span className="text-xs text-gray-500">{packageData.dayNight.time}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className={`font-mono text-xl text-[#1B3A5C]`}>
              Rs. {packageData.dayNight.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <a
        href="/booking"
        className="mt-6 w-full rounded-full bg-[#6366F1] px-6 py-3 text-center font-semibold text-white transition-all hover:bg-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2"
      >
        {bookMsg}
      </a>
    </div>
  );
}
