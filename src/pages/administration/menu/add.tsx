import LoadingScreen from '@/components/LoadingScreen'
import AddPhoto from '@/components/menu/AddPhoto'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import axios from 'axios'
import { useRef, useState } from 'react'

export default function Add() {
  const [loading, setLoading] = useState(0)
  const [selectedImage, setSelectedImage] = useState("")
  const [fileName, setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File>()
  const dishInfo = useRef<any>()

  const handleUpload = async(e: any) => {
    e.preventDefault()
    setLoading(1)
    //* SENDING PHOTO TO IMAGES FOLDER
    try{
      if(!selectedFile) return;
      const formData = new FormData()
      formData.append("image", selectedFile)
      const { data } = await axios.post("/api/images/upload", formData)
      console.log(data)
    }
    catch(err: any){
      console.log(err.response?.data)
    }

    //* SENDING DATA TO MONGO
    try{
      const info = {
        name: dishInfo.current['name'].value,
        cost: dishInfo.current['cost'].value,
        category: dishInfo.current['category'].value,
        description: dishInfo.current['description'].value,
        fileName
      }
      console.log(fileName)
      const response = await services.menu.add(info)
    }
    catch(err){
      console.warn(err)
    }

    setLoading(0)
  }

  return (
    <>
      <PageLayout title={"Меню > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          {loading ? <LoadingScreen/> : ""}
          <form ref={dishInfo} onSubmit={handleUpload}>
          <div className='horizontal padding-5'>
            <AddPhoto
              handleUpload={handleUpload}
              setSelectedImage={setSelectedImage}
              setSelectedFile={setSelectedFile}
              selectedImage={selectedImage}
              setFileName={setFileName}
            />
            <fieldset className='padding-5 margin-10 b-radius-10 center fill padding-m'>
            <legend>Основная информация</legend>
              <div className='horizontal margin-2'><input className='left-input width-125' value='Название' disabled/><input className='right-input width-max' name='name'/></div>
              <div className='horizontal margin-2'><input className='left-input width-125' value='Цена (тг)' disabled/><input className='right-input width-max' name='cost'/></div>
              <div className='horizontal margin-2'><input className='left-input width-125' value='Категория' disabled/>
                <select className='right-input width-max' name='category'>
                  <option>Вторые блюда</option>
                  <option>Десерты</option>
                  <option>Завтраки</option>
                  <option>Закуски</option>
                  <option>Напитки</option>
                  <option>Выпечка</option>
                  <option>Сладкая выпечка</option>
                  <option>Салаты</option>
                  <option>Соусы</option>
                  <option>Супы</option>
                  <option>Хеллоуин</option>
                </select>
              </div>
            </fieldset>
          </div>
            <fieldset className='padding-5 margin-10 b-radius-10 fill height-300'>
              <legend>Краткое описание</legend>
              <textarea className='width-max fill' name='description'></textarea>
            </fieldset>
            <button className='button padding-20 margin-10'>Добавить товар</button>
          </form>
        </PageLayout>
      </PageLayout>
    </>
  )
}