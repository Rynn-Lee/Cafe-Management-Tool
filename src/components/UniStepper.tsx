export default function UniStepper({children, setupStep, setSetupStep, setIsSetup, dish}: any){

  return(
  <div className="unistepper">
    <div className="unistepper-steps">
      {
        !dish
        ? setupStep > 0
          ? <button onClick={()=>setSetupStep(setupStep - 1)} disabled={setupStep == 0 }>Назад</button>
          : <button onClick={()=>setIsSetup(0)}>Отменить</button>
        : <button onClick={()=>setSetupStep(setupStep - 1)} disabled={setupStep == 0 }>Назад</button>
      }
      
      {children?.map((item: any, index: number) => <span key={index} className={`${setupStep > index ? "passed-step" : ""}` + `${setupStep == index ? 'active-step' : ""}`}/>)} 
    </div>
    <div className="unistepper-containter">
      {children?.[setupStep]}
    </div>
  </div>
  )
}