const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  //disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);