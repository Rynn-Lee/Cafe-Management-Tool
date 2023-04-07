import Image from 'next/image'
import eyeIco from '../../assets/icons/eye.svg'
import Link from 'next/link'

export default function EmployeesTable({employees}: any) {
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
      employees?.map((employee: any, index: any)=>{
        return(
          <tr key={index}>
            <td><Link href={`/account/${employee._id}`}>{employee.full_name}</Link></td>
            <td>{employee.hire_date}</td>
            <td>{employee.job}</td>
            <td>{employee.email}</td>
            <td><Image src={eyeIco} alt="eye" className='ico'/>Посмотреть</td>
          </tr>
        )
      }).reverse()
    }
    </tbody>
  </table>
  )
}

