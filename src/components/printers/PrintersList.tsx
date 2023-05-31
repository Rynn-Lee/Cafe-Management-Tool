import { useEffect, useState } from 'react'
import useDialog from '@/hooks/useDialog'
import { ActionButtons } from './parts/ActionButtons'
import { Categories } from './parts/Categories'
import { MainInfo } from './parts/MainInfo'

export function PrintersList({printers, page, setPage, removePrinter, removeCategory, addCategory, vacantCategories, editPrinterInfo, setIsSetup}: any){
  const [printer, setPrinter] = useState<any>({ip: "",name: ""})
  const [edited, setEdited] = useState<any>(false)
  const [printerCopy, setPrinterCopy] = useState<any>({})
  const [newCategory, setNewCategory] = useState("")
  const { DialogWindow, ask } = useDialog()

  const nextPage = () => page + 1 < printers.data?.length ? setPage(page+1) : setPage(0)
  const prevPage = () => page - 1 >= 0 ? setPage(page-1) : setPage(printers.data?.length-1)

  useEffect(()=>{
    const result: any[] = printers.data?.filter((item: any, index: number) => index == page)
    if(result){
      setPrinter(result[0]);
      setPrinterCopy(result[0])
    }
    page+1 > printers?.data?.length && prevPage()
    page+1 == 0 && nextPage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, printers])

  useEffect(()=>{
    JSON.stringify(printer) !== JSON.stringify(printerCopy) ? setEdited(true) : setEdited(false)
  }, [printer, printerCopy])

  const resetEdit = () => setPrinter(printerCopy)

  return(
    <>
    <div>
      <button className='addNewPrinter' onClick={()=>setIsSetup(1)}>Добавить новый принтер</button>
      <fieldset className='printer-info-window'>
        <ActionButtons 
          prevPage={prevPage}
          nextPage={nextPage}
          page={page}
          ask={ask}
          removePrinter={removePrinter}
          printers={printers}
          printer={printer}
          edited={edited}
          resetEdit={resetEdit}
          editPrinterInfo={editPrinterInfo}/>

        <MainInfo
          setPrinter={setPrinter}
          printer={printer}/>

        <Categories
          setNewCategory={setNewCategory}
          newCategory={newCategory}
          vacantCategories={vacantCategories}
          ask={ask}
          printer={printer}
          removeCategory={removeCategory}
          addCategory={addCategory}/>

      </fieldset>
      <DialogWindow />
    </div>
    </>
    )
}