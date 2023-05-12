import LoadingScreen from '@/components/LoadingScreen'
import { AddNewPrinter } from '@/components/printers/AddNewPrinter'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import billIco from '@icons/bill.svg'
import Image from 'next/image'

export default function Administration() {
  const [vacantCategories, setVacantCategories] = useState([])
  const [newPrinter, setNewPrinter] = useState<any>({
    name: "",
    categories: [],
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
    !printers.isFetched && printers.refetch()
    !categories.isFetched && categories.refetch()
  }, [categories, printers])

  const addPrinter = (e: any) => {
    e.preventDefault()

    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    let cats: String[] = []
    checkboxes.forEach((item: any)=>{
      cats.push(item.value)
    })
    console.log(cats)
  }

  return (
    <>
      <PageLayout title={"Главная - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/service"} nav2 flex>
          <AddNewPrinter
            addPrinter={addPrinter}
            newPrinter={newPrinter}
            setNewPrinter={setNewPrinter}
            categories={categories}/>
            <div className='horizontal'>
            {
              printers.data?.map((printer: any)=>(
                <fieldset key={printer._id} className='form'>
                  <legend><Image src={billIco} alt="bill" className='ico'/>{printer.name}</legend>
                  {printer.category.map((el: any)=>(
                    <span key={el}>{el}<br/></span>
                  ))}
                </fieldset>
              ))
            }
            </div>
            {/* <table>
              <tr>
                {printers.data?.map((printer: any) => (
                  <th key={printer._id}>{printer.name}</th>
                ))}
              </tr>

              {printers.data?.map((printer: any)=>(

                <tr key={printer._id}>
                  {
                  printer.category.map((category: any) => (
                    <td key={category}>{category}</td>
                  )).reverse()
                  }
                </tr>

              ))}
            </table> */}
        </PageLayout>
      </PageLayout>
      {printers.isFetching ? <LoadingScreen /> : ""}
    </>
  )
}