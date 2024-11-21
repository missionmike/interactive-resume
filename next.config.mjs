const siteHostingProvider = process?.env?.SITE_HOST;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // For GitHub hosting, the build should be output to the "out" folder.
  output: siteHostingProvider === "github" ? "export" : undefined,

  async exportPathMap(defaultPathMap) {
    // Remove the Studio page when hosted on GitHub.
    if (siteHostingProvider === "github") {
      const { "/studio/[[...tool]]": _, ...filteredPaths } = defaultPathMap;
      return filteredPaths;
    }

    // Include all paths if not on GitHub
    return defaultPathMap;
  },

  images: {
    // Images need to be unoptimized on GitHub pages.
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
