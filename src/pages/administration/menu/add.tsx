import { PageLayout } from '@/layouts/PageLayout'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

export default function Add() {
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File>()
  

  const handleUpload = async() => {
    setUploading(true)
    try{
      if(!selectedFile) return;
      const formData = new FormData()
      formData.append("newDish", selectedFile)
      const { data } = await axios.post("/api/images/upload", formData)
      console.log(data)
    }
    catch(err: any){
      console.log(err.response?.data)
    }
    setUploading(false)
  }

  return (
    <>
      <PageLayout title={"Меню > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <div className='horizontal padding-5'>


            <fieldset className='padding-5 margin-10 b-radius-10 width-150 center'>
            <legend>Фото</legend> 
              <label>
                <input type='file' hidden onChange={({ target }) => {
                  if(target.files){
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file))
                    setSelectedFile(file)
                  }
                }}/>
                <div className='padding-5 b-radius-10 button width-125 margin-10'>
                  {selectedImage ? (
                    <Image src={selectedImage} alt="" height="100" width="100"/>
                  ):(
                    <span>Выберите фото</span>
                  )}
                </div>
              </label>
              <button onClick={handleUpload} disabled={uploading} style={{opacity: uploading ? ".5" : "1"}} className='button padding-10'>{uploading ? "Uploading.." : "Upload"}</button>
            </fieldset>



            <fieldset className='padding-5 margin-10 b-radius-10 center'>
            <legend>Название и категория</legend> 
              <div className='horizontal margin-2'><input className='left-input width-150' value='Название блюда' disabled/><input className='right-input width-300'/></div>
              <div className='horizontal margin-2'><input className='left-input width-150' value='Категория' disabled/>
                <select className='right-input width-300'>
                  <option>Первое</option>
                  <option>Второе</option>
                  <option>Пицца</option>
                  <option>Салаты</option>
                  <option>Напитки</option>
                </select>
              </div>
            </fieldset>
          </div>
        </PageLayout>
      </PageLayout>
    </>
  )
}