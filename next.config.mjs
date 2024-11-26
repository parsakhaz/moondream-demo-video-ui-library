/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    runtime: "edge",
  },
  // Disable SSR completely
  unstable_runtimeJS: true,
  unstable_JsPreload: false,
};

export default nextConfig;
