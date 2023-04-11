import Image from 'next/image'
import eyeIco from '../../assets/icons/eye.svg'
import userDeleteIco from '../../assets/icons/userDelete.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function EmployeesTable({employees, query, deleteUser}: any) {

  const [search, setSearch] = useState<any>([])

  const newQuery = () =>{
    if(query){
      setSearch(employees.filter((item: any) => item.full_name.toLowerCase().includes(query.toLowerCase())))
      return
    }
    setSearch(employees)
  }

  useEffect(()=>{
    newQuery()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, employees])

  return (
    <table>
    <thead>
      <tr>
        <th>ФИО</th>
        <th>Дата регистрации</th>
        <th>Должность</th>
        <th>Почта</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
    {
      search?.map((employee: any, index: any)=>{
        return(
          <tr key={index}>
            <td><Link href={`/account/${employee._id}`} title={`ID: ${employee._id}`}><Image src={eyeIco} alt="eye" className='ico'/>{employee.full_name}</Link></td>
            <td>{employee.hire_date}</td>
            <td>{employee.job}</td>
            <td>{employee.email}</td>
            <td className='actions'><Image src={userDeleteIco} alt="Удалить пользователя" className='ico' onClick={()=>deleteUser(employee._id)}/></td>
          </tr>
        )
      }).reverse()
    }
    </tbody>
  </table>
  )
}

