/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Cloudinary images
      },
      {
        protocol: "https",
        hostname: "example.com", // ✅ Added example.com for your current profile images
      },
    ],
  },
};

export default nextConfig;
