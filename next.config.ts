import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La landing réelle est le fichier statique public/agentbooking.html.
  // On la sert DIRECTEMENT à la racine (rewrite, l'URL reste agent-booking.fr/)
  // au lieu de l'ancienne page Next qui l'embarquait dans une <iframe>
  // (coquille vide pour Google, titre incohérent, double scroll).
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/agentbooking.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
