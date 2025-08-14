import type { Metadata } from "next";
import { Raleway, Unbounded } from "next/font/google";
import "./globals.css";

const ralewayFont = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const UnboundedFont = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weplanify",
  description: "Planifiez, partagez, partez : une seule appli pour tout gérer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ralewayFont.variable} ${UnboundedFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
