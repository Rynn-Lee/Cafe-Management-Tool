import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees } from '@/reducers/employeesSlice';
import EmployeesTable from '@/components/administration/EmployeesTable';

export default function Employees() {
  const employees = useSelector((state: any) => state.employees.list)
  const [firstCheck, setFirstCheck] = useState(0)
  const [query, setQuery] = useState<any>("")
  const dispatch = useDispatch()
  
  const updateStorage = async() => dispatch(setEmployees(await services.account.findUsers()))
  useEffect(()=>{
    !employees.length && !firstCheck && updateStorage()
    setFirstCheck(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[employees])

  const deleteUser = (id: string) =>{
    services.account.deleteUsers(id)
    const filtered = employees.filter((user: any) => user._id != id)
    dispatch(setEmployees(filtered))
  }

  const editUser = (id: string) => {
    alert(`Coming soon! ID: ${id}`)
  }

  return (
    <>
      <PageLayout title={"Сотрудники  > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          <div className='fancy-input'>
            <input value='Поиск' disabled className='left-input'/><input placeholder='Введите имя' onChange={(e) => setQuery(e.target.value)} className='right-input'/>
          </div>
          <EmployeesTable employees={employees} query={query} deleteUser={deleteUser} editUser={editUser}/>
        </PageLayout>
      </PageLayout>
    </>
  )
}