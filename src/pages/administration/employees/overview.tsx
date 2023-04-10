import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees } from '@/reducers/employeesSlice';
import EmployeesTable from '@/components/administration/EmployeesTable';

export default function Employees() {
  const employees = useSelector((state: any) => state.employees.list)
  const [users, setUsers] = useState<any>(employees)
  const [query, setQuery] = useState<any>("")
  const dispatch = useDispatch()

  const setList = async() => {
    dispatch(setEmployees(await services.account.getUsers()))
    setUsers(employees)
  }

  useEffect(()=>{
    if(!employees.length || employees.lenght !== users.length) {setList()}
  })

  const deleteUser = (id: string) =>{
    services.account.deleteUser(id)
    const filtered = users.filter((user: any) => user._id != id)
    dispatch(setEmployees(filtered))
    setUsers(filtered)
  }

  return (
    <>
      <PageLayout title={"Сотрудники  > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          <div className='fancy-input'>
            <input value='Поиск' disabled className='left-input'/><input placeholder='Введите имя' onChange={(e) => setQuery(e.target.value)} className='right-input'/>
          </div>
          <EmployeesTable employees={users} query={query} deleteUser={deleteUser}/>
        </PageLayout>
      </PageLayout>
    </>
  )
}