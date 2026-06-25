// Emit a static robots.txt during `output: export`.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: "https://albostechnologies.com/sitemap.xml",
  };
}
