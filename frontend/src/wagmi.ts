import { http } from 'wagmi'
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { optimism, optimismSepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Nexa',
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  chains: [ optimism, optimismSepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
  transports: {
    [optimismSepolia.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof getDefaultConfig
  }
}
