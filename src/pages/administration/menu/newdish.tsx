import LoadingScreen from '@/components/LoadingScreen'
import AddPhoto from '@/components/menu/AddPhoto'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import lightbulbIco from '@icons/lightbulb.svg'
import messageIco from '@icons/message.svg'
import plusIco from '@icons/plus.svg'
import Image from 'next/image'
import axios from 'axios'
import useDialog from '@/hooks/useDialog'

export default function Add() {
  const [info, setInfo] = useState<any>({available: false, cost: 0, name: "", description: ""})
  const [selectedImage, setSelectedImage] = useState("")
  const [fileName, setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File>()
  const { DialogWindow, ask } = useDialog()

  const menu = useQuery({
    queryKey: ["menu"],
    queryFn: () => services.menu.findMenu(),
    onSuccess: (data) => console.log(data),
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
    console.log(info)
    const data = {
      name: info.name,
      cost: info.cost,
      category: info.category,
      description: info.description,
      available: info.available,
      fileName
    }
    await services.menu.add(data)
    const formData = new FormData()
    formData.append("image", selectedFile)
    await axios.post("/api/images/upload", formData)
    menu.refetch()
    setInfo({...info, name: "", description: "", cost: 0})
    setSelectedImage("")
  }

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
                setFileName={setFileName}
              />
              <fieldset className='px-6 py-2'>
              <legend><Image src={lightbulbIco} alt="Image" className="ico"/>Основная информация</legend>
                <div className='fields'><span>Название</span><input value={info.name} className='right-input' onChange={(e) => setInfo({...info, name: e.target.value})} required/></div>
                <div className='fields'><span>Цена</span><input value={info.cost} type='number' className='right-input' onChange={(e) => setInfo({...info, cost: e.target.value})} required/></div>
                <div className='fields'><span>Категория</span>
                  <select className='right-input' onChange={(e) => setInfo({...info, category: e.target.value})} required>
                    {categories?.data?.map((category: any) => (
                      <option key={category?.title}>{category?.title}</option>
                    )).reverse()}
                  </select>
                </div>
                <div className='fields'><span>Доступно после добавления? | <input type='checkbox' onChange={(e) => setInfo({...info, available: e.target.checked})}/></span></div>
              </fieldset>
            </div>
            <fieldset>
              <legend><Image src={messageIco} alt="Image" className="ico"/>Краткое описание</legend>
              <textarea value={info.description} onChange={(e) => setInfo({...info, description: e.target.value})} required/>
            </fieldset>
            <button><Image src={plusIco} alt="Image" className="ico"/>Добавить товар</button>
          </form>
          <DialogWindow />
        </PageLayout>
      </PageLayout>
      {menu.isFetching && <LoadingScreen />}
    </>
  )
}