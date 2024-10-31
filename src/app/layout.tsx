import "./globals.scss";

import { AllThemeOptions, GET_THEME_OPTIONS } from "@/graphql/getThemeOptions";

import { GoogleTagManager } from "@next/third-parties/google";
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

const { userName, userTitle, siteTitle, siteDescription, siteImage } =
  allThemeOptions.allThemeOptions[0];

const siteTitleDefault =
  userName && userTitle ? `Resume of ${userName}, ${userTitle}` : "Interactive Resume";

export const metadata: Metadata = {
  title: siteTitle ? siteTitle : siteTitleDefault,
  description: siteDescription ? siteDescription : "",
  authors: [
    {
      name: userName ? userName : "",
    },
  ],
  openGraph: {
    title: siteTitle ? siteTitle : siteTitleDefault,
    description: siteDescription ? siteDescription : "",
    images: siteImage?.asset?.url
      ? [
          {
            url: siteImage.asset.url,
            width: siteImage.asset.metadata.dimensions.width,
            height: siteImage.asset.metadata.dimensions.height,
          },
        ]
      : [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env?.GTM_ID ? <GoogleTagManager gtmId={process.env.GTM_ID} /> : null}
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
