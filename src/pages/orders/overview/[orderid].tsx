import { PageLayout } from '@/layouts/PageLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { services } from '@/services';
import Link from 'next/link';
import Image from 'next/image';
import useDialog from '@/hooks/useDialog';
import LoadingScreen from '@/components/LoadingScreen';

export default function AccountStatistics() {
  const {DialogWindow, ask} = useDialog()
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

  const mutateOrders = useMutation({
    mutationFn: async (del: any = false) => {
      del
      ? await services.orders.deleteOrder(myorders.data[0]?._id)
      : await services.orders.finishOrder(myorders.data[0])
    },
    onSuccess: async() => {await myorders.refetch(), router.push("/orders/overview/myorders")},
    onError: (error: any)=>ask(`${error}`, false, false, "error")
  })

  useEffect(()=>{
    console.log(myorders.data[0])
  }, [myorders.data])

  return (
    <>
      <PageLayout title={"Заказы - Управление кафе"} pageNav={"orders"}>
        <PageLayout pageNav={"orders/overview"} nav2>
          <div className='order-overview'>
            <div>
              <div className="images">
                {myorders.data[0]?.cart.map((item: any, index: number) => index < 8 ? <Image key={item.id} src={`/images/${item.filename}`} className="fill-img" alt="dish" width={200} height={200}/> : "")}
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>Заказ номер: </td>
                    <td>{order?.orderID}</td>
                  </tr>
                  <tr>
                    <td>Дата заказа: </td>
                    <td>{order?.date}</td>
                  </tr>
                  <tr>
                    <td>Столик: </td>
                    <td>{order?.table}</td>
                  </tr>
                  <tr>
                    <td>Обслуживающий официант: </td>
                    <td>{order?.waiter?.full_name}</td>
                  </tr>
                  <tr>
                    <td>Сумма заказа: </td>
                    <td>{order?.totalCost}тг.</td>
                  </tr>
                </tbody>
              </table>
              <div className='buttons'>
                <Link href={"/orders/overview/myorders"}>Назад</Link>
                <button onClick={()=>mutateOrders.mutate(true)}>Отменить заказ</button>
                <button onClick={()=>mutateOrders.mutate(false)}>Завершить</button>
              </div>
            </div>
          </div>
        </PageLayout>
      {(myorders.isFetching || mutateOrders.isLoading) && <LoadingScreen />}
      </PageLayout>
    </>
  )
}