import arrowR from '@icons/arrow-R.svg'
import arrowL from '@icons/arrow-L.svg'
import check from '@icons/check.svg'
import Image from 'next/image'

export default function MenuStepper({children, step, nextStep, prevStep, cart}: any) {
  return (
    <>
      {cart ? <div className='stepper-buttons'>
        <button onClick={prevStep} disabled={step ? false : true}><Image src={arrowL} className='ico' alt="Back"/></button>
        {step < 2
          ? <button onClick={nextStep} disabled={step < 2 && cart ? false : true}><Image className='ico' src={arrowR} alt="Next"/></button>
          : <button onClick={nextStep} disabled={step < 2 && cart}><Image className='ico' src={check} alt="Next"/></button>
        }
      </div> : ""}
      {children?.[step]}
    </>
  )
}