// next.config.ts
import type { NextConfig } from "next";

// 1. Import the PWA plugin function
// Using require here as it's commonly shown in examples, even in TS files.
// Make sure @ducanh2912/next-pwa is installed.
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public", // Service worker destination
  register: true, // Auto register service worker
  skipWaiting: true, // Skip waiting phase for service worker updates
  disable: process.env.NODE_ENV === "development", // Disable PWA features in development
  // Add any other PWA specific options here if needed later
  // e.g., runtimeCaching strategies
});

// 2. Define your regular Next.js config, including existing settings
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "**",
      },
      // Add other remote patterns here if you have more
    ],
  },
  // Add any other standard Next.js configurations here
  reactStrictMode: true, // Example: It's good practice to keep this
};

// 3. Wrap your nextConfig with the withPWA function and export
export default withPWA(nextConfig);
