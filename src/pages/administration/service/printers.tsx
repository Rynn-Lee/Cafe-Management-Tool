import LoadingScreen from '@/components/LoadingScreen'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function Administration() {

  const printers = useQuery({
    queryKey: ["printers"],
    queryFn: () => services.printers.find(),
    onSuccess: (data) => console.log("printers",data),
    enabled: false
  })

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => services.category.list(),
    onSuccess: (data) => console.log("categories", data),
    enabled: false
  })

  useEffect(()=>{
    !printers.isFetched && printers.refetch()
    !categories.isFetched && categories.refetch()
  }, [categories, printers])

  return (
    <>
      <PageLayout title={"Главная - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/service"} nav2>
          <form className='form w-max printers-form' onSubmit={(e)=>e.preventDefault()}>
            <fieldset>
              <legend>Добавить новый принтер</legend>
              <div className='fields'><span>Название</span><input /></div>
              <div className='fields'><span>Категории<br />(не занятые)</span>
                <ul>
                  {categories.data.map((item: any) => (
                    <li key={item._id}><input type='checkbox' value={item.title} className='categories-checkboxes'/> - {item.title}</li>
                  ))}
                </ul>
              </div>
              <div className='fields'><span>ip</span><input value={"192.1.1.0"}/></div>
              <button type='submit'>Добавить</button>
            </fieldset>
          </form>
        </PageLayout>
      </PageLayout>
      {printers.isFetching ? <LoadingScreen /> : ""}
    </>
  )
}