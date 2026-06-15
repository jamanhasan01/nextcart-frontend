import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/app/components/Navbar";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Tech E-Store",
  description: "Next.js & Tailwind E-commerce experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("h-full bg-slate-50", "font-sans", geist.variable)}
    >
      <body
        className={`${inter.className} min-h-screen flex flex-col antialiased text-slate-950`}
      >
        <QueryProvider>
          <ShopProvider>{children}</ShopProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
