import Link from "next/link";
import mainIco from "@icons/home.svg"
import manageIco from "@icons/manage.svg"
import userIco from "@icons/user.svg"
import listIco from "@icons/list.svg"
import chartIco from "@icons/chart.svg"
import codeIco from "@icons/code2-orange.svg"
import { useEffect } from "react";
import { activePage } from '@/utils/activePage'
import Image from "next/image";

export default function Sidebar(){

  useEffect(()=>activePage())

  return(
    <div className="sidebar">
      <span className="logo"><span>Ry<Image src={codeIco} alt="code" className="ico3 revert"/>Panel</span></span>
      <div className="sidebar-buttons">
        <Link href="/" className="sidebar-button"><Image src={mainIco} className="ico" alt={"Main"} /><span>Main</span></Link>
        <Link href="/orders" className="sidebar-button"><Image src={listIco} className="ico" alt={"Orders"} /><span>Orders</span></Link>
        <Link href="/statistics" className="sidebar-button"><Image src={chartIco} className="ico" alt={"Statistics"} /><span>Statistics</span></Link>
        <Link href="/administration/menu/viewdishes" className="sidebar-button"><Image src={manageIco} className="ico" alt={"Management"} /><span>Management</span></Link>
        <Link href={`/account/my`} className="sidebar-button"><Image src={userIco} className="ico" alt={"Account"} /><span>Account</span></Link>
      </div>
      <div>
        <span className="logo version">RynnLee&apos;s Cafe Management Tool v0.0.1</span>
      </div>
    </div>
  )
}