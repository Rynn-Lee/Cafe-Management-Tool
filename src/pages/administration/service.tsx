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

  return (
    <>
      <PageLayout title={"Сервисное меню - Управление кафе"} pageNav={"administration"}>
      <button onClick={getUsers}>Get users</button>
      <button onClick={deleteAllUsers}>Delete users</button><br/>
      <button onClick={()=>dispatch(removeEmployees())}>Clear Redux Store</button>

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