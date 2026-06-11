"use client";

import { buildWhatsAppURL } from "@/lib/wa";
import { PHONE } from "@/lib/constants";
import { playfairDisplay } from "@/lib/fonts";

type SectionCTAProps = {
  headline: string;
  btnText: string;
  msgOverride?: string;
};

export default function SectionCTA({
  headline,
  btnText,
  msgOverride,
}: SectionCTAProps) {
  const message = msgOverride || "Hi, I want to book the farmhouse";
  const whatsappUrl = buildWhatsAppURL(PHONE, message);

  return (
    <section className="w-full bg-[#1B3A2D] py-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className={`mb-6 text-3xl font-bold text-white ${playfairDisplay.className} md:text-4xl`}>
          {headline}
        </h2>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-10 py-4 text-lg font-semibold text-white transition-all hover:bg-[#20bd5a] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#1B3A2D]"
        >
          {btnText}
        </a>
      </div>
    </section>
  );
}
