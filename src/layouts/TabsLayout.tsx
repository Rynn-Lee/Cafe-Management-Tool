import Link from 'next/link'
import plusIco from "@icons/plus-square.svg"
import listIco from "@icons/list.svg"
import userIco from "@icons/user.svg"
import wrenchIco from "@icons/wrench.svg"
import chartIco from "@icons/chart.svg"
import Image from 'next/image'

export default function TabsLayout({page, id, nav2}: any) {

  const styleClass = nav2 ? "nav2" : "nav"

  switch(page){
    case "main":
      return (
        <div className={styleClass}>
          <Link href={"/"} className='nav-page'>Main page</Link>
        </div>
      )
    case "administration":
      return (
        <div className={styleClass}>
          <Link href={"/administration/menu/viewdishes"} className='nav-page'><Image src={listIco} alt="plus" className='ico'/>Menu</Link>
          <Link href={"/administration/employees/overview"} className='nav-page'><Image src={userIco} alt="plus" className='ico'/>Employees</Link>
          <Link href={"/administration/service/printers"} className='nav-page'><Image src={wrenchIco} alt="plus" className='ico'/>Service menu</Link>
        </div>
      )
    case "account":
      return (
        <div className={styleClass}>
          <Link href={`/account/${id}`} className='nav-page'><Image src={userIco} alt="plus" className='ico'/>Profile</Link>
          <Link href={`/account/statistics/${id}`} className='nav-page'><Image src={chartIco} alt="plus" className='ico'/>Statistics</Link>
        </div>
      )
    case "orders":
      return (
        <div className={styleClass}>
          <Link href={`/orders`} className='nav-page'><Image src={plusIco} alt="plus" className='ico'/>Add an order</Link>
          <Link href={`/orders/overview/myorders`} className='nav-page'><Image src={chartIco} alt="plus" className='ico'/>Orders</Link>
        </div>
      )

    case "orders/overview":
      return (
        <div className={styleClass}>
          <Link href={`/orders/overview/myorders`} className='nav-page2'><Image src={userIco} alt="plus" className='ico'/>My orders</Link>
          <Link href={`/orders/overview/allorders`} className='nav-page2'><Image src={chartIco} alt="plus" className='ico'/>Other orders</Link>
        </div>
      )
    case "account/statistics":
      return (
        <div className={styleClass}>
          <Link href={`/account/${id}`} className='nav-page'><Image src={userIco} alt="plus" className='ico'/>Attendance</Link>
          <Link href={`/account/statistics/${id}`} className='nav-page'><Image src={chartIco} alt="plus" className='ico'/>Performance</Link>
        </div>
      )
    case "administration/menu":
      return (
        <div className={styleClass}>
          <Link href={`/administration/menu/viewdishes`} className='nav-page2'><Image src={listIco} alt="plus" className='ico'/>Menu</Link>
          <Link href={`/administration/menu/newdish`} className='nav-page2'><Image src={plusIco} alt="plus" className='ico'/>Dish</Link>
        </div>
      )
    case "administration/employees":
      return (
        <div className={styleClass}>
          <Link href={`/administration/employees/overview`} className='nav-page2'><Image src={listIco} alt="plus" className='ico'/>Employees</Link>
          <Link href={`/administration/employees/add`} className='nav-page2'><Image src={plusIco} alt="plus" className='ico'/>Add</Link>
        </div>
      )
    case "administration/service":
      return (
        <div className={styleClass}>
          <Link href={`/administration/service/printers`} className='nav-page2'><Image src={plusIco} alt="plus" className='ico'/>Printers</Link>
          <Link href={`/administration/service/categories`} className='nav-page2'><Image src={plusIco} alt="plus" className='ico'/>Categories</Link>
          <Link href={`/administration/service/cleanup`} className='nav-page2'><Image src={listIco} alt="plus" className='ico'/>Clean up</Link>
        </div>
      )
  }
  return(<></>)
}