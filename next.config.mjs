const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile image এর জন্য
      },
      {
        protocol: "https",
        hostname: "**", // সব https domain allow — development এর জন্য সহজ
      },
    ],
  },
};

export default nextConfig;
