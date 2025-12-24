/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler temporarily disabled for Turbopack compatibility
  // reactCompiler: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // برای لیارا - تصاویر بدون بهینه‌سازی لود می‌شوند تا مشکل حل شود
    unoptimized: true,
    remotePatterns: [],
  },

  // Compression
  compress: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Experimental features
  experimental: {
    optimizePackageImports: ["iconsax-reactjs", "lucide-react"],
  },
};

export default nextConfig;
