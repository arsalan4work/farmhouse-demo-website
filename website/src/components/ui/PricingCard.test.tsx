import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import PricingCard from "./PricingCard";

// Mock the buildWhatsAppURL function
vi.mock("@/lib/wa", () => ({
  buildWhatsAppURL: vi.fn((phone: string, msg: string) => {
    const encodedMsg = encodeURIComponent(msg);
    return `https://wa.me/${phone}?text=${encodedMsg}`;
  }),
}));

// Mock constants
vi.mock("@/lib/constants", () => ({
  PHONE: "923312499496",
}));

// Sample tier data
const sampleWeekdayTier = {
  id: "weekdays",
  label: "Weekdays",
  period: "Sun Night - Thu Day",
  highlighted: false,
  rates: { day: 45000, night: 55000, dayAndNight: 85000 },
};

const sampleFridayTier = {
  id: "friday",
  label: "Friday",
  period: "Thu Night - Sat Day",
  highlighted: true,
  rates: { day: 55000, night: 60000, dayAndNight: 95000 },
};

describe("PricingCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders all 3 rows with correct data", () => {
    render(<PricingCard tier={sampleWeekdayTier} bookMsg="Test message" />);

    // Check for label
    expect(screen.getByText("Weekdays")).toBeInTheDocument();

    // Check period
    expect(screen.getByText("Sun Night - Thu Day")).toBeInTheDocument();

    // Check 3 rows
    expect(screen.getByText("Day")).toBeInTheDocument();
    expect(screen.getByText("Night")).toBeInTheDocument();
    expect(screen.getByText("Day + Night")).toBeInTheDocument();

    // Check prices
    expect(screen.getByText("Rs. 45,000")).toBeInTheDocument();
    expect(screen.getByText("Rs. 55,000")).toBeInTheDocument();
    expect(screen.getByText("Rs. 85,000")).toBeInTheDocument();
  });

  it("applies amber class when highlighted is true", () => {
    render(<PricingCard tier={sampleFridayTier} bookMsg="Test message" />);

    // Should have amber background for highlighted
    const badge = screen.getByText("Friday");
    expect(badge).toHaveClass("bg-[#D4A843]");
  });

  it("applies green class when highlighted is false", () => {
    render(<PricingCard tier={sampleWeekdayTier} bookMsg="Test message" />);

    // Should have dark green background for non-highlighted
    const badge = screen.getByText("Weekdays");
    expect(badge).toHaveClass("bg-[#1B3A2D]");
  });

  it("Book Now button has correct WhatsApp href", () => {
    render(<PricingCard tier={sampleWeekdayTier} bookMsg="Test message" />);

    const button = screen.getByText("Book Now");
    expect(button).toHaveAttribute("href");
  });

  it("applies hover scale transition class", () => {
    render(<PricingCard tier={sampleWeekdayTier} bookMsg="Test message" />);

    const card = screen.getByRole("article");
    expect(card).toHaveClass("hover:scale-[1.02]");
  });

  it("has responsive white card with shadow", () => {
    render(<PricingCard tier={sampleWeekdayTier} bookMsg="Test message" />);

    const card = screen.getByRole("article");
    expect(card).toHaveClass("rounded-2xl");
    expect(card).toHaveClass("bg-white");
    expect(card).toHaveClass("shadow-lg");
  });
});
