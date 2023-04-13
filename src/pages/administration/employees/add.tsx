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
    dispatch(setEmployees(await services.account.findUsers()))
    result && setLoading(0)
  }

  return (
    <>
      <PageLayout title={"Сотрудники > Добавить - Управление кафе"} pageNav={"administration"}>
        <PageLayout pageNav={"administration/employees"} nav2>
          {loading ? <LoadingScreen/> : ""}
          <form className='vertical padding-5' ref={addEmployee} onSubmit={addNewEmployee}>
            <div className='horizontal margin-2'><input value="ФИО" className='left-input width-100' disabled/><input className='right-input width-400' name="full_name"/></div>
            <div className='horizontal margin-2'><input value="Пароль" className='left-input width-100' disabled/><input className='right-input width-400' placeholder="По умолчанию! 123" disabled/></div>
            <div className='horizontal margin-2'><input value="Должность" className='left-input width-100' disabled/>
            <select name="job" className='right-input width-400'>
              <option>Официант</option>
              <option>Повар</option>
              <option>Кассир</option>
              <option>Администратор</option>
            </select></div>
          <button type='submit' className='button width-500 margin-2'>Добавить сотрудника</button>
          </form>
        </PageLayout>
      </PageLayout>
    </>
  )
}