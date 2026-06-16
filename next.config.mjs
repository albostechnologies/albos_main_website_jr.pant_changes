/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // These sections live inside the single-page shell (app/page.jsx) rather than
  // as their own route files. Rewriting them to "/" lets clean URLs like
  // /about be deep-linked and refreshed without a 404 — the shell reads the
  // active section from the pathname. (/services has its own route tree.)
  async rewrites() {
    return [
      { source: "/about", destination: "/" },
      { source: "/technologies", destination: "/" },
      { source: "/industries", destination: "/" },
      { source: "/contact", destination: "/" },
    ];
  },
};

export default nextConfig;
