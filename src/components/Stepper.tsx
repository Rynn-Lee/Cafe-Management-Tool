import { PageLayout } from '@/layouts/PageLayout'

export default function Stepper({children, step, nextStep, prevStep}: any) {
  return (
    <>
      <button onClick={prevStep}>Назад</button>
      <button onClick={nextStep}>Далее</button>
      {children?.[step]}
    </>
  )
}