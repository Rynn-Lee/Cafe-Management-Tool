import Link from "next/link";
import { useState } from "react";
import activePage from "../utils/activePage"

export default function Sidebar(){
  const[page, setPage] = useState("")
  
  const pageStyle = (page: string) =>{
    activePage(page)
  }

  return(
    <div className="sidebar">
      <span className="logo">Панель управления</span>
      <div className="sidebar-buttons">
        <Link href="/" className="sidebar-button" onClick={() => pageStyle("main")}>Главная</Link>
        <Link href="/menu" className="sidebar-button" onClick={() => pageStyle("menu")}>Меню</Link>
        <Link href="/orders" className="sidebar-button" onClick={() => pageStyle("orders")}>Заказы</Link>
        <Link href="/administration" className="sidebar-button" onClick={() => pageStyle("administrating")}>Администрирование</Link>
      </div>
      <Link href="/account" className="logo sidebar-button" onClick={() => pageStyle("account")}>Мой аккаунт</Link>
    </div>
  )
}