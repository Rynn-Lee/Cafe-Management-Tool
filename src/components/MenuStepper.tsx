import { PageLayout } from '@/layouts/PageLayout'

export default function MenuStepper({children, step, nextStep, prevStep, cart}: any) {
  return (
    <>
      {step ? <button onClick={prevStep}>Назад</button> : ""}
      {step < 2 && cart ? <button onClick={nextStep}>Далее</button> : ""}
      {children?.[step]}
    </>
  )
}