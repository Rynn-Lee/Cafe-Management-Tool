import Link from 'next/link'

export default function PageNavLayout({page, id, nav2}: any) {

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
          <Link href={"/administration"} className='nav-page'>Главная</Link>
          <Link href={"/administration/menu/overview"} className='nav-page'>Меню</Link>
          <Link href={"/administration/employees/overview"} className='nav-page'>Сотрудники</Link>
          <Link href={"/administration/service"} className='nav-page'>Сервисное Меню</Link>
        </div>
      )
    case "account":
      return (
        <div className={styleClass}>
          <Link href={`/account/${id}`} className='nav-page'>Профиль</Link>
          <Link href={`/account/statistics/${id}`} className='nav-page'>Статистика</Link>
        </div>
      )
    case "administration/menu":
      return (
        <div className={styleClass}>
          <Link href={`/administration/menu/overview`} className='nav-page2'>Просмотр</Link>
          <Link href={`/administration/menu/add`} className='nav-page2'>Добавить</Link>
        </div>
      )
    case "administration/employees":
      return (
        <div className={styleClass}>
          <Link href={`/administration/employees/overview`} className='nav-page2'>Просмотр</Link>
          <Link href={`/administration/employees/add`} className='nav-page2'>Добавить</Link>
        </div>
      )
  }

  return(<></>)
}