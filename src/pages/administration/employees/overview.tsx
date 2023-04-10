import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees } from '@/reducers/employeesSlice';
import EmployeesTable from '@/components/administration/EmployeesTable';

export default function Employees() {
  const employees = useSelector((state: any) => state.employees.list)
  const [query, setQuery] = useState<any>("")
  const [users, setUsers] = useState<any>(employees)
  const dispatch = useDispatch()

  const getList = async() => {
    dispatch(setEmployees(await services.account.getUsers()))
    setUsers(employees)
  }
  
  const deleteUser = (id: string) =>{
    services.account.deleteUser(id)
    const filtered = users.filter((user: any) => user._id != id)
    setUsers(filtered)
  }

  useEffect(()=>{
    !employees.length && getList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <PageLayout title={"Сотрудники - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          <div className='fancy-input'>
            <input value='Поиск' disabled className='left-input'/><input placeholder='Введите имя' onChange={(e) => setQuery(e.target.value)} className='right-input'/>
            <button onClick={getList}>Обновить</button>
          </div>
          <EmployeesTable employees={users} query={query} deleteUser={deleteUser}/>

        </PageLayout>
      </PageLayout>
    </>
  )
}