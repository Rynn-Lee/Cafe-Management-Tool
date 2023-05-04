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
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState<any>([])
  const [step, setStep] = useState(0)
  const nextStep = () => step < 2 && setStep(step + 1)
  const prevStep = () => step > 0 && setStep(step - 1)

  const employeemenu = useQuery({
    queryKey: ["employeemenu"],
    queryFn: () => services.menu.findMenu({available: true}),
    onSuccess: (data) => setMenu(data.map((item:any)=>{return{...item, amount:1}})),
    enabled: false
  })

  useEffect(()=>{
    !employeemenu.data && employeemenu.refetch()
  }, [employeemenu])

  const selectedItem = (dish: any) => {
    console.log("Passed order: ",dish)
    console.log("CART: ",cart)
    const filtered = cart.find((item: any) => item._id == dish.id)
    !filtered && setCart([...cart, dish])

    console.log(filtered)
  }

  return (
    <>
      <PageLayout title={<><span className="steps">Шаг {step+1} из 3</span>Заказы - Управление кафе</>} pageNav={"orders"}>
        <MenuStepper step={step} nextStep={nextStep} prevStep={prevStep}>
          <SelectOrder selectedItem={selectedItem} menu={menu}/>
          <AdditionalInfo />
          <CompleteOrder />
        </MenuStepper>
      </PageLayout>
      {employeemenu.isFetching && <LoadingScreen />}
    </>
  )
}