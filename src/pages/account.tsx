import Head from 'next/head'
import { services } from '@/services';
import Router from 'next/router';

export default function Account() {

  const unauth = () =>{
    services.account.unauth()
    Router.push("/login")
  }

  return (
    <>
      <Head><title>Панель Управления - Аккаунт</title></Head>
      <div className='content'>
        <button onClick={()=>unauth()}>Выход</button>
      </div>
    </>
  )
}