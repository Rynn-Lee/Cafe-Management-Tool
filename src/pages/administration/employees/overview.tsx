import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import EmployeesTable from '@/components/administration/EmployeesTable';
import LoadingScreen from '@/components/LoadingScreen';
import Image from 'next/image';
import searchIco from '@icons/search.svg'

export default function Employees() {
  const [query, setQuery] = useState<any>("")
  
  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: () => services.account.findUsers(),
    enabled: false
  })

  useEffect(()=>{
    !employees.data && employees.refetch()
  },[employees])

  const deleteUser = async (id: string) =>{
    await services.account.deleteUsers(id)
    employees.refetch()
  }
  
  const editUser = (id: string) => {
    alert(`Coming soon! ID: ${id}`)
  }

  return (
    <>
      <PageLayout title={"Сотрудники  > Просмотр - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          <div className='form employees-form bg-3'>
            <div>
              <Image src={searchIco} alt="search" className="ico" /><input placeholder='Поиск по имени' onChange={(e) => setQuery(e.target.value)} className='right-input'/>
            </div>
            <EmployeesTable employees={employees.data} query={query} deleteUser={deleteUser} editUser={editUser}/>
          </div>
        </PageLayout>
      </PageLayout>
      {employees.isFetching && <LoadingScreen />}
    </>
  )
}