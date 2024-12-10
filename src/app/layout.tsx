import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tombala",
  description: "Tombala",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="m-0 p-0 h-[100vh] w-full dark">
        {children}
      </body>
    </html>
  );
}
