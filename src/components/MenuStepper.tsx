import { PageLayout } from '@/layouts/PageLayout'

export default function MenuStepper({children, step, nextStep, prevStep}: any) {
  return (
    <>
      {step ? <button onClick={prevStep}>Назад</button> : ""}
      {step < 2 ? <button onClick={nextStep}>Далее</button> : ""}
      {children?.[step]}
    </>
  )
}