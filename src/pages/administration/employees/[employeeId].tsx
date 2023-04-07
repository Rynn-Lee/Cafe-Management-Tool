import { services } from '@/services';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { PageLayout } from '@/layouts/PageLayout';
import { setEmployees } from '@/reducers/employeesSlice';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Employee() {
  const employees = useSelector((state: any) => state.employees.list)
  const [employee, setEmployee] = useState<any>()
  const router = useRouter()
  const { employeeId }: any = router.query

  useEffect(()=>{
    console.log("emp id: ", employeeId)
    const user = employees.find((element: { _id: any; }) => element._id === employeeId)
    setEmployee(user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const unauth = () =>{
    services.account.unauth()
    router.push("/login")
  }

  return (
    <>
      <PageLayout title={employee?.full_name + " - Управление кафе"} pageNav={"account"}>
      <Link href="/administration/employees"><button>Назад</button></Link>
        <div className='about vertical'>
          <div className='horizontal'><span className="left-input">ФИО</span><span className="right-input">{employee?.full_name}</span></div>
          <div className='horizontal'><span className="left-input">Дата устройства</span><span className="right-input">{employee?.hire_date}</span></div>
          <div className='horizontal'><span className="left-input">Email</span><span className="right-input">{employee?.email}</span></div>
          <div className='horizontal'><span className="left-input">Должность</span><span className="right-input">{employee?.job}</span></div>
          <button onClick={()=>unauth()}>Выход</button>
        </div>
      </PageLayout>
    </>
  )
}
