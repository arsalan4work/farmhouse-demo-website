/**
 * Constants Tests
 * Test file for constants.ts
 * TDD: Tests written before implementation
 */

import { describe, it, expect } from "vitest";
import { PRICES, FACILITIES } from "../src/lib/constants";

describe("PRICES", () => {
  it("should have three pricing tiers", () => {
    const tiers = Object.keys(PRICES);
    expect(tiers).toHaveLength(3);
    expect(tiers).toContain("weekdays");
    expect(tiers).toContain("friday");
    expect(tiers).toContain("weekend");
  });

  describe("Weekdays pricing", () => {
    it("should have correct rates", () => {
      expect(PRICES.weekdays.rates.day).toBe(45000);
      expect(PRICES.weekdays.rates.night).toBe(55000);
      expect(PRICES.weekdays.rates.dayAndNight).toBe(85000);
    });

    it("should have correct label and period", () => {
      expect(PRICES.weekdays.label).toBe("Weekdays");
      expect(PRICES.weekdays.period).toBe("Sun Night - Thu Day");
    });

    it("should not be highlighted", () => {
      expect(PRICES.weekdays.highlighted).toBe(false);
    });
  });

  describe("Friday pricing", () => {
    it("should have correct rates", () => {
      expect(PRICES.friday.rates.day).toBe(55000);
      expect(PRICES.friday.rates.night).toBe(60000);
      expect(PRICES.friday.rates.dayAndNight).toBe(95000);
    });

    it("should have correct label and period", () => {
      expect(PRICES.friday.label).toBe("Friday");
      expect(PRICES.friday.period).toBe("Thu Night - Sat Day");
    });

    it("should be highlighted", () => {
      expect(PRICES.friday.highlighted).toBe(true);
    });
  });

  describe("Weekend pricing", () => {
    it("should have correct rates", () => {
      expect(PRICES.weekend.rates.day).toBe(60000);
      expect(PRICES.weekend.rates.night).toBe(70000);
      expect(PRICES.weekend.rates.dayAndNight).toBe(110000);
    });

    it("should have correct label and period", () => {
      expect(PRICES.weekend.label).toBe("Weekends");
      expect(PRICES.weekend.period).toBe("Sat Night - Sun Day");
    });

    it("should not be highlighted", () => {
      expect(PRICES.weekend.highlighted).toBe(false);
    });
  });

  describe("Rate validation", () => {
    it("dayAndNight rate should be <= day + night for all tiers", () => {
      for (const tier of Object.values(PRICES)) {
        expect(tier.rates.dayAndNight).toBeLessThanOrEqual(
          tier.rates.day + tier.rates.night
        );
      }
    });
  });
});

describe("FACILITIES", () => {
  it("should have exactly 9 facilities", () => {
    expect(FACILITIES).toHaveLength(9);
  });

  it("should have unique IDs", () => {
    const ids = FACILITIES.map((f) => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(9);
  });

  it("should contain all expected facility IDs", () => {
    const expectedIds = [
      "ac-bedrooms",
      "swimming-pool",
      "cricket-ground",
      "bbq-patio",
      "parking",
      "play-equipment",
      "outdoor-sitting",
      "indoor-games",
      "attached-bathrooms",
    ];
    const actualIds = FACILITIES.map((f) => f.id);
    expectedIds.forEach((id) => {
      expect(actualIds).toContain(id);
    });
  });

  describe("Each facility", () => {
    it("should have valid structure (id, name, description, iconName)", () => {
      for (const facility of FACILITIES) {
        expect(facility).toHaveProperty("id");
        expect(facility).toHaveProperty("name");
        expect(facility).toHaveProperty("description");
        expect(facility).toHaveProperty("iconName");
        expect(typeof facility.id).toBe("string");
        expect(typeof facility.name).toBe("string");
        expect(typeof facility.description).toBe("string");
        expect(typeof facility.iconName).toBe("string");
      }
    });
  });
});
