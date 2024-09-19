import "@/styles/globals.scss";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/src/shared/config/site";
import { fontSans } from "@/src/shared/config/fonts";
import { Sidebar } from "@/src/widgets/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="w-screen min-w-screen" lang="ru">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background w-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-row h-screen w-full">
            <Sidebar />
            <main className="relative h-full flex-grow w-[calc(100vw-80px)]">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
