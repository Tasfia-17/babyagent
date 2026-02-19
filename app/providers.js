'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { bscTestnet, bsc } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

const config = getDefaultConfig({
  appName: 'Agent Kindergarten',
  projectId,
  chains: [bscTestnet, bsc],
  transports: {
    [bscTestnet.id]: http(process.env.NEXT_PUBLIC_BSC_TESTNET_RPC || 'https://data-seed-prebsc-1-s1.binance.org:8545'),
    [bsc.id]: http(process.env.NEXT_PUBLIC_BSC_MAINNET_RPC || 'https://bsc-dataseed1.binance.org'),
  },
  ssr: true,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
})

const customTheme = {
  ...darkTheme(),
  colors: {
    ...darkTheme().colors,
    accentColor: '#FFB6C1',
    accentColorForeground: 'white',
    modalBackground: 'white',
    modalText: '#1a1a1a',
  },
  radii: {
    ...darkTheme().radii,
    modal: '2rem',
    modalMobile: '2rem',
  },
  fonts: {
    body: 'Comfortaa, sans-serif',
  },
}

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
