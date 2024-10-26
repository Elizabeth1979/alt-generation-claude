// Just update next.config.ts with this content
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Set-Cookie",
            value: "__vercel_live_token=; Path=/; SameSite=None; Secure",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
