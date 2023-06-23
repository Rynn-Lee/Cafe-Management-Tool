import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import fs from 'fs/promises'
import path from 'path'
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import useDialog from '@/hooks/useDialog'

interface Props {
  dirs: string[]
}

export default function Service({dirs}: Props) {
  const {DialogWindow, ask} = useDialog()
  const [images, setImages] = useState<any>()

  const menu = useQuery({
    queryKey: ["menu"],
    queryFn: () => services.menu.findMenu(),
    enabled: false
  })
  
  
  useEffect(()=>{
    !menu.isFetched && menu.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[menu])

  const deleteAllUsers = async() => await services.account.deleteUsers()
  const deleteMenu = async() => await services.menu.deleteAll()
  const deletePrinters = async() => await services.printers.delete()

  const deleteLeftovers = async () => {
    const used = menu.data.map((item: any) => item.filename)
    const result = images.filter((x: any) => !used.includes(x))
    const cleanup = await services.images.delete(result)
    if(cleanup.error) ask(cleanup.error, false, false, "error")
    else ask(cleanup.info, false, false, "info")
  }

  useEffect(()=>{
    setImages(dirs)
  },[dirs])

  return (
    <>
      <PageLayout title={"Очистка - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/service"} nav2>
          <div className='horizontal form'>
            <fieldset>
              <legend>Очистка</legend>
              <button onClick={deleteAllUsers}>Удалить всех пользователей</button><br/>
              <button onClick={deleteMenu}>Удалить всё меню</button><br/>
              <button onClick={deletePrinters}>Удалить все принтеры</button><br/>
            </fieldset>
            <fieldset>
              <legend>Изображения</legend>
              <button onClick={deleteLeftovers}>Удалить неиспользуемые изображения</button><br/>
            </fieldset>
          </div>
          <fieldset>
            <legend>Файлы изображений</legend>
            <ul>
              {images?.map((item: string)=>(
                <li key={item}>{item}</li>
              ))}
            </ul>
          </fieldset>
          <DialogWindow />
        </PageLayout>
      </PageLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = {dirs:[]}
  try{
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"))
    props.dirs = dirs as any
    return {props}
  } catch (err) {
    return {props}
  }
}