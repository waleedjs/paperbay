"use client";
import { Poppins, Mulish } from "next/font/google";
import '../styles/globals.css';
import { SiteHeader } from "@/app/layout/Header";
import { SiteFooter } from "@/app/layout/Footer";

// Importing Poppins for headings
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "700"], // Regular and bold weights
  subsets: ["latin"],
});

// Importing Mulish for body text
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* You can include <head> here if needed */}
      <body className={`${poppins.variable} ${mulish.variable} antialiased`}>
        {/* Header component */}
        <SiteHeader />
        
        {/* Main content */}
        <main>{children}</main>
        
        {/* Footer component */}
        <SiteFooter />
      </body>
    </html>
  );
}
