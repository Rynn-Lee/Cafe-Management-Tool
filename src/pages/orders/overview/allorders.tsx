import LoadingScreen from '@/components/LoadingScreen'
import OrderCard from '@/components/orders/OrderCard'
import { PageLayout } from '@/layouts/PageLayout'
import { services } from '@/services'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function AllOrders({}) {
  const [orders, setOrders] = useState([])
  
  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.checkLogin()
  })

  const allorders = useQuery({
    queryKey: ["allorders"],
    queryFn: () => services.orders.getOrders({'waiter.full_name': {$ne: auth.data?.full_name}}),
    onSuccess: (data) => setOrders(data),
    enabled: false
  })

  
  useEffect(()=>{
    !allorders.isFetched || !allorders.data.length && allorders.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allorders.data])

  useEffect(()=>{
    allorders.refetch()
    console.log(orders)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth.data?.full_name])

  return (
    <>
      <PageLayout title={"Заказы - Управление кафе"} pageNav={"orders"}>
        <PageLayout pageNav={"orders/overview"} nav2>
        <div className='menu-waiter'>
          {orders.length && orders?.map((order: any) => (
            <Link key={order._id} href={`${order.orderID}`}>
              <OrderCard
              order={order}/>
            </Link>
          )).reverse()
          }
        </div>
        </PageLayout>
      </PageLayout>
      {allorders.isFetching && allorders.isLoading && <LoadingScreen />}
    </>
  )
}