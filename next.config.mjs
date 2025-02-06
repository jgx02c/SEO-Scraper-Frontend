// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Warning: Enabling this option allows production builds to complete
      // even if your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    // Include other Next.js configurations here
  };
  
  export default nextConfig;
  