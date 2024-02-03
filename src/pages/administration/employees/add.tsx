import { PageLayout } from '@/layouts/PageLayout'
import { useQuery } from '@tanstack/react-query';
import { services } from '@/services'
import { useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen';
import Image from 'next/image';
import plusIco from '@icons/plus.svg'

export default function Add() {
  const [newEmployee, setNewEmployee] = useState<any>({job: "Официант"})

  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: () => services.account.findUsers(),
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
      <PageLayout title={"Employees > Add - Cafe Management"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          <form onSubmit={addNewEmployee} className='form'>
            <div className='fields'><span>Full Name</span><input onChange={(e) => setNewEmployee({...newEmployee, full_name: e.target.value})}/></div>
            <div className='fields'><span>Password</span><input placeholder="By default! 123" readOnly/></div>
            <div className='fields'><span>Position</span>
            <select onChange={(e) => setNewEmployee({...newEmployee, job: e.target.value})}>
              <option>Waiter</option>
              <option>Cook</option>
              <option>Cashier</option>
              <option>Administrator</option>
            </select></div>
          <button type='submit'><Image src={plusIco} alt="Image" className="ico"/>Add an employee</button>
          </form>
        </PageLayout>
      </PageLayout>
      {employees.isFetching && <LoadingScreen />}
    </>
  )
}