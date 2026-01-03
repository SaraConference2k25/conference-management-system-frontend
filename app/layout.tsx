import type { Metadata } from "next";
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
  title: "SARA 2025 National Conference - Advancing Research and Academic Excellence",
  description: "Join SARA 2025 National Conference at Saranathan College of Engineering. A premier platform for researchers, academicians, and industry professionals to share groundbreaking research across engineering, technology, and applied sciences.",
  keywords: "conference, research, academic, engineering, SARA 2025, Saranathan",
  authors: [{ name: "SARA Conference Team" }],
  openGraph: {
    title: "SARA 2025 National Conference",
    description: "Advancing Research and Academic Excellence",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
