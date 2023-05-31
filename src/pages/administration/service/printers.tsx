import LoadingScreen from '@/components/LoadingScreen'
import UniStepper from '@/components/UniStepper'
import { AddNewPrinter } from '@/components/printers/AddNewPrinter'
import { PrintersList } from '@/components/printers/PrintersList'
import PrinterCategories from '@/components/printers/stepsToAdd/PrinterCategories'
import PrinterFinale from '@/components/printers/stepsToAdd/PrinterFinale'
import PrinterName from '@/components/printers/stepsToAdd/PrinterName'
import PrinterSysInfo from '@/components/printers/stepsToAdd/PrinterSysInfo'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function Administration() {
  const [vacantCategories, setVacantCategories] = useState([])
  const [page, setPage] = useState(0)
  const [setupStep, setSetupStep] = useState(0)
  const [isSetup, setIsSetup] = useState(0)
  const [newPrinter, setNewPrinter] = useState<any>({
    name: "",
    ip: "192.168.0.1",
    method: "EPSON",
    info:{
      alive: true
    }
  })

  const printers = useQuery({
    queryKey: ["printers"],
    queryFn: () => services.printers.find(),
    enabled: false
  })

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => services.category.list(),
    enabled: false
  })

  useEffect(()=>{
    console.log(newPrinter)
  }, [newPrinter])

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

  const removePrinter = async(id: string) => {await services.printers.delete(id); await printers.refetch()}

  const addPrinter = async() => {
    const result = await services.printers.add(newPrinter)
    setNewPrinter({...newPrinter, name: "", ip: "192.168.0.1", method: "EPSON", info:{message: "", alive: true}})
    result && await printers.refetch()
    setPage(printers?.data?.length)
    setSetupStep(0)
    setIsSetup(0)
  }

  const checkCategories = () => {
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    let printerCategories: String[] = []
    checkboxes.forEach((item: any)=> printerCategories.push(item.value))
    let converted = Array.from(printerCategories)

    setNewPrinter({...newPrinter, category: converted})
  }

  const editPrinterInfo = async(printerToEdit: any, data: any) => {
    await services.printers.patch(printerToEdit._id, data)
    printers.refetch()
  }

  const removeCategory = async(printerToEdit: any, categoryToRemove: any, ) => {
    const result = printerToEdit.category.filter((item: any)=> item != categoryToRemove)
    await services.printers.patch(printerToEdit._id, {category: result})
    printers.refetch()
  }

  const addCategory = async(printerToEdit: any, categoryToAdd: any) => {
    const result = [printerToEdit.category, [categoryToAdd]].flat()
    await services.printers.patch(printerToEdit._id, {category: result})
    printers.refetch()
  }

  return (
    <>
      <PageLayout title={"Принтеры - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/service"} nav2 flex>
        
        
          {isSetup ? 
          <UniStepper setSetupStep={setSetupStep} setupStep={setupStep} setIsSetup={setIsSetup}>
            <PrinterName
            newPrinter={newPrinter}
            setNewPrinter={setNewPrinter}
            setSetupStep={setSetupStep}
            setupStep={setupStep}/>

            <PrinterSysInfo
            newPrinter={newPrinter}
            setNewPrinter={setNewPrinter}
            setSetupStep={setSetupStep}
            setupStep={setupStep}/>

            <PrinterCategories
            newPrinter={newPrinter}
            setNewPrinter={setNewPrinter}
            setSetupStep={setSetupStep}
            setupStep={setupStep}
            vacantCategories={vacantCategories}
            categories={vacantCategories}
            checkCategories={checkCategories}/>

            <PrinterFinale
            newPrinter={newPrinter}
            addPrinter={addPrinter}/>
          </UniStepper>
          : ""}

          {/* <AddNewPrinter
            addPrinter={addPrinter}
            newPrinter={newPrinter}
            setNewPrinter={setNewPrinter}
            vacantCategories={vacantCategories}
            categories={vacantCategories}
            setIsSetup={setIsSetup}/> */}
          <div>
          {!isSetup ? <button className='addNewPrinter' onClick={()=>setIsSetup(1)}>Добавить новый принтер</button> : ""}
          {printers.data?.length && !isSetup ?
          <PrintersList 
            printers={printers}
            page={page}
            setPage={setPage}
            removePrinter={removePrinter}
            removeCategory={removeCategory}
            addCategory={addCategory}
            vacantCategories={vacantCategories}
            editPrinterInfo={editPrinterInfo}
            setIsSetup={setIsSetup}
            />
            :""}
          </div>
        </PageLayout>
      </PageLayout>
      {printers.isFetching ? <LoadingScreen /> : ""}
    </>
  )
}