const nextConfig = {
  async redirects() {
    return [
      {
        source: '/ar/resources/:path*',
        destination: '/ar',
        permanent: false,
      },
      {
        source: '/ar/solutions/:path*',
        destination: '/ar/solutions',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
