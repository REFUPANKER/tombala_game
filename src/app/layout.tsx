import type { Metadata } from "next";
import "./globals.css";
import toast, { Toaster } from 'react-hot-toast';
export const metadata: Metadata = {
  title: "Tombala",
  description: "Tombala",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="m-0 p-0 h-[100vh] w-full dark">
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "#171717",
              color: "white",
              padding:"1rem",
            },
            position: "top-center",
            duration: 3000
          }} />
        {children}
      </body>
    </html>
  );
}
