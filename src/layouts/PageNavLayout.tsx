import { PageLayout } from '@/layouts/PageLayout'
// import { activePage, activeTab } from '@/utils/activePage'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PageNavLayout({page, id}: any) {

  // useEffect(()=>{
  //   const page = window.location.pathname.split("/")[2]
  //    activeTab(page)
  // })


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
          <Link href={"/administration"} className='nav-page'>Главная</Link>
          <Link href={"/administration/menu"} className='nav-page'>Меню</Link>
          <Link href={"/administration/employees"} className='nav-page'>Сотрудники</Link>
          <Link href={"/administration/service"} className='nav-page'>Сервисное Меню</Link>
        </div>
      )
    case "account":
      return (
        <div className='nav'>
          <Link href={`/account/${id}`} className='nav-page'>Профиль</Link>
          <Link href={`/account/statistics/${id}`} className='nav-page'>Статистика</Link>
        </div>
      )
  }

  return(<></>)
}