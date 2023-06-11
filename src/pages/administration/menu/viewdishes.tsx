import MenuList from '@/components/menu/MenuList'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '@/components/LoadingScreen';
import searchIco from '@icons/search.svg'
import Image from 'next/image';

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

  const changeVisibility = async (id: any, visibility: boolean) => {
    await services.menu.changeVisibility(id, visibility)
    menu.refetch()
  }
  const deleteDish = async (id: any) => {
    await services.menu.deleteDish(id)
    menu.refetch()
  }

  return (
    <>
      <PageLayout title={"Меню - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <div className='form'>
            <Image src={searchIco} alt="search" className="ico" /><input placeholder='Поиск по названию' onChange={(e) => setQuery(e.target.value)} className='right-input'/>
          </div>
          <MenuList menu={menu.data} query={query} deleteDish={deleteDish} changeVisibility={changeVisibility}/>
        </PageLayout>
      </PageLayout>
      {menu.isFetching && <LoadingScreen />}
    </>
  )
}