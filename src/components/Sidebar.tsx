import Link from "next/link";
import mainIco from "../assets/icons/home.svg"
import manageIco from "../assets/icons/manage.svg"
import userIco from "../assets/icons/user.svg"
import Image from "next/image";
import { useEffect } from "react";
import { activePage } from '@/utils/activePage'

export default function Sidebar(){

  useEffect(()=>activePage())

  return(
    <div className="sidebar">
      <span className="logo"><span>Панель управления</span></span>
      <div className="sidebar-buttons">
        <Link href="/" className="sidebar-button"><Image src={mainIco} className="ico" alt={"Главная"} /><span>Главная</span></Link>
        <Link href="/administration" className="sidebar-button"><Image src={manageIco} className="ico" alt={"Управление"} /><span>Управление</span></Link>
        <Link href={`/account/my`} className="sidebar-button"><Image src={userIco} className="ico" alt={"Аккаунт"} /><span>Аккаунт</span></Link>
      </div>
      <div>
        <span className="logo version">RynnLee&apos;s Cafe Management Tool v0.0.1</span>
      </div>
    </div>
  )
}