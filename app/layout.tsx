import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "@livechat/developer-ui-react";
import { AppConfig } from "@livechat/developer-sdk";
import config from "livechat.config.json";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developer app template (NextJs)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider config={config as unknown as AppConfig}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
