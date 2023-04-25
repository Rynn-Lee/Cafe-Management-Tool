import Modal from '@/components/modal/Dialog'
import { PageLayout } from '@/layouts/PageLayout'
export default function Menu() {
  return (
    <>
      <PageLayout title={"Меню > Категории - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/menu"} nav2>
          Миьоиь
        </PageLayout>
      </PageLayout>
    </>
  )
}