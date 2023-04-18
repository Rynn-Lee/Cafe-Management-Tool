import MenuList from '@/components/menu/MenuList'
import { PageLayout } from '@/layouts/PageLayout'
import { setMenu } from '@/reducers/menuSlice'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Menu() {
  const menu = useSelector((state: any) => state.menu.list)
  const [firstCheck, setFirstCheck] = useState(0)
  const dispatch = useDispatch()

  const updateStorage = async() => dispatch(setMenu(await services.menu.findMenu()))
  

  useEffect(()=>{
    !menu.length && !firstCheck && updateStorage()
    setFirstCheck(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[menu])


  return (
    <>
      <PageLayout title={"Меню > Добавить - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <MenuList menu={menu}/>
        </PageLayout>
      </PageLayout>
    </>
  )
}