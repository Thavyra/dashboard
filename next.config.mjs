/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/avatars/*/*.png"
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/u/**"
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "5128",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
