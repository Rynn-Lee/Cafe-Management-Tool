import { PageLayout } from '@/layouts/PageLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function AccountStatistics() {
  const router = useRouter()
  const { statistics }: any = router.query
  const auth = useSelector((state: any) => state.auth.info[0])
  const employees = useSelector((state: any) => state.employees.list)
  const [user, setUser] = useState<any>({})

  useEffect(()=>{
    if(statistics === 'my'){ setUser(auth); return }
    const result = employees.find((employee: any) => employee._id === statistics)
    setUser(result)
  },[auth, employees, statistics])

  return (
    <>
      <PageLayout title={user?.full_name + " - Статистика"} pageNav={"account"} id={statistics}>
        Статистика пользователя {user?.full_name}
      </PageLayout>
    </>
  )
}