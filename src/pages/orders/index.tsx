import Stepper from '@/components/Stepper'
import AdditionalInfo from '@/components/orders/AdditionalInfo'
import SelectDish from '@/components/orders/SelectDish'
import { calculateProgress } from '@utils/calculateProgress'
import { PageLayout } from '@/layouts/PageLayout'
import { useEffect, useState } from 'react'

export default function Orders() {
  const [step, setStep] = useState(0)
  const nextStep = () => step < 2 && setStep(step + 1)
  const prevStep = () => step > 0 && setStep(step - 1)


  return (
    <>
      <PageLayout title={`Шаг ${step+1} из 3 | Заказы - Управление кафе`} pageNav={"orders"}>
        <Stepper step={step} nextStep={nextStep} prevStep={prevStep}>
          <SelectDish />
          <AdditionalInfo />
        </Stepper>
      </PageLayout>
    </>
  )
}