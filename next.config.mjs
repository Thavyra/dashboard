/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*{/}?',
                headers: [
                    {
                        key: "X-Accel-Buffering",
                        value: "no"
                    }
                ]
            }
        ]
    },
    
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
            }
        ]
    }
};

export default nextConfig;
