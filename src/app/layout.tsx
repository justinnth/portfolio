import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";

import { Header } from "@components/organisms/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio",
  description: "Dividend tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`flex flex-col gap-4 p-3 ${inter.className}`}>
          {/* @ts-expect-error Async Server Component */}
          <Header />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
