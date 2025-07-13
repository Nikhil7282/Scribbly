const getEnvConfig = () => {
  switch (process.env.ENV) {
    case "dev": {
      return {
        env: "dev",
        apiUrl: "http://localhost:8000",
      };
    }
    case "stage": {
      return {
        env: "stage",
        apiUrl: "/api",
      };
    }
    case "prod": {
      return {
        env: "prod",
        apiUrl: "/api",
      };
    }
  }
};

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    externalDir: true,
  },
  publicRuntimeConfig: getEnvConfig(),
};

export default nextConfig;
