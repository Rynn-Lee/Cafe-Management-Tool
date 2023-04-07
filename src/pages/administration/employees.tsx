import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees } from '@/reducers/employeesSlice';
import EmployeesTable from '@/components/administration/EmployeesTable';
import Link from 'next/link';

export default function Employees() {
  const employees = useSelector((state: any) => state.employees.list)
  const dispatch = useDispatch()

  const getList = async() =>{
    dispatch(setEmployees(await services.account.getUsers()))
  }

  useEffect(()=>{
    !employees.length && getList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <PageLayout title={"Сотрудники - Управление кафе"} pageNav={"administration"}>
        <button onClick={getList}>Обновить</button>
        <EmployeesTable employees={employees}/>

        
      </PageLayout>
    </>
  )
}