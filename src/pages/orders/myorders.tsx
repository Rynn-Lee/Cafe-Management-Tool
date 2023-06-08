import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export default function MyOrders() {
  const [orders, setOrders] = useState([])

  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.checkLogin()
  })

  const myorders = useQuery({
    queryKey: ["myorders"],
    queryFn: () => services.orders.getOrders({waiter: auth.data?.full_name}),
    onSuccess: (data) => setOrders(data),
    enabled: false
  })

  useEffect(()=>{
    myorders.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth.data?.full_name])

  return (
    <>
      <PageLayout title={"Заказы - Управление кафе"} pageNav={"orders"}>
        {orders.map((order: any) => (
          <div key={order._id}>
            {order.orderID}
          </div>
        ))}
      </PageLayout>
    </>
  )
}