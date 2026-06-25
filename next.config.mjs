/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> emits a fully static site into `out/`.
  // Note: API routes (src/app/api/*) cannot run in a static export and are
  // excluded at build time by scripts/build-static.js. The contact /
  // newsletter / careers forms therefore require an external endpoint when
  // deployed as a static site.
  output: "export",
  // Static hosts can't run the Next.js image optimizer, so serve images as-is.
  images: { unoptimized: true },
  // Emit each route as a folder with index.html (e.g. /blog/slug/index.html),
  // which is the most portable layout across static hosts (Apache, nginx, S3,
  // GitHub Pages, cPanel).
  trailingSlash: true,
  reactStrictMode: false,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
