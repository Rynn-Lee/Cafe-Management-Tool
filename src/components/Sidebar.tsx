import Link from "next/link";
import mainIco from "@icons/home.svg"
import manageIco from "@icons/manage.svg"
import userIco from "@icons/user.svg"
import listIco from "@icons/list.svg"
import codeIco from "@icons/code.svg"
import { useEffect } from "react";
import { activePage } from '@/utils/activePage'
import Image from "next/image";

export default function Sidebar(){

  useEffect(()=>activePage())

  return(
    <div className="sidebar">
      <span className="logo"><span>Ry<Image src={codeIco} alt="code" className="ico"/>Panel</span></span>
      <div className="sidebar-buttons">
        <Link href="/" className="sidebar-button"><Image src={mainIco} className="ico" alt={"Главная"} /><span>Главная</span></Link>
        <Link href="/orders" className="sidebar-button"><Image src={listIco} className="ico" alt={"Управление"} /><span>Заказы</span></Link>
        <Link href="/administration/menu/viewdishes" className="sidebar-button"><Image src={manageIco} className="ico" alt={"Управление"} /><span>Управление</span></Link>
        <Link href={`/account/my`} className="sidebar-button"><Image src={userIco} className="ico" alt={"Аккаунт"} /><span>Аккаунт</span></Link>
      </div>
      <div>
        <span className="logo version">RynnLee&apos;s Cafe Management Tool v0.0.1</span>
      </div>
    </div>
  )
}