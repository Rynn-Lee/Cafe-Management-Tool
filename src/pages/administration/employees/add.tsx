import LoadingScreen from '@/components/LoadingScreen'
import { PageLayout } from '@/layouts/PageLayout'
import { setEmployees } from '@/reducers/employeesSlice'
import { services } from '@/services'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Add() {
  const [loading, setLoading] = useState(0)
  const dispatch = useDispatch()
  const addEmployee: any = useRef()
  
  const addNewEmployee = async(e: any) =>{
    setLoading(1)
    e.preventDefault()
    const employeeInfo = addEmployee.current
    const data = {
      full_name: employeeInfo['full_name'].value,
      job: employeeInfo['job'].value
    }
    const result = await services.account.addUser(data)
    dispatch(setEmployees(await services.account.getUsers()))
    result && setLoading(0)
  }

  return (
    <>
      <PageLayout title={"Сотрудники > Добавить - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          {loading ? <LoadingScreen/> : ""}
          <form className='fancy-input vertical' ref={addEmployee} onSubmit={addNewEmployee}>
            <div className='horizontal'><input value="ФИО" className='left-input' disabled/><input className='right-input' name="full_name"/></div>
            <div className='horizontal'><input value="Пароль" className='left-input' disabled/><input className='right-input' placeholder="По умолчанию! 123" disabled/></div>
            <div className='horizontal'><input value="Должность" className='left-input' disabled/>
            <select name="job" className='right-input'>
              <option>Официант</option>
              <option>Повар</option>
              <option>Кассир</option>
              <option>Администратор</option>
            </select></div>
          <button type='submit'>Add user</button>
          </form>
        </PageLayout>
      </PageLayout>
    </>
  )
}