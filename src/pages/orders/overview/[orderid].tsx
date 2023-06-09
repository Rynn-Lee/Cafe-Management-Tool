import { PageLayout } from '@/layouts/PageLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { services } from '@/services';
import Link from 'next/link';

export default function AccountStatistics() {
  const [order, setOrder] = useState<any>({})
  const router = useRouter()
  const { orderid }: any = router.query
  
  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.checkLogin(),
    onSuccess: (data) => setOrder(data),
    onError: () => router.push("/login"),
    enabled: false
  })
  
  const myorders = useQuery({
    queryKey: ["myorders"],
    queryFn: () => services.orders.getOrders({"orderID": orderid}),
    onSuccess: (data) => setOrder(data[0])
  })

  return (
    <>
      <PageLayout title={"Заказы - Управление кафе"} pageNav={"orders"}>
        <PageLayout pageNav={"orders/overview"} nav2>
          <Link href={"/orders/overview/myorders"}>Назад</Link>
          <span> {order?.orderID}</span>
        </PageLayout>
      </PageLayout>
    </>
  )
}