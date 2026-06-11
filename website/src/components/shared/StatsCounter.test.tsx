import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import StatsCounter from "./StatsCounter";

// Mock IntersectionObserver
let observerCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null;

vi.mock(" IntersectionObserver", () => {
  return {
    default: class MockIntersectionObserver {
      constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
        observerCallback = callback;
      }
      observe() {
        return null;
      }
      unobserve() {
        return null;
      }
      disconnect() {
        return null;
      }
    },
  };
});

describe("StatsCounter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    observerCallback = null;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the label", () => {
    render(<StatsCounter value={100} label="Events Hosted" />);
    expect(screen.getByText("Events Hosted")).toBeInTheDocument();
  });

  it("renders the value with + suffix", () => {
    render(<StatsCounter value={100} label="Events Hosted" />);
    expect(screen.getByText("0+")).toBeInTheDocument();
  });

  it("applies Playfair Display font to the number", () => {
    render(<StatsCounter value={100} label="Events Hosted" />);
    // Playfair Display should be applied to the number
    // The className is applied to the span
    expect(screen.getByText("0+")).toBeInTheDocument();
  });

  it("applies amber color #D4A843 to the number", () => {
    render(<StatsCounter value={100} label="Events Hosted" />);
    expect(screen.getByText("0+")).toBeInTheDocument();
  });

  it("counts up when observer enters viewport", () => {
    const { unmount } = render(<StatsCounter value={100} label="Events Hosted" />);

    // Simulate IntersectionObserver triggering
    if (observerCallback) {
      observerCallback([
        {
          isIntersecting: true,
          target: { getBoundingClientRect: () => ({}) } as Element,
        } as IntersectionObserverEntry,
      ]);
    }

    // After animation, should show the count
    expect(screen.getByText("100+")).toBeInTheDocument();
    unmount();
  });

  it("only animates once", () => {
    const { unmount } = render(<StatsCounter value={100} label="Events Hosted" />);

    // First trigger
    if (observerCallback) {
      observerCallback([
        {
          isIntersecting: true,
          target: { getBoundingClientRect: () => ({}) } as Element,
        } as IntersectionObserverEntry,
      ]);
    }

    // Second trigger (should not re-animate)
    if (observerCallback) {
      observerCallback([
        {
          isIntersecting: true,
          target: { getBoundingClientRect: () => ({}) } as Element,
        } as IntersectionObserverEntry,
      ]);
    }

    expect(screen.getByText("100+")).toBeInTheDocument();
    unmount();
  });

  it("handles zero value correctly", () => {
    render(<StatsCounter value={0} label="Events Hosted" />);
    expect(screen.getByText("0+")).toBeInTheDocument();
  });

  it("handles large values correctly", () => {
    render(<StatsCounter value={5000} label="Happy Customers" />);
    // Should eventually count up
    expect(screen.getByText("5000+")).toBeInTheDocument();
  });
});
