import { services } from '@/services';
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useCallback } from 'react'
let md5 = require('md5');

export default function Login() {
  const router = useRouter()
  const loginForm = useRef()

  const handleLoginForm = useCallback(async(e: any) => {
    e.preventDefault()
    const formResults: any = loginForm.current

    const requestReturn: any = await services.account.findUser(
      formResults['FIO'].value,
      md5(formResults['Password'].value)
    )

    formResults['result'].value = "Loading..."
    formResults['FIO'].value = "Loading..."
    formResults['Password'].value = "Loading..."
    // formResults['button'].disabled = true
    

    requestReturn ? router.push("/")
      : formResults['result'].value = requestReturn;
        // formResults['button'].disabled = false
  },[])

  return (
    <>
      <Head><title>Панель Управления - Вход</title></Head>
      <div className='login-content'>
        <div className='login-block'>
          <form className='vertical' ref={loginForm as any} onSubmit={handleLoginForm}>
            <div className='horizontal'><input value="Cafe Management Tool" className="input-placeholder status" name={'result'} disabled/></div>
            <div className='horizontal'><input value="ФИО" className="input-placeholder" disabled/><input name={'FIO'} placeholder='Введите ФИО'/></div>
            <div className='horizontal'><input value="Пароль" className="input-placeholder" disabled/><input name={'Password'} placeholder='Введите пароль'/></div>
            <button name={'button'}>Вход</button>
          </form>
        </div>
      </div>
    </>
  )
}