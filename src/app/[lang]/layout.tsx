import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

import { Header } from "@components/organisms/Header";
import { Providers } from "@utils/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio",
  description: "Dividend tracker",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`flex flex-col gap-4 p-3 ${inter.className}`}>
          <Providers>
            {/* @ts-expect-error Async Server Component */}
            <Header />
            {children}
            <Analytics />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
