import type { Metadata } from "next";
import { playfairDisplay, inter } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsAppButton from "@/components/shared/FloatingWhatsAppButton";

export const metadata: Metadata = {
  title: "FARM NAME - Your Perfect Farmhouse Destination",
  description:
    "Experience the charm of countryside living at FARM NAME. Perfect for weddings, banquets, corporate events, and photoshoots. Book your event today!",
  keywords: [
    "farmhouse",
    "wedding venue",
    "banquet hall",
    "corporate event",
    "photoshoot location",
    "party venue",
  ],
  authors: [{ name: "FARM NAME" }],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "FARM NAME",
    title: "FARM NAME - Your Perfect Farmhouse Destination",
    description:
      "Experience the charm of countryside living at FARM NAME. Perfect for weddings, banquets, corporate events, and photoshoots.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#F5ECD7]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
