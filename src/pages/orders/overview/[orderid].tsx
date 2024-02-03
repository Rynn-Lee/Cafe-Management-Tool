import { PageLayout } from '@/layouts/PageLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query';
import { services } from '@/services';
import Link from 'next/link';
import Image from 'next/image';
import useDialog from '@/hooks/useDialog';
import LoadingScreen from '@/components/LoadingScreen';

export default function OrderPage() {
  const {DialogWindow, ask} = useDialog()
  const [order, setOrder] = useState<any>({})
  const router = useRouter()
  const { orderid }: any = router.query
  
  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.checkLogin()
  })

  const myorders = useQuery({
    queryKey: ["myorders"],
    queryFn: () => services.orders.getOrders({"orderID": orderid}),
    onSuccess: (data: any) => {
      data.length > 1
      ? setOrder(data.find((item: any)=>item.orderID == orderid))
      : setOrder(data[0])
    },
    enabled: false
  })

  const mutateOrders = useMutation({
    mutationFn: async (del: boolean = false) => {
      await services.orders.finishOrder(myorders.data[0], auth.data, del)
    },
    onSuccess: async() => {await myorders.refetch(), router.push("/orders/overview/myorders")},
    onError: (error: any)=>ask(`${error}`, false, false, "error")
  })

  useEffect(()=>{
    if(!orderid){return}
    console.log(orderid)
    myorders.refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderid])


  return (
    <>
      <PageLayout title={"Orders - Cafe Management"} pageNav={"orders"}>
        <PageLayout pageNav={"orders/overview"} nav2>
          <div className='order-overview'>
            <div>
              <div className="images">
                {order?.cart?.map((item: any, index: number) => index < 8 ? <Image key={index} src={`/images/${item.filename}`} className="fill-img" alt="dish" width={200} height={200}/> : <></>)}
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>Order #: </td>
                    <td>{order?.orderID}</td>
                  </tr>
                  <tr>
                    <td>Date: </td>
                    <td>{order?.date}</td>
                  </tr>
                  <tr>
                    <td>Table: </td>
                    <td>{order?.table}</td>
                  </tr>
                  <tr>
                    <td>Waiter: </td>
                    <td>{order?.waiter?.full_name}</td>
                  </tr>
                  <tr>
                    <td>Total sum: </td>
                    <td>{order?.totalCost}тг.</td>
                  </tr>
                </tbody>
              </table>
              <div className='buttons'>
                <Link href={"/orders/overview/myorders"}>Назад</Link>
                <button onClick={()=>ask("Are you sure you want to cancel the order?", ()=>mutateOrders.mutate(true))}>Cancel the order</button>
                <button onClick={()=>mutateOrders.mutate(false)}>Complete</button>
              </div>
            </div>
          </div>
        </PageLayout>
        <DialogWindow/>
      {(myorders.isFetching || mutateOrders.isLoading) && <LoadingScreen />}
      </PageLayout>
    </>
  )
}