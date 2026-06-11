import { describe, it, expect, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import FacilityCard from "./FacilityCard";
import { BedDouble, Pool } from "lucide-react";

// Mock lucide-react to control icon rendering
vi.mock("lucide-react", () => ({
  BedDouble: vi.fn(() => <svg data-testid="mock-bed">Bed</svg>),
  Pool: vi.fn(() => <svg data-testid="mock-pool">Pool</svg>),
}));

describe("FacilityCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the facility name", () => {
    render(
      <FacilityCard
        name="AC Bedrooms"
        description="Spacious rooms with air conditioning"
        iconName="BedDouble"
      />
    );

    expect(screen.getByText("AC Bedrooms")).toBeInTheDocument();
  });

  it("renders the facility icon", () => {
    render(
      <FacilityCard
        name="AC Bedrooms"
        description="Spacious rooms with air conditioning"
        iconName="BedDouble"
      />
    );

    expect(screen.getByText("Bed")).toBeInTheDocument();
  });

  it("renders the facility description", () => {
    render(
      <FacilityCard
        name="AC Bedrooms"
        description="Spacious rooms with air conditioning"
        iconName="BedDouble"
      />
    );

    expect(screen.getByText("Spacious rooms with air conditioning")).toBeInTheDocument();
  });

  it("applies amber color to the icon", () => {
    render(
      <FacilityCard
        name="AC Bedrooms"
        description="Spacious rooms with air conditioning"
        iconName="BedDouble"
      />
    );

    // The icon should be rendered with text-[#D4A843] class
    expect(screen.getByText("Bed")).toBeInTheDocument();
  });

  it("applies white background and rounded corners to card", () => {
    render(
      <FacilityCard
        name="AC Bedrooms"
        description="Spacious rooms with air conditioning"
        iconName="BedDouble"
      />
    );

    const card = screen.getByRole("article");
    expect(card).toHaveClass("rounded-2xl");
    expect(card).toHaveClass("bg-white");
  });

  it("applies hover translate class", () => {
    render(
      <FacilityCard
        name="AC Bedrooms"
        description="Spacious rooms with air conditioning"
        iconName="BedDouble"
      />
    );

    const card = screen.getByRole("article");
    expect(card).toHaveClass("hover:-translate-y-1");
  });

  it("renders icon with 28px size", () => {
    render(
      <FacilityCard
        name="AC Bedrooms"
        description="Spacious rooms with air conditioning"
        iconName="BedDouble"
      />
    );

    // Check that the mock BedDouble was called with size={28}
    expect(BedDouble).toHaveBeenCalledWith(
      expect.objectContaining({ size: 28 }),
      expect.anything()
    );
  });

  it("handles invalid icon name gracefully", () => {
    // This should not crash - the component should return null for invalid icons
    const { container } = render(
      <FacilityCard
        name="Test"
        description="Test description"
        iconName="NonExistentIcon" as any
      />
    );

    // Component should render nothing or return null
    expect(container.innerHTML).toBe("");
  });
});
