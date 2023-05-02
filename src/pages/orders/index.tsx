import MenuStepper from '@/components/MenuStepper'
import AdditionalInfo from '@/components/orders/AdditionalInfo'
import SelectOrder from '@/components/orders/SelectOrder'
import { PageLayout } from '@/layouts/PageLayout'
import { useState } from 'react'
import CompleteOrder from '@/components/orders/CompleteOrder'

export default function Orders() {
  const [step, setStep] = useState(0)
  const nextStep = () => step < 2 && setStep(step + 1)
  const prevStep = () => step > 0 && setStep(step - 1)


  return (
    <>
      <PageLayout title={<><span className="steps">Шаг {step+1} из 3</span>Заказы - Управление кафе</>} pageNav={"orders"}>
        <MenuStepper step={step} nextStep={nextStep} prevStep={prevStep}>
          <SelectOrder />
          <AdditionalInfo />
          <CompleteOrder />
        </MenuStepper>
      </PageLayout>
    </>
  )
}