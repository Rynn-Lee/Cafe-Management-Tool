import connectDB from '@/lib/mongodb'
import { services } from '@/services'
import '@/styles/index.sass'
import type { AppProps } from 'next/app'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(()=>{
    const response = services.account.checkLogin()
    const path = router.pathname
    console.log(path)
    if(path !== "/login" && !response){router.push("/login"); return}
    router.events.on('routeChangeComplete', () => {
      if(!response){router.push("/login"); return}
    })
    return()=>{
      router.events.off('routeChangeComplete',()=>{
        console.log("unsubbed!")
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}
