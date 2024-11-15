import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/client_provider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Co-Working Space Reservation System",
  description:
    "This project is part of ITCS371 Introduction to Software Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientProvider>{children}</ClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
