import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import fs from 'fs/promises'
import path from 'path'
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

interface Props {
  dirs: string[]
}

export default function Service({dirs}: Props) {
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

  const deleteLeftovers = async () => {
    const used = menu.data.map((item: any) => item.filename)
    const result = images.filter((x: any) => !used.includes(x))
    console.log(await services.images.delete(result))
  }

  useEffect(()=>{
    setImages(dirs)
  },[dirs])

  return (
    <>
      <PageLayout title={"Сервисное меню - Управление кафе"} pageNav={"administration"}>
      <div className='horizontal form'>
        <fieldset>
          <legend>Other deletions</legend>
          <button onClick={deleteAllUsers}>Delete users</button><br/>
          <button onClick={deleteMenu}>Delete menu</button><br/>
        </fieldset>
        <fieldset>
          <legend>images</legend>
          <button onClick={deleteLeftovers}>Delete unused images</button><br/>
        </fieldset>
      </div>
      <ul>
        {images?.map((item: string)=>(
          <li key={item}>{item}</li>
        ))}
      </ul>
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