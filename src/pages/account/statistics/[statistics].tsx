import { PageLayout } from '@/layouts/PageLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { services } from '@/services';

export default function AccountStatistics() {
  const [user, setUser] = useState<any>({})
  const router = useRouter()
  const { statistics }: any = router.query
  
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
    if(statistics === 'my'){
      auth.refetch()
      return
    }
    if(!employees.isFetched){
      employees.refetch();
    }
    setUser(employees.data?.find((employee: any) => employee._id === statistics))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[statistics])

  return (
    <>
      <PageLayout title={user?.full_name + " - Статистика"} pageNav={"account"} id={statistics}>
        Статистика пользователя {user?.full_name}
      </PageLayout>
    </>
  )
}