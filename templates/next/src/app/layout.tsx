import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { QueryProvider } from "src/providers/QueryProvider";
import Navbar from "src/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecobees Next App",
  description: "Generated by create ecobees app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
