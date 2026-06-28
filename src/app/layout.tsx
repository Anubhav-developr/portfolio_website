import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-website-anubhavdeveloprs-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anubhav Mishra | Full Stack Developer",
    template: "%s | Anubhav Mishra"
  },
  description:
    "Portfolio of Anubhav Mishra — Full Stack Developer, GDS ABPM, CS Graduate, and CodeChef global rank 24 from Shahjahanpur, Uttar Pradesh, India.",
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
    title: "Anubhav Mishra | Full Stack Developer",
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
    title: "Anubhav Mishra | Full Stack Developer",
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
