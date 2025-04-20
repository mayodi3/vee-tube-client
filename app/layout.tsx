import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VeeTube",
  description: "An application for making youtube videos",
  manifest: "/manifest.json", // Link to your manifest file
  appleWebApp: {
    capable: true,
    statusBarStyle: "default", // Or "black", "black-translucent"
    title: "VeeTube",
    // startUpImage: [], // You can add splash screen images for iOS here
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000", // Matches the theme_color in manifest.json
  // You can add other viewport settings here if needed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
