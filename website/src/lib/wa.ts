/**
 * WhatsApp URL Builder Utility
 * Creates WhatsApp chat URLs with pre-filled messages
 * per privacy requirements: no tracking params
 */

/**
 * Builds a WhatsApp URL with phone number and pre-filled message
 * @param phone - WhatsApp phone number (with country code)
 * @param msg - Pre-filled message text
 * @returns WhatsApp chat URL
 *
 * @example
 * buildWhatsAppURL("923312499496", "Hello")
 * // returns "https://wa.me/923312499496?text=Hello"
 */
export function buildWhatsAppURL(phone: string, msg: string): string {
  // Validate inputs
  if (!phone || typeof phone !== "string") {
    throw new Error("Phone number is required and must be a string");
  }

  if (!msg || typeof msg !== "string") {
    throw new Error("Message is required and must be a string");
  }

  // Encode message to handle special characters and spaces
  const encodedMsg = encodeURIComponent(msg);

  // Return WhatsApp URL without tracking params (per privacy constitution)
  return `https://wa.me/${phone}?text=${encodedMsg}`;
}

/**
 * Builds a WhatsApp URL with placeholders replaced
 * @param phone - WhatsApp phone number
 * @param msgTemplate - Message template with {date} and {guests} placeholders
 * @param date - Date to substitute in template
 * @param guests - Number of guests to substitute
 * @returns WhatsApp chat URL with filled template
 */
export function buildWhatsAppURLWithTemplate(
  phone: string,
  msgTemplate: string,
  date: string,
  guests: number
): string {
  // Replace placeholders
  const filledMessage = msgTemplate
    .replace("{date}", date)
    .replace("{guests}", guests.toString());

  return buildWhatsAppURL(phone, filledMessage);
}
