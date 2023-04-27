import LoadingScreen from '@/components/LoadingScreen'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import removeIco from '@icons/removeFile.svg'
import { useEffect, useState } from 'react'
import useDialog from '@/hooks/useDialog'

export default function Menu() {
  const [newCategory, setNewCategory] = useState("")
  const { DialogWindow, ask } = useDialog()

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => services.category.list(),
    onSuccess: (data) => console.log(data),
    enabled: false
  })
  const mutation = useMutation({
    mutationFn: () => services.category.add(newCategory),
    // onSuccess: () => categories.refetch()
  })
  
  
  useEffect(()=>{
    !categories.isFetched && categories.refetch()
  }, [categories])
  
  return (
    <>
      <PageLayout title={"Меню > Категории - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <form onSubmit={(e)=>{e.preventDefault(); mutation.mutate()}} className='!w-max items-center form'>
              <div className='fields'><span>Название</span><input onChange={(e)=>setNewCategory(e.target.value)} className='w-full'/></div>
              <button>Добавить категорию</button>
            <fieldset>
              <legend>Доступные категории</legend>
              <ul className='p-2 pl-7'>
                {categories?.data?.map((category: any, index: number)=>(
                  <><li key={index}>{category.title}<Image src={removeIco} className="ico2" alt='remove'/></li></>
                )).reverse()}
              </ul>
            </fieldset>
            <span onClick={()=>ask("Обновить?", ()=>categories.refetch())}>hehe?</span>
          </form>
          <DialogWindow />
        </PageLayout>
      </PageLayout>
      {mutation.isLoading && categories.isFetching && <LoadingScreen />}
    </>
  )
}