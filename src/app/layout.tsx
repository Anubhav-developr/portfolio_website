import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anubhav-mishra.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anubhav Mishra | Android Engineer",
    template: "%s | Anubhav Mishra"
  },
  description:
    "Portfolio of Anubhav Mishra, an Android Engineer, CS Graduate, and Builder from Shahjahanpur, Uttar Pradesh, India.",
  keywords: [
    "Anubhav Mishra",
    "Android Engineer",
    "Java Android Developer",
    "MVVM",
    "Room",
    "Hilt",
    "Python",
    "MySQL",
    "Compiler Design"
  ],
  authors: [{ name: "Anubhav Mishra" }],
  creator: "Anubhav Mishra",
  openGraph: {
    title: "Anubhav Mishra | Android Engineer",
    description: "Building elegant software, one commit at a time.",
    url: siteUrl,
    siteName: "Anubhav Mishra Portfolio",
    images: [
      {
        url: "/assets/hero-lab.png",
        width: 1200,
        height: 800,
        alt: "Cinematic Android engineering portfolio visual"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Anubhav Mishra | Android Engineer",
    description: "Building elegant software, one commit at a time.",
    images: ["/assets/hero-lab.png"]
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#070807",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
