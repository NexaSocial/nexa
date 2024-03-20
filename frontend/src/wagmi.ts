import { http } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { optimism, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Nexa',
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  chains: [ optimism, sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
  transports: {
    [sepolia.id]: http(),
  },
});

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   connectors: [
//     injected(),
//     coinbaseWallet({ appName: 'Create Wagmi' }),
//     walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
//   ],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// })

declare module 'wagmi' {
  interface Register {
    config: typeof getDefaultConfig
  }
}
