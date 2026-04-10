import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AmplifyProvider } from "@/components/AmplifyProvider";
import { QueryProvider } from "@/components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bachelor Party Planner",
  description: "Find the best weekend for the bachelor party",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body className="font-sans">
        <AmplifyProvider>
          <QueryProvider>{children}</QueryProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}
