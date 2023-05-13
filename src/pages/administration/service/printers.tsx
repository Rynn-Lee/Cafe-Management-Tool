import LoadingScreen from '@/components/LoadingScreen'
import { AddNewPrinter } from '@/components/printers/AddNewPrinter'
import { PrintersList } from '@/components/printers/PrintersList'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function Administration() {
  const [vacantCategories, setVacantCategories] = useState([])
  const [page, setPage] = useState(0)

  const [newPrinter, setNewPrinter] = useState<any>({
    name: "",
    ip: "192.1.1.0"
  })

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
    if(!printers.data || !categories.data){return}
    const usedCategories = printers.data?.map((item: any) => item.category).flat()
    const freeCategories = categories.data?.filter((item: any) => !usedCategories.includes(item.title))
    setVacantCategories(freeCategories)
  },[printers.data, categories.data])

  useEffect(()=>{
    !printers.isFetched && printers.refetch()
    !categories.isFetched && categories.refetch()
  }, [categories, printers])

  const addPrinter = async(e: any) => {
    e.preventDefault()
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    let printerCategories: String[] = []
    checkboxes.forEach((item: any)=> printerCategories.push(item.value))
    const result = await services.printers.add(newPrinter, printerCategories)
    result && printers.refetch()
  }

  return (
    <>
      <PageLayout title={"Главная - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/service"} nav2 flex>

          <AddNewPrinter
            addPrinter={addPrinter}
            newPrinter={newPrinter}
            setNewPrinter={setNewPrinter}
            categories={vacantCategories}/>
          <PrintersList 
            printers={printers}
            setPage={setPage}/>

        </PageLayout>
      </PageLayout>
      {printers.isFetching ? <LoadingScreen /> : ""}
    </>
  )
}