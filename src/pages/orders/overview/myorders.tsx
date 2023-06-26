import LoadingScreen from '@/components/LoadingScreen'
import OrderCard from '@/components/orders/OrderCard'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MyOrders() {
  const [orders, setOrders] = useState([])

  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.checkLogin()
  })

  const myorders = useQuery({
    queryKey: ["myorders"],
    queryFn: () => services.orders.getOrders({"waiter.full_name": auth.data?.full_name}),
    onSuccess: (data) => setOrders(data),
    enabled: false
  })

  useEffect(()=>{
    !myorders.isFetched || !myorders.data.length && myorders.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myorders.data])

  useEffect(()=>{
    myorders.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth.data?.full_name])

  return (
    <>
      <PageLayout title={"Заказы - Управление кафе"} pageNav={"orders"}>
        <PageLayout pageNav={"orders/overview"} nav2>
        <div className='menu-waiter'>
          {orders.length ? orders.map((order: any) => (
            <Link key={order._id} href={`${order.orderID}`}>
              <OrderCard
              order={order}/>
            </Link>
          )).reverse() : ""
          }
        </div>
        </PageLayout>
      </PageLayout>
      {myorders.isFetching && <LoadingScreen />}
    </>
  )
}