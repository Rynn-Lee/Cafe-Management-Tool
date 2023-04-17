import { PageLayout } from '@/layouts/PageLayout'
import fs from 'fs/promises'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import path from 'path'

interface Props{
  dirs: string[]
}

export default function Menu({dirs}: Props) {

  

  return (
    <>
      <PageLayout title={"Меню > Добавить - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <table>
            {dirs.map((item)=>(
              <>
                <Image key={item} src={`/images/${item}`} alt="Image" width={200} height={200} className='img-fill b-radius-10'/>
              </>
            ))}
          </table>
        </PageLayout>
      </PageLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const props = {dirs: []}
  try{
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/images"))
    props.dirs = dirs as any
    return {props}
  } catch (err) {
    return {props}
  }
}