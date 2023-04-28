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
  const addMutatuion = useMutation({
    mutationFn: () => services.category.add(newCategory),
    onSuccess: () => {categories.refetch(); setNewCategory("")}
  })
  const removeMutation = useMutation({
    mutationFn: (id: string) => services.category.remove(id),
    onSuccess: () => categories.refetch()
  })
  
  
  useEffect(()=>{
    !categories.isFetched && categories.refetch()
  }, [categories])
  
  return (
    <>
      <PageLayout title={"Меню > Категории - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <form onSubmit={(e)=>{e.preventDefault()}} className='!w-max items-center form'>
              <div className='fields'><span>Название</span><input value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} className='w-full'/></div>
              <button onClick={() => ask(`Добавить категорию: ${newCategory}`, ()=>addMutatuion.mutate())}>Добавить категорию</button>
            <fieldset>
              <legend>Доступные категории</legend>
              <ul className='p-2 pl-7'>
                {categories?.data?.map((category: any, index: number)=>(
                  <span key={index}>
                    <li>
                      <Image src={removeIco} className="ico2" alt='remove' onClick={() => ask(`Удалить категорию: ${category.title}`, ()=>removeMutation.mutate(category._id))}/>{category.title}
                    </li>
                  </span>
                )).reverse()}
              </ul>
            </fieldset>
          </form>
          <DialogWindow />
        </PageLayout>
      </PageLayout>
      {removeMutation.isLoading && addMutatuion.isLoading && categories.isFetching && <LoadingScreen />}
    </>
  )
}