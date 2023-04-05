import { PageLayout } from '@/layouts/PageLayout'
import { useState } from 'react'
import { services } from '../services'

export default function Home() {
  const [users, setUsers] = useState([])
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
    <PageLayout title={"Главная - Управление кафе"}>
      <button onClick={addUser}>Add user</button>
      <button onClick={getUsers}>Get users</button>
      <button onClick={deleteAllUsers}>Delete users</button>

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