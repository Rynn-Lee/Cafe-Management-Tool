import MenuStepper from '@/components/MenuStepper'
import AdditionalInfo from '@/components/orders/AdditionalInfo'
import SelectOrder from '@/components/orders/SelectOrder'
import { PageLayout } from '@/layouts/PageLayout'
import { useEffect, useState } from 'react'
import CompleteOrder from '@/components/orders/CompleteOrder'
import { useQuery } from '@tanstack/react-query'
import { services } from '@/services'
import LoadingScreen from '@/components/LoadingScreen'

export default function Orders() {
  const [total, setTotal] = useState()
  const [menu, setMenu] = useState<any>([])
  const [cart, setCart] = useState<any>([])
  const [step, setStep] = useState(0)
  const nextStep = () => step < 2 && setStep(step + 1)
  const prevStep = () => step > 0 && setStep(step - 1)

  const employeemenu = useQuery({
    queryKey: ["employeemenu"],
    queryFn: () => services.menu.findMenu({available: true}),
    onSuccess: (data) => setMenu(data.map((item:any)=>{return{...item, amount:0}})),
    enabled: true
  })

  //!---------------------- SKILL ISSUE - CRINGE ZONE - REFACTOR LATER! ----------------------!//
  const selectedItem = (dish: any) => {
    //! console.log("Passed order: ",dish)
    //! console.log("CART: ",cart)

    const filtered = cart.filter((item: any) => item._id == dish._id)

    if(!filtered.length){
      setCart([...cart, {...dish, amount: 1}])

      const newMenu2 = menu.map((item: any) => {
        return dish._id == item._id ? {...item, amount: 1} : item
      })
      
      setMenu(newMenu2)
      return
    }

    const changed = cart.map((item: any)=>{
      return item._id == dish._id ? {...item, amount: item.amount + 1} : item
    })

    const newMenu = menu.map((item: any) => {
      return filtered[0]._id == item._id ? {...item, amount: filtered[0].amount + 1} : item
    })

    setMenu(newMenu)
    setCart(changed)
    //! console.log("filtered: ", filtered)
    //! console.log("changed: ", changed)
  }
  //!---------------------- SKILL ISSUE - CRINGE ZONE - REFACTOR LATER! ----------------------!//

  const clearOrder = () =>{
    employeemenu.refetch()
    setCart([])
  }

  const removeOne = (id: string) => {
    const newMenu = menu.map((item: any) => item._id == id ? {...item, amount: item.amount - 1} : item)
    setMenu(newMenu)

    const newCart = cart.map((item: any) => {item._id == id ? {...item, amount: item.amount - 1} : item})
    setCart(newCart)

    console.log(cart)
  }

  return (
    <>
      <PageLayout title={<><span className="steps">Шаг {step+1} из 3</span>Заказы - Управление кафе</>} pageNav={"orders"}>
        <MenuStepper step={step} nextStep={nextStep} prevStep={prevStep} cart={cart?.length}>
          <SelectOrder selectedItem={selectedItem} menu={menu} clearOrder={clearOrder} cart={cart.length} removeOne={removeOne}/>
          <AdditionalInfo cart={cart} setTotal={setTotal} total={total}/>
          <CompleteOrder />
        </MenuStepper>
      </PageLayout>
      {employeemenu.isFetching && <LoadingScreen />}
    </>
  )
}