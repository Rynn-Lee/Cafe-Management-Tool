import Head from 'next/head'
import { services } from '@/services';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo, deleteInfo } from '@/reducers/auth/authSlice';

export default function Account() {
  const auth = useSelector((state: any) => state.auth.info[0])
  const dispatch = useDispatch()

  const unauth = () =>{
    services.account.unauth()
    Router.push("/login")
  }

  return (
    <>
      <Head><title>Панель Управления - Аккаунт</title></Head>
      <div className='content'>
        <span>Ваше имя: {auth.full_name}</span>
        <button onClick={()=>dispatch(setInfo("Lol"))}>Сменить имя на Lol</button>
        <button onClick={()=>dispatch(setInfo("Rynn"))}>Сменить имя на Rynn</button>
        <button onClick={()=>dispatch(setInfo("Rynn123123123"))}>Сменить имя на Rynn1233</button>
        <button onClick={()=>dispatch(deleteInfo())}>Убрать имя</button>
        <button onClick={()=>unauth()}>Выход</button>
      </div>
    </>
  )
}