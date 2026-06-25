import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/app/components/common/Navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

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
      suppressHydrationWarning
      className={cn("h-full bg-background", "font-sans", geist.variable)}
    >
      <body
        // FIX 3: Replaced "text-slate-950" with adaptive "text-foreground" so text colors stay perfectly balanced
        className={cn(
          inter.className,
          "min-h-screen flex flex-col antialiased bg-background text-foreground",
        )}
      >
        <QueryProvider>
          <ShopProvider>
            <main>{children}</main>
          </ShopProvider>
        </QueryProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
