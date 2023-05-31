export default function UniStepper({children, setupStep, setSetupStep}: any){
  return(
  <div className="unistepper">
    <div className="unistepper-steps">
      <button onClick={()=>setSetupStep(setupStep - 1)} disabled={setupStep <= 0}>Отменить</button>
      {children.map((item: any, index: number) => <><span className={`${setupStep > index ? "passed-step" : ""}` + `${setupStep == index ? 'active-step' : ""}`}/></>)}
      {children.length-1 !== setupStep
      ? <button onClick={()=>setSetupStep(setupStep + 1)}>Далее</button>
      : <button>Завершить</button>
      }
    </div>
    <div>
      {children?.[setupStep]}
    </div>
  </div>
  )
}