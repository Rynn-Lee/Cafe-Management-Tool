import MenuList from '@/components/menu/MenuList'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '@/components/LoadingScreen';

export default function Menu() {
  const [query, setQuery] = useState<any>("")

  const menu = useQuery({
    queryKey: ["menu"],
    queryFn: () => services.menu.findMenu(),
    enabled: false
  })
  
  useEffect(()=>{
    !menu.data && menu.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const deleteDish = async (id: any) => {
    await services.menu.deleteDish(id)
    menu.refetch()
  }

  return (
    <>
      <PageLayout title={"Меню > Добавить - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <div className='form'>
            <span>Блюдо</span>
            <input placeholder='Введите название' onChange={(e) => setQuery(e.target.value)} className='right-input bg-slate-950'/>
          </div>
          <MenuList menu={menu.data} query={query} deleteDish={deleteDish}/>
        </PageLayout>
      </PageLayout>
      {menu.isFetching && <LoadingScreen />}
    </>
  )
}