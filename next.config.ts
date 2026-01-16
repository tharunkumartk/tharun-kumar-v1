import { withGTConfig } from "gt-next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ["ydfksaipdlqazgcsrdlm.supabase.co"]
  }
};

export default withGTConfig(nextConfig, {});