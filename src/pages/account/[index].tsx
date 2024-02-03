import { services } from '@/services';
import { useRouter } from 'next/router';
import { PageLayout } from '@/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export default function Employee() {
  const [user, setUser] = useState<any>()
  const [myProfile, setMyProfile] = useState<any>(false)
  const router = useRouter()
  const { index }: any = router.query
  
  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.checkLogin(),
    onSuccess: (data) => setUser(data),
    onError: () => router.push("/login"),
    enabled: false
  })


  const employees = useQuery({
    queryKey: ["employees"],
    queryFn: () => services.account.findUsers(),
    enabled: false
  })

  useEffect(()=>{
    if(index === 'my'){
      auth.refetch()
      setMyProfile(true)
      return
    }
    if(!employees.isFetched){
      employees.refetch();
    }
    setUser(employees.data?.find((employee: any) => employee._id === index))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[index])

  const unauth = () =>{
    services.account.unauth()
    router.push("/login")
  }

  return (
    <>
      <PageLayout title={user?.full_name + " - Profile"} pageNav={"account"} id={index}>
        <div className='vertical account-form'>
          <div className='fields'><span>Full Name</span><span>{user?.full_name}</span></div>
          <div className='fields'><span>Hire date</span><span>{user?.hire_date}</span></div>
          <div className='fields'><span>Email</span><span>{user?.email}</span></div>
          <div className='fields'><span>Position</span><span>{user?.job}</span></div>
          {myProfile && <button onClick={()=>unauth()}>Log out</button>}
        </div>
      </PageLayout>
    </>
  )
}
