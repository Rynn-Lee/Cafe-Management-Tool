import LoadingScreen from '@/components/LoadingScreen'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function Menu() {
  const [newCategory, setNewCategory] = useState("")

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => services.category.list(),
    onSuccess: (data) => console.log(data),
    enabled: false
  })

  const mutation = useMutation({
    mutationFn: () => services.category.add(newCategory),
    onSuccess: () => categories.refetch()
  })


  useEffect(()=>{
    !categories.isFetched && categories.refetch()
  }, [categories])

  return (
    <>
      <PageLayout title={"Меню > Категории - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <form onSubmit={(e)=>{e.preventDefault(); mutation.mutate()}}>
            <fieldset>
              <legend>Добавить новую категорию</legend>
              <input onChange={(e)=>setNewCategory(e.target.value)}/>
              <button>Добавить категорию</button>
            </fieldset>
          </form>
          {newCategory}
          <ul>
            {categories?.data?.map((category: any, index: number)=>(
              <li key={index}>{category.title}</li>
            )).reverse()}
          </ul>
        </PageLayout>
      </PageLayout>
      {mutation.isLoading && categories.isFetching && <LoadingScreen />}
    </>
  )
}