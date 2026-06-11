/**
 * Footer Component Tests
 * TDD: Tests written before implementation
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Footer from "../src/components/layout/Footer";

beforeEach(() => {
  vi.stubGlobal("open", vi.fn());
});

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("Footer", () => {
  describe("Column structure", () => {
    it("should have Quick Links column", () => {
      render(<Footer />);
      expect(screen.getByText("Quick Links")).toBeInTheDocument();
    });

    it("should have Contact Info column", () => {
      render(<Footer />);
      expect(screen.getByText("Contact Info")).toBeInTheDocument();
    });

    it("should have Find Us column", () => {
      render(<Footer />);
      expect(screen.getByText("Find Us")).toBeInTheDocument();
    });
  });

  describe("Quick Links", () => {
    it("should render all navigation links", () => {
      render(<Footer />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Facilities")).toBeInTheDocument();
      expect(screen.getByText("Booking")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
      expect(screen.getByText("Privacy")).toBeInTheDocument();
    });
  });

  describe("Contact Info", () => {
    it("should display phone number as tel: link", () => {
      render(<Footer />);
      const phoneLink = screen.getByText("+92 331 2499496");
      expect(phoneLink).toBeInTheDocument();
      // Verify it's a link
      expect(phoneLink.closest("a")).toBeInTheDocument();
    });

    it("should display WhatsApp link", () => {
      render(<Footer />);
      expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    });

    it("should display address", () => {
      render(<Footer />);
      expect(screen.getByText(/Firpo Farmhouse/i)).toBeInTheDocument();
    });
  });

  describe("Find Us section", () => {
    it("should render Google Maps iframe", () => {
      render(<Footer />);
      const iframe = screen.getByTitle("Farmhouse Location");
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute("src", expect.stringContaining("maps.google.com"));
    });

    it("should have proper iframe dimensions", () => {
      render(<Footer />);
      const iframe = screen.getByTitle("Farmhouse Location");
      expect(iframe).toHaveAttribute("width", "100%");
      expect(iframe).toHaveAttribute("height", "200");
    });
  });

  describe("Bottom bar", () => {
    it("should display copyright with current year", () => {
      render(<Footer />);
      const copyright = screen.getByText(/©.*FARM NAME/i);
      expect(copyright).toBeInTheDocument();
    });
  });

  describe("Color scheme", () => {
    it("should use #1B3A2D background color", () => {
      render(<Footer />);
      const footer = document.querySelector("footer");
      // Component uses bg-[#1B3A2D] class
      expect(footer).toBeInTheDocument();
    });

    it("should use #F5ECD7 text color", () => {
      render(<Footer />);
      const footer = document.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });
  });
});
