import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";

const interSans = Inter({
  variable: "--font-inter",
  subsets:["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Json Schema Builder",
  description: "JSON schema builder with live editing & nesting — a fun project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body
        className={`${interSans.variable} antialiased dark pt-30 font-sans`}
      >
        {children}
        <Footer />
        <div className="fixed bottom-0 left-0 w-full h-[0px] pointer-events-none z-50" style={{
          boxShadow: '0px -13px 92px 97px rgba(0,0,0,1)', backgroundColor: 'rgba(0,0,0,0.82)'
        }} />

      </body>
    </html>
  );
}
