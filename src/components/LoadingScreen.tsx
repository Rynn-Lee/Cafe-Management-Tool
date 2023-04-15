import spinner from '@/assets/icons/spinner.svg'
import Image from 'next/image'

export default function LoadingScreen(){
  return(
    <div className="loading">
      Операция выполняется, подождите немного...
      <Image src={spinner} alt="Spinner" className='spin'/>
    </div>
  )
}