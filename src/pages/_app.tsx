import '@/styles/index.sass'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { services } from '@/services'

export default function App({ Component, pageProps }: AppProps) { 
  const connect = async() => await services.db.connect()
  useEffect(()=>{connect()}, [])

  return(
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
  )
}
