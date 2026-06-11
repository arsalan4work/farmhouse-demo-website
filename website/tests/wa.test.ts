/**
 * WhatsApp URL Builder Tests
 * Test file for wa.ts utilities
 * TDD: Tests written before implementation
 */

import { describe, it, expect, beforeEach } from "vitest";
import { buildWhatsAppURL, buildWhatsAppURLWithTemplate } from "../src/lib/wa";

// Test data
const TEST_PHONE = "923312499496";
const TEST_MSG = "Hello, I want to book the farmhouse";
const TEST_DATE = "2026-06-15";
const TEST_GUESTS = 5;
const WA_MSG_TEMPLATE = `Assalamualaikum,

Mujhe apka farmhouse book krwana ha

Date: {date}
Guests: {guests}

Ap details bata skty hn?`;

describe("buildWhatsAppURL", () => {
  describe("Happy path", () => {
    it("should return correct WhatsApp domain", () => {
      const url = buildWhatsAppURL(TEST_PHONE, TEST_MSG);
      expect(url).toMatch(/^https:\/\/wa\.me\//);
    });

    it("should include the phone number in URL", () => {
      const url = buildWhatsAppURL(TEST_PHONE, TEST_MSG);
      expect(url).toContain(TEST_PHONE);
    });

    it("should include the message as text parameter", () => {
      const url = buildWhatsAppURL(TEST_PHONE, TEST_MSG);
      expect(url).toContain("?text=");
    });
  });

  describe("URL encoding", () => {
    it("should encode spaces in message", () => {
      const msgWithSpaces = "Hello World";
      const url = buildWhatsAppURL(TEST_PHONE, msgWithSpaces);
      expect(url).toContain(encodeURIComponent(msgWithSpaces));
      expect(url).not.toContain(" ");
    });

    it("should encode special characters in message", () => {
      const msgWithSpecialChars = "Hello! How are you?";
      const url = buildWhatsAppURL(TEST_PHONE, msgWithSpecialChars);
      expect(url).toContain(encodeURIComponent(msgWithSpecialChars));
    });

    it("should handle unicode characters", () => {
      const msgWithUnicode = "مرحبا"; // Arabic for "Hello"
      const url = buildWhatsAppURL(TEST_PHONE, msgWithUnicode);
      expect(url).toContain(encodeURIComponent(msgWithUnicode));
    });
  });

  describe("Edge cases", () => {
    it("should handle empty message (throws error)", () => {
      expect(() => {
        buildWhatsAppURL(TEST_PHONE, "");
      }).toThrow("Message is required");
    });

    it("should handle empty phone (throws error)", () => {
      expect(() => {
        buildWhatsAppURL("", TEST_MSG);
      }).toThrow("Phone number is required");
    });

    it("should handle null phone (throws error)", () => {
      expect(() => {
        // @ts-expect-error - Testing invalid input
        buildWhatsAppURL(null, TEST_MSG);
      }).toThrow("Phone number is required");
    });

    it("should handle null message (throws error)", () => {
      expect(() => {
        // @ts-expect-error - Testing invalid input
        buildWhatsAppURL(TEST_PHONE, null);
      }).toThrow("Message is required");
    });
  });
});

describe("buildWhatsAppURLWithTemplate", () => {
  it("should replace {date} placeholder", () => {
    const url = buildWhatsAppURLWithTemplate(
      TEST_PHONE,
      WA_MSG_TEMPLATE,
      TEST_DATE,
      TEST_GUESTS
    );
    expect(url).toContain(TEST_DATE);
    expect(url).not.toContain("{date}");
  });

  it("should replace {guests} placeholder", () => {
    const url = buildWhatsAppURLWithTemplate(
      TEST_PHONE,
      WA_MSG_TEMPLATE,
      TEST_DATE,
      TEST_GUESTS
    );
    expect(url).toContain(TEST_GUESTS.toString());
    expect(url).not.toContain("{guests}");
  });

  it("should build complete WhatsApp URL with template", () => {
    const url = buildWhatsAppURLWithTemplate(
      TEST_PHONE,
      WA_MSG_TEMPLATE,
      TEST_DATE,
      TEST_GUESTS
    );
    expect(url).toBe(
      `https://wa.me/${TEST_PHONE}?text=${encodeURIComponent(
        WA_MSG_TEMPLATE.replace("{date}", TEST_DATE).replace("{guests}", TEST_GUESTS.toString())
      )}`
    );
  });
});
