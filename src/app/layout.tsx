import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "./components/nav-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HomeLog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen antialiased`}
      >
        <div className="fixed top-0 left-0 h-full">
          <Navbar />
        </div>
        <div className="h-full w-full overflow-y-scroll p-10 pl-36">
          <div className="flex h-full w-full justify-center">{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
