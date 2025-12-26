/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      turbo: {
        root: __dirname, // ✅ force Next/Turbopack root to this folder
      },
    },
  };
  
  module.exports = nextConfig;
  