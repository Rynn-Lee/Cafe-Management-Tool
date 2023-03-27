import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { services } from '../services'

export default function Home() {

  const [users, setUsers] = useState([])

  useEffect(()=>{
    getUsers()
    return () => {false}
  }, [])

  const addUser = async() => {
    console.log(await services.account.addUser())
  }
  const getUsers = async() => {
    const result = await services.account.getUsers()
    setUsers(result)
    console.log(result)
  }

  return (
    <>
      <Head><title>Cafe Management Tool</title></Head>
      <div className='content'>
        <button onClick={addUser}>Add user</button>
        <button onClick={getUsers}>Get users</button>
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
      </div>
    </>
  )
}