/**
 * Font Configuration for Farmhouse Website
 * Using next/font for optimized font loading
 */

import { Playfair_Display, Inter } from "next/font/google";

// Playfair Display for display headings (serif)
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

// Inter for body text (sans-serif)
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Inter Mono for prices (monospace)
export const interMono = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-mono",
  display: "swap",
  style: ["normal"],
});
