import MenuList from '@/components/menu/MenuList'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '@/components/LoadingScreen';
import { Label } from '@styles/label';
import { Input } from '@styles/input';

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
          <Input placeholder="Поиск" className='w-200 outline-none bg-3' onChange={(e) => setQuery(e.target.value)}/>
          <MenuList menu={menu.data} query={query} deleteDish={deleteDish}/>
        </PageLayout>
      </PageLayout>
      {menu.isFetching && <LoadingScreen />}
    </>
  )
}