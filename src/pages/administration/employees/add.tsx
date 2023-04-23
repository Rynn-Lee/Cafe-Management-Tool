import { PageLayout } from '@/layouts/PageLayout'
import { useQuery } from '@tanstack/react-query';
import { services } from '@/services'
import { useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen';
import { Input } from '@styles/input';
import { Label } from '@styles/label';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue}from "@styles/select"
import { Button } from '@styles/button';

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
          <form onSubmit={addNewEmployee} className='form bg-3 p-1'>
            <Label htmlFor="name">ФИО</Label>
            <Input onChange={(e) => setNewEmployee({...newEmployee, full_name: e.target.value})}/>
            <Label htmlFor="name">Пароль</Label>
            <Input placeholder="По умолчанию! 123" readOnly/>
            <Label htmlFor="name">Выберите должность</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Официант" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Официант">Официант</SelectItem>
                <SelectItem value="Повар">Повар</SelectItem>
                <SelectItem value="Кассир">Кассир</SelectItem>
                <SelectItem value="Администратор">Администратор</SelectItem>
              </SelectContent>
            </Select>
            {/* <select onChange={(e) => setNewEmployee({...newEmployee, job: e.target.value})}>
              <option>Официант</option>
              <option>Повар</option>
              <option>Кассир</option>
              <option>Администратор</option>
            </select> */}
          <Button variant={'teal'} className='w-max'>Добавить сотрудника</Button>
          </form>
        </PageLayout>
      </PageLayout>
      {employees.isFetching && <LoadingScreen />}
    </>
  )
}