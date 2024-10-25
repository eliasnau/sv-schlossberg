import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import createJiti from "jiti";

const nextConfig: NextConfig = {
  /* config options here */
};

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./src/lib/env");

export default nextConfig;
