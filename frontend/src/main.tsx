import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { NextUIProvider } from '@nextui-org/react'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'

import App from './App.tsx'
import { config } from './wagmi.ts'

import './index.css'
import '@rainbow-me/rainbowkit/styles.css';

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en" theme={darkTheme({
          accentColor: '#8F21EA',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}>
          <NextUIProvider>
            <main className="dark text-foreground bg-background">
              <App />
            </main>
          </NextUIProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
