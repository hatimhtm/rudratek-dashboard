/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/rudratek-dashboard",
    assetPrefix: "/rudratek-dashboard/",
    trailingSlash: true,
    images: { unoptimized: true },
};

export default nextConfig;
