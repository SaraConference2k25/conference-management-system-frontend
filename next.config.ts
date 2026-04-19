import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // ✅ THIS is the key fix
};

export default nextConfig;