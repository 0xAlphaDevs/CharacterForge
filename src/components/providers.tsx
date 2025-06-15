
import { getDefaultConfig, TomoEVMKitProvider } from '@tomo-inc/tomo-evm-kit';
import { WagmiProvider } from 'wagmi';
import { storyAeneid } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from '@tomo-inc/tomo-evm-kit/wallets';

const config = getDefaultConfig({
  clientId: process.env.NEXT_PUBLIC_TOMO_CLIENT_ID, // Replace with your clientId
  appName: 'My TomoEVMKit App',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string, // Note: Every dApp that relies on WalletConnect now needs to obtain a projectId from WalletConnect Cloud.
  chains: [storyAeneid],
  ssr: false, // If your dApp uses server-side rendering (SSR)
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet, // Add other wallets if needed
      ],
    },
  ],
});

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TomoEVMKitProvider>
          {children}
        </TomoEVMKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;