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
        <div className='fancy-input vertical'>
          <div className='horizontal margin'><span className="left-input">ФИО</span><span className="right-input">{user?.full_name}</span></div>
          <div className='horizontal margin'><span className="left-input">Дата устройства</span><span className="right-input">{user?.hire_date}</span></div>
          <div className='horizontal margin'><span className="left-input">Email</span><span className="right-input">{user?.email}</span></div>
          <div className='horizontal margin'><span className="left-input">Должность</span><span className="right-input">{user?.job}</span></div>
          {myProfile && <button onClick={()=>unauth()} className='margin'>Выход</button>}
        </div>
      </PageLayout>
    </>
  )
}
