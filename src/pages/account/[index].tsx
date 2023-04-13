import { services } from '@/services';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { PageLayout } from '@/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { deleteInfo } from '@/reducers/authSlice';
import { removeEmployees } from '@/reducers/employeesSlice';

export default function Employee() {
  const auth = useSelector((state: any) => state.auth.info[0])
  const employees = useSelector((state: any) => state.employees.list)
  const dispatch = useDispatch()
  const [user, setUser] = useState<any>()
  const [myProfile, setMyProfile] = useState<any>(false)
  const router = useRouter()
  const { index }: any = router.query

  useEffect(()=>{
    if(index === 'my'){
      setUser(auth)
      setMyProfile(true)
      return
    }
    const result = employees.find((element: { _id: any }) => element._id === index)
    setUser(result)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[index])

  const unauth = () =>{
    services.account.unauth()
    dispatch(deleteInfo())
    dispatch(removeEmployees())
    router.push("/login")
  }

  return (
    <>
      <PageLayout title={user?.full_name + " - Профиль"} pageNav={"account"} id={index}>
        <div className='vertical padding-2'>
          <div className='horizontal margin-2'><input className="left-input width-150" value='ФИО' disabled/><input className="right-input width-450" value={user?.full_name} disabled/></div>
          <div className='horizontal margin-2'><input className="left-input width-150" value='Дата устройства' disabled/><input className="right-input width-450" value={user?.hire_date} disabled/></div>
          <div className='horizontal margin-2'><input className="left-input width-150" value='Email' disabled/><input className="right-input width-450" value={user?.email} disabled/></div>
          <div className='horizontal margin-2'><input className="left-input width-150" value='Должность' disabled/><input className="right-input width-450" value={user?.job} disabled/></div>
          {myProfile && <button onClick={()=>unauth()} className='button width-600 margin-2'>Выход</button>}
        </div>
      </PageLayout>
    </>
  )
}
