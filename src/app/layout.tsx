import "./globals.scss";

import { AllThemeOptions, GET_THEME_OPTIONS } from "@/graphql/getThemeOptions";

import { Layout } from "@/components/Layout/Layout";
import type { Metadata } from "next";
import { ThemeAppearanceProvider } from "@/context/ThemeContext";
import { getApolloClient } from "@/lib/apolloClient";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const client = getApolloClient();

const { data: allThemeOptions } = await client.query<AllThemeOptions>({
  query: GET_THEME_OPTIONS,
});

const userName = allThemeOptions.allThemeOptions?.[0]?.userName;
const userTitle = allThemeOptions.allThemeOptions?.[0]?.userTitle;

export const metadata: Metadata = {
  title: `Resume of ${userName}, ${userTitle}`,
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeAppearanceProvider>
          <Layout>{children}</Layout>
        </ThemeAppearanceProvider>
      </body>
    </html>
  );
}
