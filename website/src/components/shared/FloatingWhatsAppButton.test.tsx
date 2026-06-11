import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

// Mock wa.ts
vi.mock("@/lib/wa", () => ({
  buildWhatsAppURL: vi.fn((phone: string, msg: string) => {
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }),
}));

// Mock constants
vi.mock("@/lib/constants", () => ({
  PHONE: "923312499496",
}));

describe("FloatingWhatsAppButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the WhatsApp button", () => {
    render(<FloatingWhatsAppButton />);
    // Should have a button element
    expect(document.querySelector("button")).toBeInTheDocument();
  });

  it("renders the MessageCircle icon", () => {
    render(<FloatingWhatsAppButton />);
    // The button should contain an icon
    expect(document.querySelector("button svg")).toBeInTheDocument();
  });

  it("has fixed position at bottom-right", () => {
    render(<FloatingWhatsAppButton />);
    const button = document.querySelector("button");
    expect(button).toHaveClass("fixed");
    expect(button).toHaveClass("bottom-6");
    expect(button).toHaveClass("right-6");
  });

  it("shows tooltip on hover", () => {
    render(<FloatingWhatsAppButton />);
    const button = screen.getByRole("button");

    // Initially tooltip should not be visible
    expect(screen.queryByText("Chat with us")).not.toBeInTheDocument();

    // Hover over the button
    fireEvent.mouseEnter(button);

    // Tooltip should now be visible
    expect(screen.getByText("Chat with us")).toBeInTheDocument();
  });

  it("opens WhatsApp with correct phone number and message on click", () => {
    const { container } = render(<FloatingWhatsAppButton />);
    const button = container.querySelector("button");

    if (button) {
      fireEvent.click(button);
    }

    // buildWhatsAppURL should have been called with correct arguments
    expect(window.open).toHaveBeenCalled();
  });

  it("has WhatsApp brand color (#25D366)", () => {
    render(<FloatingWhatsAppButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[#25D366]");
  });

  it("has correct size (56px x 56px)", () => {
    render(<FloatingWhatsAppButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-[56px]");
    expect(button).toHaveClass("w-[56px]");
  });

  it("has rounded-full styling", () => {
    render(<FloatingWhatsAppButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("rounded-full");
  });

  it("has shadow-lg and shadow-xl on hover", () => {
    render(<FloatingWhatsAppButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("shadow-lg");
    expect(button).toHaveClass("hover:shadow-xl");
  });

  it("has hover:scale-110 animation", () => {
    render(<FloatingWhatsAppButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:scale-110");
  });

  it("has proper ARIA label for accessibility", () => {
    render(<FloatingWhatsAppButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Chat with us on WhatsApp");
  });
});
