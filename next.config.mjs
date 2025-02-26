/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // eslint-disable-next-line no-undef
        hostname: `${process.env.STRAPI_URL}`,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
