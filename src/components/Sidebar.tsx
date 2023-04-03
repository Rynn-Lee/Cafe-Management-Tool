import Link from "next/link";
import { useEffect, useState } from "react";
import activePage from "../utils/activePage"
import { useSelector, useDispatch } from "react-redux"
import { setInfo, deleteInfo } from '@/reducers/auth/authSlice'
import { services } from "@/services";

export default function Sidebar({passedName}: any){
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
        <Link href="/account" className="sidebar-button" onClick={() => pageStyle("account")}>{passedName.full_name}</Link>
      </div>
      <div>
        <span className="logo version">RynnLee&apos;s Cafe Management Tool v0.0.1</span>
      </div>
    </div>
  )
}