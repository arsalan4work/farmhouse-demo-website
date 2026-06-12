/**
 * Farmhouse Website Constants
 * Extracted magic strings and configuration values
 */

// WhatsApp Contact
export const PHONE = "923312499496" as const;
export const WHATSAPP_COUNTRY_CODE = "92" as const;

// Google Maps Embed URL
export const MAP_URL = "https://maps.google.com/maps?q=Firpo+Farmhouse&output=embed" as const;

// Royal Dark Blue Color Palette
export const COLORS = {
  primary: "#1B3A5C", // Royal dark blue (replaces #1B3A2D)
  accent: "#D4A843", // Amber/gold (kept as is for contrast)
  highlight: "#6366F1", // Royal blue for buttons (replaces #25D366)
  secondary: "#4F46E5", // Darker royal blue for gradients
  light: "#F3F4F6", // Light background
} as const;

// Package Data with Time Slots and Rates
export const PACKAGES = {
  weekdays: {
    id: "weekdays",
    label: "WEEKDAYS",
    period: "SUNDAY (NIGHT) THURSDAY (DAY)",
    highlighted: false,
    day: { time: "9AM - 6PM", price: 45000 },
    night: { time: "8PM - 7AM", price: 55000 },
    dayNight: { time: "8PM - 4PM", price: 85000 },
  },
  friday: {
    id: "friday",
    label: "FRIDAY",
    period: "THURSDAY (NIGHT) SATURDAY (DAY)",
    highlighted: true,
    day: { time: "9AM - 6PM", price: 55000 },
    night: { time: "8PM - 7AM", price: 60000 },
    dayNight: { time: "8PM - 4PM", price: 95000 },
  },
  weekend: {
    id: "weekend",
    label: "WEEKENDS",
    period: "SATURDAY (NIGHT) SUNDAY (DAY)",
    highlighted: false,
    day: { time: "9AM - 6PM", price: 60000 },
    night: { time: "8PM - 7AM", price: 70000 },
    dayNight: { time: "8PM - 4PM", price: 110000 },
  },
} as const;

// Facilities Data
// 9 facility items as per spec requirements
export const FACILITIES = [
  {
    id: "ac-bedrooms",
    name: "AC Bedrooms",
    description: "Spacious rooms with air conditioning and modern furnishings",
    iconName: "BedDouble",
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    description: "Outdoor swimming pool surrounded by greenery",
    iconName: "Waves",
  },
  {
    id: "cricket-ground",
    name: "Cricket Ground",
    description: "Dedicated cricket ground for entertainment",
    iconName: "Trophy",
  },
  {
    id: "bbq-patio",
    name: "BBQ Patio",
    description: "Outdoor BBQ area with seating for large groups",
    iconName: "Flame",
  },
  {
    id: "parking",
    name: "Parking",
    description: "Ample parking space for guests",
    iconName: "Car",
  },
  {
    id: "play-equipment",
    name: "Play Equipment",
    description: "Kids play area with safe equipment",
    iconName: "Blocks",
  },
  {
    id: "outdoor-sitting",
    name: "Outdoor Sitting",
    description: "Comfortable outdoor seating areas",
    iconName: "Sofa",
  },
  {
    id: "indoor-games",
    name: "Indoor Games",
    description: "Indoor games room with various activities",
    iconName: "Gamepad2",
  },
  {
    id: "attached-bathrooms",
    name: "Attached Bathrooms",
    description: "Private bathrooms in each room",
    iconName: "Bath",
  },
] as const;

// Type exports for type safety
export type PackageId = keyof typeof PACKAGES;
export type FacilityId = typeof FACILITIES[number]["id"];

// Export types for time slot
export type TimeSlot = {
  time: string;
  price: number;
};

// Export types
export type Package = {
  id: PackageId;
  label: string;
  period: string;
  highlighted: boolean;
  day: TimeSlot;
  night: TimeSlot;
  dayNight: TimeSlot;
};

export type Facility = {
  id: FacilityId;
  name: string;
  description: string;
  iconName: string;
};
