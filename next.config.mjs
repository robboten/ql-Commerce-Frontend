/** @type {import('next').NextConfig} */
const nextConfig = {
    
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'picsum.photos',
              pathname: '/**',
            },
            {
              protocol: 'https',
              hostname: 'loremflickr.com',
              pathname: '/**',
            },
          ],
    }

    
};

export default nextConfig;
