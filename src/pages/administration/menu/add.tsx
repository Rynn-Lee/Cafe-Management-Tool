import { PageLayout } from '@/layouts/PageLayout'

export default function Add() {

  return (
    <>
      <PageLayout title={"Меню > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <div className='horizontal padding-5'>
            <fieldset className='padding-5 margin-10 b-radius-10 width-150 center'>
            <legend>Фото</legend> 
              <span className='padding-5'>Image</span>
              <button className='padding-5 b-radius-10 button width-125 margin-10'>Добавить фото</button>
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