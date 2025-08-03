const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    externalDir: true,
  },
  env: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
