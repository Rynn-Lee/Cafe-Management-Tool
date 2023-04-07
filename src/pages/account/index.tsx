import { services } from '@/services';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PageLayout } from '@/layouts/PageLayout';

export default function Account() {
  const router = useRouter()
  const auth = useSelector((state: any) => state.auth.info[0])

  const unauth = () =>{
    services.account.unauth()
    router.push("/login")
  }

  return (
    <>
      <PageLayout title={"Аккаунт - Управление кафе"} pageNav={"account"}>
        <div className='about vertical'>
          <div className='horizontal'><span className="left-input">ФИО</span><span className="right-input">{auth?.full_name}</span></div>
          <div className='horizontal'><span className="left-input">Дата устройства</span><span className="right-input">{auth?.hire_date}</span></div>
          <div className='horizontal'><span className="left-input">Email</span><span className="right-input">{auth?.email}</span></div>
          <div className='horizontal'><span className="left-input">Должность</span><span className="right-input">{auth?.job}</span></div>
          <button onClick={()=>unauth()}>Выход</button>
        </div>
      </PageLayout>
    </>
  )
}