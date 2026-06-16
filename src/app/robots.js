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
