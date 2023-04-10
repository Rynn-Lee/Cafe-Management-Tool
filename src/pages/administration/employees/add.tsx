import { PageLayout } from '@/layouts/PageLayout'

export default function Add() {

  return (
    <>
      <PageLayout title={"Меню - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          Добавить
        </PageLayout>
      </PageLayout>
    </>
  )
}