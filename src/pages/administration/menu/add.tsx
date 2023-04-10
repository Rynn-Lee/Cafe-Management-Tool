import { PageLayout } from '@/layouts/PageLayout'

export default function Add() {

  return (
    <>
      <PageLayout title={"Меню > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          Добавить
        </PageLayout>
      </PageLayout>
    </>
  )
}