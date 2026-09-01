import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Les vieilles URLs .html renvoient vers les URLs propres
      { source: "/agentbooking.html", destination: "/", permanent: true },
      { source: "/mentions-legales.html", destination: "/mentions-legales", permanent: true },
      { source: "/confidentialite.html", destination: "/confidentialite", permanent: true },
      { source: "/service.html", destination: "/conditions-service", permanent: true },
    ];
  },
  async rewrites() {
    return {
      // beforeFiles : prioritaire sur les pages App Router (sinon src/app/page.tsx
      // , le wrapper iframe , servirait la racine à la place du vrai HTML)
      beforeFiles: [
        { source: "/", destination: "/agentbooking.html" },
        { source: "/mentions-legales", destination: "/mentions-legales.html" },
        { source: "/confidentialite", destination: "/confidentialite.html" },
        { source: "/conditions-service", destination: "/service.html" },
        { source: "/demo", destination: "/demo-start.html" },
        { source: "/agent", destination: "/demo-agent.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
