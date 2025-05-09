/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
      'pino-pretty': 'commonjs pino-pretty',
    });
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  },
  transpilePackages: [
    '@web3modal/wagmi',
    '@web3modal/ethereum',
    '@web3modal/core',
    '@walletconnect/ethereum-provider',
    '@walletconnect/modal',
  ],
};

export default nextConfig; 