import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700", "800"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Age Calculator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "bg-dark-gray")}>{children}</body>
    </html>
  );
}
