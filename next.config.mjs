const siteHostingProvider = process?.env?.SITE_HOST;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: siteHostingProvider === "github" ? "export" : undefined,
  images: {
    unoptimized: siteHostingProvider === "github",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
