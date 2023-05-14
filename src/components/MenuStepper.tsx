import arrowR from '@icons/arrow-r.svg'
import arrowL from '@icons/arrow-l.svg'
import check from '@icons/check.svg'
import Image from 'next/image'
import useDialog from '@/hooks/useDialog'

export default function MenuStepper({children, step, nextStep, prevStep, order, table}: any) {
  const {DialogWindow, ask} = useDialog()

  return (
    <>
      <div className='stepper-buttons'>
        <button onClick={prevStep} disabled={step ? false : true}><Image src={arrowL} className='ico' alt="Back"/></button>
        {step < 1
          ? <button onClick={nextStep} disabled={order ? false : true}><Image className='ico' src={arrowR} alt="Next"/></button>
          : <button onClick={()=>ask(`Завершить заказ столика ${table}?`, ()=>alert("Sent"))} disabled={!table}><Image className='ico' src={check} alt="Next"/></button>
        }
      </div>
      <DialogWindow />
      {children?.[step]}
    </>
  )
}