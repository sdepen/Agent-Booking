import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: "/", destination: "/agentbooking.html", permanent: false },
      { source: "/mentions-legales", destination: "/mentions-legales.html", permanent: false },
      { source: "/confidentialite", destination: "/confidentialite.html", permanent: false },
      { source: "/conditions-service", destination: "/service.html", permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: "/demo", destination: "/demo-start.html" },
      { source: "/agent", destination: "/demo-agent.html" },
    ];
  },
};

export default nextConfig;
