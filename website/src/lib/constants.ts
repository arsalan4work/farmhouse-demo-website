/**
 * Farmhouse Website Constants
 * Extracted magic strings and configuration values
 */

// WhatsApp Contact
export const PHONE = "923312499496" as const;
export const WHATSAPP_COUNTRY_CODE = "92" as const;

// WhatsApp Pre-filled Message Template
export const WA_MSG_TEMPLATE = `Assalamualaikum,

Mujhe apka farmhouse book krwana ha

Date: {date}
Guests: {guests}

Ap details bata skty hn?`;

// Google Maps Embed URL
export const MAP_URL = "https://maps.google.com/maps?q=Firpo+Farmhouse&output=embed" as const;

// Pricing Tiers (per constitution: constants.ts)
// Rates in PKR (Pakistani Rupees)
export const PRICES = {
  weekdays: {
    id: "weekdays",
    label: "Weekdays",
    period: "Sun Night - Thu Day",
    highlighted: false,
    rates: {
      day: 45000,
      night: 55000,
      dayAndNight: 85000,
    },
  },
  friday: {
    id: "friday",
    label: "Friday",
    period: "Thu Night - Sat Day",
    highlighted: true,
    rates: {
      day: 55000,
      night: 60000,
      dayAndNight: 95000,
    },
  },
  weekend: {
    id: "weekend",
    label: "Weekends",
    period: "Sat Night - Sun Day",
    highlighted: false,
    rates: {
      day: 60000,
      night: 70000,
      dayAndNight: 110000,
    },
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
    iconName: "WaveSquare",
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
    iconName: "FlameKindle",
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
    iconName: "ChairGround",
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
export type PricingTierId = keyof typeof PRICES;
export type FacilityId = typeof FACILITIES[number]["id"];

// Export types
export type PricingTier = {
  id: PricingTierId;
  label: string;
  period: string;
  highlighted: boolean;
  rates: {
    day: number;
    night: number;
    dayAndNight: number;
  };
};

export type Facility = {
  id: FacilityId;
  name: string;
  description: string;
  iconName: string;
};
