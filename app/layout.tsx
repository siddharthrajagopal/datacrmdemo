import type { Metadata } from "next";
import "./globals.css";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "DataCRM - Demand & Metadata Management",
  description: "Manage data demand and link it to metadata assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground h-screen flex flex-col overflow-hidden">
        <GlobalHeader />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
