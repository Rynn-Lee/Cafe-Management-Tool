import { PageLayout } from '@/layouts/PageLayout'
import { useDispatch, useSelector } from 'react-redux';
import { removeEmployees } from '@/reducers/employeesSlice';
import { services } from '@/services'
import { useState } from 'react'

export default function Service() {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  const addUser = async() => {
    console.log(await services.account.addUser())
  }
  const getUsers = async() => {
    const result = await services.account.getUsers()
    setUsers(result)
    console.log(result)
  }

  const deleteAllUsers = async() => {
    console.log(await services.account.deleteAllUser());
  }

  return (
    <>
      <PageLayout title={"Сервисное меню - Управление кафе"} pageNav={"administration"}>
      <button onClick={addUser}>Add user</button>
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