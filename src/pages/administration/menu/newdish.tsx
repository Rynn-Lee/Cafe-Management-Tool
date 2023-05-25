import LoadingScreen from '@/components/LoadingScreen'
import AddPhoto from '@/components/menu/AddPhoto'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import plusIco from '@icons/plus.svg'
import Image from 'next/image'
import useDialog from '@/hooks/useDialog'
import MainInfo from '@/components/menu/MainInfo'
import Ingredients from '@/components/menu/Ingredients'

export default function Add() {
  const [info, setInfo] = useState<any>({available: false, cost: 0, name: "", ingredients: "", weight: {number: 0, value: "грамм"}})
  const [selectedImage, setSelectedImage] = useState("")
  const [defaultValue, setDefaultValue] = useState("")
  const [fileName, setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File>()
  const { DialogWindow, ask } = useDialog()

  const menu = useQuery({
    queryKey: ["menu"],
    queryFn: () => services.menu.findMenu(),
    enabled: false
  })
  
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: () => services.category.list(),
    enabled: false
  })

  useEffect(()=>{
    !categories.isFetched && categories.refetch()
  }, [categories])

  const handleUpload = async() => {
    if(!selectedFile) return;
    const data = {
      name: info.name,
      cost: info.cost,
      category: info.category,
      ingredients: info.ingredients,
      available: info.available,
      fileName,
      weight: info.weight
    }
    await services.menu.add(data)
    await services.images.add(selectedFile)
    menu.refetch()
    setInfo({...info, name: "", ingredients: "", cost: 0, weight: {number: 0, value: "шт."}})
    setSelectedImage("")
    setDefaultValue("none")
  }

  useEffect(()=>{
    console.log(info)
  }, [info])

  return (
    <>
      <PageLayout title={"Меню > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <form onSubmit={(e)=>{e.preventDefault(); ask(`Добавить блюдо: ${info.name}`, handleUpload)}} className='bg-2 form photo-form'>
            <div className='horizontal'>
              <AddPhoto
                handleUpload={handleUpload}
                setSelectedImage={setSelectedImage}
                setSelectedFile={setSelectedFile}
                selectedImage={selectedImage}
                setFileName={setFileName}/>
              <MainInfo 
                info={info}
                setInfo={setInfo}
                categories={categories}
                defaultValue={defaultValue}
                setDefaultValue={setDefaultValue}/>
            </div>
            <Ingredients 
              setInfo={setInfo}
              info={info}/>
            <button><Image src={plusIco} alt="Image" className="ico"/>Добавить товар</button>
          </form>
          <DialogWindow />
        </PageLayout>
      </PageLayout>
      {menu.isFetching && <LoadingScreen />}
    </>
  )
}