import { PageLayout } from '@/layouts/PageLayout'
import { useQuery } from '@tanstack/react-query';
import { services } from '@/services'
import { useState, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen';

export default function Add() {
  const [newEmployee, setNewEmployee] = useState<any>({job: "Официант"})

  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: () => services.account.findUsers(),
    onSuccess: (data) => console.log(data),
    enabled: false
  })

  const addNewEmployee = async(e: any) =>{
    e.preventDefault()
    const data = {
      full_name: newEmployee.full_name,
      job: newEmployee.job
    }
    await services.account.addUser(data)
    employees.refetch()
  }

  return (
    <>
      <PageLayout title={"Сотрудники > Добавить - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          <form onSubmit={addNewEmployee} className='form'>
            <div className='fields'><span>Фио</span><input onChange={(e) => setNewEmployee({...newEmployee, full_name: e.target.value})}/></div>
            <div className='fields'><span>Пароль</span><input placeholder="По умолчанию! 123" readOnly/></div>
            <div className='fields'><span>Должность</span>
            <select onChange={(e) => setNewEmployee({...newEmployee, job: e.target.value})}>
              <option>Официант</option>
              <option>Повар</option>
              <option>Кассир</option>
              <option>Администратор</option>
            </select></div>
          <button type='submit'>Добавить сотрудника</button>
          </form>
        </PageLayout>
      </PageLayout>
      {employees.isFetching && <LoadingScreen />}
    </>
  )
}