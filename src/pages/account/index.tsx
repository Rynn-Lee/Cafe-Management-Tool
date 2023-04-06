import { services } from '@/services';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PageLayout } from '@/layouts/PageLayout';

export default function Account() {
  const router = useRouter()
  const auth = useSelector((state: any) => state.auth.info[0])

  useEffect(()=>{
    !auth && router.push("/login")
  })

  const unauth = () =>{
    services.account.unauth()
    router.push("/login")
  }

  return (
    <>
      <PageLayout title={"Аккаунт - Управление кафе"} pageNav={"account"}>
        <div className='about vertical'>
          <span><input value={"ФИО"} className="left-input" disabled/><input value={auth?.full_name} className="right-input" disabled/></span>
          <span><input value={"Дата Трудоустройства"} className="left-input" disabled/><input value={auth?.hire_date} className="right-input" disabled/></span>
          <span><input value={"Email"} className="left-input" disabled/><input value={auth?.email} className="right-input" disabled/></span>
          <span><input value={"Должность"} className="left-input" disabled/><input value={auth?.job} className="right-input" disabled/></span>
          <button onClick={()=>unauth()}>Выход</button>
        </div>
      </PageLayout>
    </>
  )
}