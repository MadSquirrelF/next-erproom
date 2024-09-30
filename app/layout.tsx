import "@/styles/globals.scss";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/src/shared/config/site";
import { fontSans } from "@/src/shared/config/fonts";
import { Navbar } from "@/src/widgets/Navbar/Navbar";
import { Sidebar } from "@/src/widgets/Sidebar/ui/Sidebar";

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
    <html suppressHydrationWarning className="h-full bg-background" lang="ru">
      <head />
      <body
        className={clsx(
          "bg-background h-full font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="bg-background min-h-screen w-full">
            <Navbar />
            <div className="flex flex-row relative">
              <Sidebar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
