import '@/styles/index.sass'
import type { AppProps } from 'next/app'
import Layout from '@/layouts/layout'
import { useEffect } from 'react'
import { services } from '@/services'
import { QueryClient,  QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
defaultOptions: {
  queries: {
    refetchOnWindowFocus: false, // default: true
  },
},})

export default function App({ Component, pageProps }: AppProps) { 
  const connect = async() => await services.db.connect()
  useEffect(()=>{connect()}, [])

  return(
  <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    <ReactQueryDevtools/>
  </QueryClientProvider>
  )
}
