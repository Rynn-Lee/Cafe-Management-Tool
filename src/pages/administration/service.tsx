import { PageLayout } from '@/layouts/PageLayout'
import { useDispatch } from 'react-redux';
import { removeEmployees } from '@/reducers/employeesSlice';
import { services } from '@/services'
import { useState } from 'react'

export default function Service() {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  const getUsers = async() => setUsers(await services.account.findUsers())
  const deleteAllUsers = async() => await services.account.deleteUsers()
  const deleteMenu = async() => await services.menu.deleteAll()

  return (
    <>
      <PageLayout title={"Сервисное меню - Управление кафе"} pageNav={"administration"}>
      <div className='horizontal'>
        <button className='button padding-10' onClick={getUsers}>Get users</button>
        <button className='button padding-10' onClick={deleteAllUsers}>Delete users</button><br/>
        <button className='button padding-10' onClick={deleteMenu}>Delete menu</button><br/>
        <button className='button padding-10' onClick={()=>dispatch(removeEmployees())}>Clear Redux Store</button>
      </div>
      <ul>
        {users.map((user: any, index: number)=>{
          return(
            <li key={user._id}>
              Name: {user.full_name}<br/>
              Hire date: {user.hire_date}<br/>
              email: {user.email}<br/>
              job: {user.job}
            </li>
          )
        })}
      </ul>
      </PageLayout>
    </>
  )
}