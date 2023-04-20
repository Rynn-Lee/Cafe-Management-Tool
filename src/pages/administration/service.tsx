import { PageLayout } from '@/layouts/PageLayout'
import { useDispatch, useSelector } from 'react-redux';
import { removeEmployees } from '@/reducers/employeesSlice';
import { services } from '@/services'
import { useEffect, useState } from 'react'
import fs from 'fs/promises'
import path from 'path'
import { GetServerSideProps } from 'next';
import { setMenu } from '@/reducers/menuSlice';

interface Props {
  dirs: string[]
}

export default function Service({dirs}: Props) {
  const [images, setImages] = useState<any>()
  const menu = useSelector((state: any) => state.menu.list)
  const [firstCheck, setFirstCheck] = useState(0)
  const dispatch = useDispatch()

  const updateStorage = async() => dispatch(setMenu(await services.menu.findMenu()))
  
  useEffect(()=>{
    !menu.length && !firstCheck && updateStorage()
    setFirstCheck(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[menu])

  const deleteAllUsers = async() => await services.account.deleteUsers()
  const deleteMenu = async() => await services.menu.deleteAll()

  const deleteLeftovers = async () => {
    const used = menu.map((item: any) => item.filename)
    const result = images.filter((x: any) => !used.includes(x))
    console.log(await services.images.delete(result))
  }

  useEffect(()=>{
    setImages(dirs)
  },[dirs])

  return (
    <>
      <PageLayout title={"Сервисное меню - Управление кафе"} pageNav={"administration"}>
      <div className='horizontal'>
        <fieldset>
          <legend>Other deletions</legend>
          <button className='button padding-10' onClick={deleteAllUsers}>Delete users</button><br/>
          <button className='button padding-10' onClick={deleteMenu}>Delete menu</button><br/>
          <button className='button padding-10' onClick={()=>dispatch(removeEmployees())}>Clear Redux Store</button>
        </fieldset>
        <fieldset>
          <legend>images</legend>
          <button className='button padding-10' onClick={deleteLeftovers}>Delete unused images</button><br/>
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