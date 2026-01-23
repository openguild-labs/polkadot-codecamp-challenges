import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'

// Import config
import { routeTree } from './routeTree.gen'
import { config, wagmiAdapter, projectId, chains, metadata } from './config/wagmi'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// Create QueryClient
const queryClient = new QueryClient()

// Initialize AppKit BEFORE React renders
createAppKit({
  adapters: [wagmiAdapter],
  networks: chains,
  projectId,
  metadata,
  features: {
    analytics: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#6366f1',
  }
})

// Create router
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </StrictMode>,
  )
}

reportWebVitals()
