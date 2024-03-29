import MenuStepper from '@/components/MenuStepper'
import AdditionalInfo from '@/components/orders/AdditionalInfo'
import SelectOrder from '@/components/orders/SelectOrder'
import { PageLayout } from '@/layouts/PageLayout'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { services } from '@/services'
import { createID } from '@utils/createID'
import LoadingScreen from '@/components/LoadingScreen'
import { getDateNow } from '@/utils/getDate'
import useDialog from '@/hooks/useDialog'

export default function Orders() {
  const [total, setTotal] = useState()
  const {DialogWindow, ask} = useDialog()
  const [menu, setMenu] = useState<any>([])
  const [order, setOrder] = useState<any>({
    cart: [],
    waiter: {},
    table: '',
    totalCost: 0,
  })
  const [step, setStep] = useState(0)
  const nextStep = () => step < 1 && setStep(step + 1)
  const prevStep = () => step > 0 && setStep(step - 1)

  const auth = useQuery({
    queryKey: ["auth"],
    queryFn: () => services.account.checkLogin(),
    onSuccess: (data) => {data && setOrder({...order, waiter: {full_name: data.full_name, _id: data._id}})},
  })

  const myorders = useQuery({
    queryKey: ["myorders"],
    queryFn: () => services.orders.getOrders({"waiter.full_name": auth.data?.full_name}),
    enabled: false
  })

  const employeemenu = useQuery({
    queryKey: ["employeemenu"],
    queryFn: () => services.menu.findMenu({available: true}), 
    onSuccess: (data) => setMenu(data.map((item:any)=>{return{...item, amount:0}})), 
    enabled: true
  })

  const printers = useQuery({
    queryKey: ["printers"],
    queryFn: () => services.printers.find(),
    enabled: true
  })

  console.log("ORDER: ",order)

  //!---------------------- SKILL ISSUE - CRINGE ZONE - REFACTOR LATER! ----------------------!//
  const selectedItem = (dish: any) => {
    const filtered = order.cart.filter((item: any) => item._id == dish._id)

    if(!filtered.length){
      setOrder({...order, cart: [...order.cart, {...dish, amount: 1}]})

      const newMenu2 = menu.map((item: any) => {
        return dish._id == item._id ? {...item, amount: 1} : item
      })
      
      setMenu(newMenu2)
      return
    }

    const changed = order.cart.map((item: any)=> item._id == dish._id ? {...item, amount: item.amount + 1} : item)
    const newMenu = menu.map((item: any) => filtered[0]._id == item._id ? {...item, amount: filtered[0].amount + 1} : item)

    setMenu(newMenu)
    setOrder({...order, cart: changed})
  }
  //!---------------------- SKILL ISSUE - CRINGE ZONE - REFACTOR LATER! ----------------------!//

  const clearOrder = () =>{
    employeemenu.refetch()
    setOrder({...order, cart: [], table: "", totalCost: 0})
  }

  const removeOne = (id: string) => {
    const newMenu = menu.map((item: any) => item._id == id ? {...item, amount: item.amount - 1} : item)
    setMenu(newMenu)
    const newCart = order.cart.map((item: any) => item._id == id ? {...item, amount: item.amount - 1} : item).filter((item: any) => item.amount > 0)
    setOrder({...order, cart: newCart})
  }

  const completeOrder = async() => {
    const additionalInfo = {
      orderID: createID(),
      date: getDateNow("short")
    }

    const printerreturn = await services.printers.createOrder(order, printers.data, additionalInfo)
    if(!printerreturn) throw new Error("Printing service didn't respond!")
    
    const orderreturn= await services.orders.createOrder(order, additionalInfo)
    if(!orderreturn) throw new Error("Order service didn't respond!")

    clearOrder()
    setStep(0)
    return true
  }

  const mutateOrders = useMutation({
    mutationFn: async (additionalInfo: any) => {
      await completeOrder()
    },
    onSuccess: () => myorders.refetch(),
    onError: (error: any)=>ask(`${error}`, false, false, "error")
  })

  return (
    <>
      <PageLayout title={<><span className="steps">Step {step+1} out of 2</span>Orders - Cafe Management</>} pageNav={"orders"}>
        <MenuStepper step={step} nextStep={nextStep} prevStep={prevStep} order={order.cart?.length} table={order.table} mutateOrders={mutateOrders}>
          <SelectOrder selectedItem={selectedItem} menu={menu} clearOrder={clearOrder} order={order.cart.length} removeOne={removeOne}/>
          <AdditionalInfo selectedItem={selectedItem} removeOne={removeOne} setTotal={setTotal} total={total} setStep={setStep} setOrder={setOrder} order={order}/>
        </MenuStepper>
        <DialogWindow/>
      </PageLayout>
      {(employeemenu.isFetching || mutateOrders.isLoading) && <LoadingScreen />}
    </>
  )
}