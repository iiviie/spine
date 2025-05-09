import { createAppKit } from '@reown/appkit';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, polygon, arbitrum, optimism, base } from '@reown/appkit/networks';

// Define networks to support
export const networks = [mainnet, polygon, arbitrum, optimism, base];

// Client-side only code
let appKit: ReturnType<typeof createAppKit>;
let wagmiConfig: any;

// Initialize the AppKit only on the client side
if (typeof window !== 'undefined') {
  // Get your project ID from https://cloud.reown.com
  const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || 'YOUR_PROJECT_ID';

  // Set up Wagmi adapter
  const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks
  });

  // Configure the metadata
  const metadata = {
    name: 'Spine',
    description: 'Spine Web3 Application',
    url: window.location.origin, // Dynamically get the origin
    icons: [`${window.location.origin}/logo.svg`] // Using SVG logo
  };

  // Create the modal
  appKit = createAppKit({
    adapters: [wagmiAdapter],
    networks,
    metadata,
    projectId,
    features: {
      analytics: true,
      email: true,
      socials: ['google', 'twitter']
    }
  });

  // Export the wagmi config for use with wagmi hooks
  wagmiConfig = wagmiAdapter.wagmiConfig;
}

export { appKit, wagmiConfig }; 