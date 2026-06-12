"use client";

import Image from "next/image";
import { SVGProps } from "react";
import * as LucideIcons from "lucide-react";

type FacilityCardProps = {
  name: string;
  description: string;
  iconName: string;
  image?: string;
};

export default function FacilityCard({
  name,
  description,
  iconName,
  image,
}: FacilityCardProps) {
  // Get the icon component from lucide-react
  const IconComponent = LucideIcons[iconName] as React.FC<SVGProps<SVGSVGElement>>;

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in lucide-react`);
    return null;
  }

  return (
    <div className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image - visible on hover */}
      <div className="mb-4 relative h-24 w-full overflow-hidden rounded-xl">
        <Image
          src={image || "/outdoor-sitting.jpg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Icon - amber #D4A843, 28px */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5ECD7]">
        <IconComponent size={28} className="text-[#D4A843]" />
      </div>

      {/* Name - bold */}
      <h3 className="mb-2 text-center text-lg font-bold text-gray-900">
        {name}
      </h3>

      {/* Description - muted */}
      <p className="text-center text-sm text-gray-500">{description}</p>
    </div>
  );
}
