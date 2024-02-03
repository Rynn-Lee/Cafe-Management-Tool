import spinner from '@icons/infinity-loading.svg'
import Image from 'next/image'
import React from 'react'

export default function LoadingScreen({error}: any){
  return(
    <div className="loading horizontal">
      {error ? "An error occured: " + error : ""}
      <Image src={spinner} alt="Spinner" className='spin ico'/>
    </div>
  )
}
