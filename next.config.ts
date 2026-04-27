import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enables the new React Compiler for automatic memoization
  // allowedDevOrigins: [''],
  reactCompiler: true,
  devIndicators: false,

  // Improves build speed and security by opting out of telemetry (optional)
  // telemetry: false, 

  // Removes the 'X-Powered-By' header for better security
  poweredByHeader: false,

  // Customizes build output (Standalone is perfect for Docker/microservices later)
  // output: 'standalone', 

  // Recommended: Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

export default nextConfig
