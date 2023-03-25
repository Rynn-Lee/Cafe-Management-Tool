import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {

  const [data, setData] = useState([])

  useEffect(()=>{
    getData()
  },[])

  const getData = async() =>{
    
  }

  return (
    <>
      <Head><title>Cafe Management Tool</title></Head>
    </>
  )
}