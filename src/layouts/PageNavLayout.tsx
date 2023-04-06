import { PageLayout } from '@/layouts/PageLayout'
import { activeTab } from '@/utils/activePage'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PageNavLayout({page}: any) {

  useEffect(()=>{
    const page = window.location.pathname.split("/")[2]
    activeTab(page)
  },[])


  switch(page){
    case "main":
      return (
        <div className='nav'>
          <Link href={"/"} className='nav-page'>Главная</Link>
        </div>
      )
    case "administration":
      return (
        <div className='nav'>
          <Link href={"/administration"} className='nav-page'>Сотрудники</Link>
          <Link href={"/administration/menu"} className='nav-page'>Меню</Link>
          <Link href={"/administration/service"} className='nav-page'>Сервисное Меню</Link>
        </div>
      )
    case "account":
      return (
        <div className='nav'>
          <Link href={"/account"} className='nav-page'>Мой Профиль</Link>
          <Link href={"/account/statistics"} className='nav-page'>Моя Статистика</Link>
        </div>
      )
  }

  return(<></>)
}