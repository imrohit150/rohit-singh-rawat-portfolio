import type { NextConfig } from 'next';

const resumePath = '/Rohit_Rawat_Resume.pdf';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  headers() {
    return [
      {
        source: resumePath,
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'Content-Disposition', value: 'attachment; filename="Rohit_Rawat_Resume.pdf"' },
        ],
      },
      {
        source: '/resume.pdf',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ];
  },
  redirects() {
    return [{ source: '/resume.pdf', destination: resumePath, permanent: false }];
  },
};

export default nextConfig;
