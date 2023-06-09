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
          <Link href={"/"} className='nav-page'>Главная</Link>
        </div>
      )
    case "administration":
      return (
        <div className={styleClass}>
          <Link href={"/administration/menu/viewdishes"} className='nav-page'><Image src={listIco} alt="plus" className='ico'/>Меню</Link>
          <Link href={"/administration/employees/overview"} className='nav-page'><Image src={userIco} alt="plus" className='ico'/>Сотрудники</Link>
          <Link href={"/administration/service/printers"} className='nav-page'><Image src={wrenchIco} alt="plus" className='ico'/>Сервисное Меню</Link>
        </div>
      )
    case "account":
      return (
        <div className={styleClass}>
          <Link href={`/account/${id}`} className='nav-page'><Image src={userIco} alt="plus" className='ico'/>Профиль</Link>
          <Link href={`/account/statistics/${id}`} className='nav-page'><Image src={chartIco} alt="plus" className='ico'/>Статистика</Link>
        </div>
      )
    case "orders":
      return (
        <div className={styleClass}>
          <Link href={`/orders`} className='nav-page'><Image src={plusIco} alt="plus" className='ico'/>Создать</Link>
          <Link href={`/orders/myorders`} className='nav-page'><Image src={chartIco} alt="plus" className='ico'/>Мои Заказы</Link>
          <Link href={`/orders/allorders`} className='nav-page'><Image src={chartIco} alt="plus" className='ico'/>Прочие Заказы</Link>
        </div>
      )

    case "account/statistics":
      return (
        <div className={styleClass}>
          <Link href={`/account/${id}`} className='nav-page'><Image src={userIco} alt="plus" className='ico'/>Посещаемость</Link>
          <Link href={`/account/statistics/${id}`} className='nav-page'><Image src={chartIco} alt="plus" className='ico'/>Производительность</Link>
        </div>
      )
    case "administration/menu":
      return (
        <div className={styleClass}>
          <Link href={`/administration/menu/viewdishes`} className='nav-page2'><Image src={listIco} alt="plus" className='ico'/>Меню</Link>
          <Link href={`/administration/menu/newdish`} className='nav-page2'><Image src={plusIco} alt="plus" className='ico'/>Блюдо</Link>
        </div>
      )
    case "administration/employees":
      return (
        <div className={styleClass}>
          <Link href={`/administration/employees/overview`} className='nav-page2'><Image src={listIco} alt="plus" className='ico'/>Сотрудники</Link>
          <Link href={`/administration/employees/add`} className='nav-page2'><Image src={plusIco} alt="plus" className='ico'/>Добавить</Link>
        </div>
      )
    case "administration/service":
      return (
        <div className={styleClass}>
          <Link href={`/administration/service/printers`} className='nav-page2'><Image src={plusIco} alt="plus" className='ico'/>Принтеры</Link>
          <Link href={`/administration/service/categories`} className='nav-page2'><Image src={plusIco} alt="plus" className='ico'/>Категории</Link>
          <Link href={`/administration/service/cleanup`} className='nav-page2'><Image src={listIco} alt="plus" className='ico'/>Очистка</Link>
        </div>
      )
  }
  return(<></>)
}