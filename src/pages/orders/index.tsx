import MenuStepper from '@/components/MenuStepper'
import AdditionalInfo from '@/components/orders/AdditionalInfo'
import SelectOrder from '@/components/orders/SelectOrder'
import { PageLayout } from '@/layouts/PageLayout'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { services } from '@/services'
import { createID } from '@utils/createID'
import LoadingScreen from '@/components/LoadingScreen'

export default function Orders() {
  const [total, setTotal] = useState()
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
    onSuccess: (data) => setOrder({...order, waiter: {full_name: data.full_name, _id: data._id}})
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
    const orderID = createID()
    const response =  await services.printers.createOrder(order, printers.data, orderID)
    //!
    //! if(response.status != "Printed"){return}
    //! TURN ON LATER!
    await services.orders.createOrder(order, orderID)
  }

  return (
    <>
      <PageLayout title={<><span className="steps">Шаг {step+1} из 2</span>Заказы - Управление кафе</>} pageNav={"orders"}>
        <MenuStepper step={step} nextStep={nextStep} prevStep={prevStep} order={order.cart?.length} table={order.table} completeOrder={completeOrder}>
          <SelectOrder selectedItem={selectedItem} menu={menu} clearOrder={clearOrder} order={order.cart.length} removeOne={removeOne}/>
          <AdditionalInfo selectedItem={selectedItem} removeOne={removeOne} setTotal={setTotal} total={total} setStep={setStep} setOrder={setOrder} order={order}/>
        </MenuStepper>
      </PageLayout>
      {employeemenu.isFetching && <LoadingScreen />}
    </>
  )
}