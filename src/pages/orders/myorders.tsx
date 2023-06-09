import LoadingScreen from '@/components/LoadingScreen'
import OrderCard from '@/components/orders/OrderCard'
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
    !myorders.isFetched || !myorders.data.length && myorders.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myorders.data])

  useEffect(()=>{
    myorders.refetch()
    console.log(orders)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth.data?.full_name])

  return (
    <>
      <PageLayout title={"Заказы - Управление кафе"} pageNav={"orders"}>
        <div className='menu-waiter'>
          {orders.map((order: any) => (
            <OrderCard
            key={order._id}
            order={order}/>
          )).reverse()
          }
        </div>
      </PageLayout>
      {myorders.isFetching && myorders.isLoading && <LoadingScreen />}
    </>
  )
}