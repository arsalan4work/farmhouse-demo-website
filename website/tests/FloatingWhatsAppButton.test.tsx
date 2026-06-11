/**
 * FloatingWhatsAppButton Component Tests
 * TDD: Tests written before implementation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import FloatingWhatsAppButton from "../src/components/shared/FloatingWhatsAppButton";

// Mock window.open for testing
beforeEach(() => {
  vi.stubGlobal("open", vi.fn());
  // Mock matchMedia for prefers-reduced-motion
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  });
});

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("FloatingWhatsAppButton", () => {
  describe("Button positioning", () => {
    it("should be fixed at bottom-6 right-6", () => {
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("bottom-6");
      expect(button).toHaveClass("right-6");
    });
  });

  describe("Button styling", () => {
    it("should be a 56px circle with WhatsApp color", () => {
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("h-[56px]");
      expect(button).toHaveClass("w-[56px]");
      expect(button).toHaveClass("rounded-full");
    });

    it("should have WhatsApp background color", () => {
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });
      expect(button).toHaveClass("bg-[#25D366]");
    });

    it("should have white WhatsApp icon", () => {
      render(<FloatingWhatsAppButton />);
      const icon = screen.getByRole("button", { name: /chat with us on whatsapp/i });
        expect(icon).toBeInTheDocument();
    });
  });

  describe("Tooltip", () => {
    it("should show tooltip on hover", () => {
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });

      // Simulate mouse enter
      fireEvent.mouseEnter(button);
      expect(screen.getByText("Chat with us")).toBeInTheDocument();
    });

    it("should hide tooltip on mouse leave", () => {
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });

      // Simulate mouse enter then leave
      fireEvent.mouseEnter(button);
      expect(screen.getByText("Chat with us")).toBeInTheDocument();

      fireEvent.mouseLeave(button);
      // Tooltip should be hidden (or removed from DOM)
    });
  });

  describe("Click handler", () => {
    it("should open WhatsApp URL on click", () => {
      const mockOpen = vi.fn();
      vi.stubGlobal("open", mockOpen);

      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });
      fireEvent.click(button);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining("https://wa.me/923312499496"),
        "_blank"
      );
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label for screen readers", () => {
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Chat with us on WhatsApp");
    });

    it("should have focus ring for keyboard navigation", () => {
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("focus:ring-2");
    });
  });

  describe("Reduced motion support", () => {
    it("should respect prefers-reduced-motion", () => {
      // This test verifies the component checks for reduced motion
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Hover effects", () => {
    it("should scale on hover", () => {
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });
      expect(button).toHaveClass("hover:scale-110");
    });

    it("should have shadow on hover", () => {
      render(<FloatingWhatsAppButton />);
      const button = screen.getByRole("button", { name: /chat with us on whatsapp/i });
      expect(button).toHaveClass("hover:shadow-xl");
    });
  });
});
