import { PageLayout } from '@/layouts/PageLayout'

export default function Menu() {

  return (
    <>
      <PageLayout title={"Меню - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          Меню
        </PageLayout>
      </PageLayout>
    </>
  )
}