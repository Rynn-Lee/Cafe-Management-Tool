import { PageLayout } from '@/layouts/PageLayout'
import { setEmployees } from '@/reducers/employeesSlice'
import { services } from '@/services'
import { useDispatch } from 'react-redux'

export default function Add() {
  const dispatch = useDispatch()

  const addUser = async() => {
    services.account.addUser()
    dispatch(setEmployees(await services.account.getUsers()))
  }

  return (
    <>
      <PageLayout title={"Сотрудники > Добавить - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          <button onClick={()=>addUser()}>Add user</button>
        </PageLayout>
      </PageLayout>
    </>
  )
}