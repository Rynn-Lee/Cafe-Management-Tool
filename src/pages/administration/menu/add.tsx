import LoadingScreen from '@/components/LoadingScreen'
import AddPhoto from '@/components/menu/AddPhoto'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import axios from 'axios'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query';

export default function Add() {
  const [info, setInfo] = useState<any>({available: false, category: "Вторые блюда"})
  const [selectedImage, setSelectedImage] = useState("")
  const [fileName, setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File>()

  const menu = useQuery({
    queryKey: ["menu"],
    queryFn: () => services.menu.findMenu(),
    onSuccess: (data) => console.log(data),
    enabled: false
  })

  const handleUpload = async(e: any) => {
    e.preventDefault()
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
  }

  return (
    <>
      <PageLayout title={"Меню > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <form onSubmit={handleUpload} className='bg-2 form photo-form'>
            <div className='horizontal'>
            <AddPhoto
              handleUpload={handleUpload}
              setSelectedImage={setSelectedImage}
              setSelectedFile={setSelectedFile}
              selectedImage={selectedImage}
              setFileName={setFileName}
            />
            <fieldset>
            <legend>Основная информация</legend>
              <div className='fields'><span>Название</span><input className='right-input' onChange={(e) => setInfo({...info, name: e.target.value})}/></div>
              <div className='fields'><span>Цена</span><input type='number' className='right-input' onChange={(e) => setInfo({...info, cost: e.target.value})}/></div>
              <div className='fields'><span>Категория</span>
                <select className='right-input' onChange={(e) => setInfo({...info, category: e.target.value})}>
                  <option>Вторые блюда</option>
                  <option>Десерты</option>
                  <option>Завтраки</option>
                  <option>Закуски</option>
                  <option>Напитки</option>
                  <option>Выпечка</option>
                  <option>Компоты</option>
                  <option>Пицца</option>
                  <option>Сладкая выпечка</option>
                  <option>Салаты</option>
                  <option>Соусы</option>
                  <option>Супы</option>
                  <option>Хеллоуин</option>
                </select>
              </div>
              <div className='fields'><span>Доступно после добавления? <input type='checkbox' onChange={(e) => setInfo({...info, available: e.target.checked})}/></span></div>
            </fieldset></div>
            <fieldset>
              <legend>Краткое описание</legend>
              <textarea onChange={(e) => setInfo({...info, description: e.target.value})}></textarea>
            </fieldset>
            <button>Добавить товар</button>
          </form>
        </PageLayout>
      </PageLayout>
      {menu.isFetching && <LoadingScreen />}
    </>
  )
}