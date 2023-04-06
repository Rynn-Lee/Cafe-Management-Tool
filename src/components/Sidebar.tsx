import Link from "next/link";
import { useEffect, useState } from "react";
import { activePage } from "../utils/activePage"
import mainIco from "../assets/icons/home.svg"
import manageIco from "../assets/icons/manage.svg"
import userIco from "../assets/icons/user.svg"
import Image from "next/image";

export default function Sidebar({passedName}: any){
  const[page, setPage] = useState("")

  useEffect(()=>{
    activePage(null)
  },[])


  return(
    <div className="sidebar">
      <span className="logo">Панель управления</span>
      <div className="sidebar-buttons">
        <Link href="/" className="sidebar-button" onClick={() => activePage("main")}><Image src={mainIco} className="ico" alt={"Главное меню"} />Главная</Link>
        <Link href="/administration" className="sidebar-button" onClick={() => activePage("administration")}><Image src={manageIco} className="ico" alt={"Главное меню"} />Управление</Link>
        <Link href="/account" className="sidebar-button" onClick={() => activePage("account")}><Image src={userIco} className="ico" alt={"Главное меню"} />Аккаунт</Link>
      </div>
      <div>
        <span className="logo version">RynnLee&apos;s Cafe Management Tool v0.0.1</span>
      </div>
    </div>
  )
}