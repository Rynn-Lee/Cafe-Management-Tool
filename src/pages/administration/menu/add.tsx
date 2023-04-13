import { PageLayout } from '@/layouts/PageLayout'

export default function Add() {

  return (
    <>
      <PageLayout title={"Меню > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          <div className='horizontal'>
            <div className='padding-5 margin-10 b-radius-10 square-35 width-150 center'>
              <span className='padding-5'>Image</span>
              <button className='padding-5 b-radius-10 button width-125 margin-10'>Добавить фото</button>
            </div>
            <div className='padding-5 margin-10 b-radius-10 center'>
              <div className='horizontal margin-2'><input className='left-input width-150' value='Название блюда' disabled/><input className='right-input width-300'/></div>
              <div className='horizontal margin-2'><input className='left-input width-150' value='Название' disabled/><input className='right-input width-300'/></div>
            </div>
          </div>
        </PageLayout>
      </PageLayout>
    </>
  )
}