import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best digital marketing agency in Calicut | advertising agency in Calicut",
  description:
    "Wydex Media is the best digital marketing agency in Calicut and a top advertising agency in Calicut, delivering creative, ROI-driven marketing solutions.",
  authors: [{ name: "Wydex Media", url: "https://wydexmedia.com" }],
  generator: "Next.js",
  applicationName: "Wydex Media",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Best digital marketing agency in Calicut",
    "Digital marketing Calicut",
    "Advertising agency Calicut",
    "Wydex Media",
    "Social media marketing Calicut",
    "SEO Calicut",
    "PPC Calicut",
  ],
  creator: "Wydex Media",
  publisher: "Wydex Media",
  metadataBase: new URL("https://www.wydexmedia.com"),
  alternates: {
    canonical: "https://www.wydexmedia.com",
  },
  openGraph: {
    title: "Wydex Media | Best Digital Marketing Agency in Calicut",
    description:
      "We are Calicut's leading digital marketing and advertising agency offering SEO, PPC, social media marketing, and branding services.",
    url: "https://wydexmedia.com",
    siteName: "Wydex Media",
    images: [
      {
        url: "https://wydexmedia.com/og-image.jpg", // Replace with real image
        width: 1200,
        height: 630,
        alt: "Wydex Media - Best Digital Marketing Agency in Calicut",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wydex Media",
    description:
      "Top digital marketing and advertising agency in Calicut specializing in creative and ROI-driven strategies.",
    site: "@wydexmedia", // Replace with your real Twitter handle
    creator: "@wydexmedia",
    images: ["https://wydexmedia.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  category: "marketing",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
