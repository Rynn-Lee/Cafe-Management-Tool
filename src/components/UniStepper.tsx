export default function UniStepper({children, setupStep, setSetupStep, setIsSetup}: any){
  return(
  <div className="unistepper">
    <div className="unistepper-steps">
      {setupStep !== 0
      ? <button onClick={()=>setSetupStep(setupStep - 1)}>Назад</button>
      : <button onClick={()=>setIsSetup(0)}>Отменить</button>
      }
      
      {children.map((item: any, index: number) => <span key={index} className={`${setupStep > index ? "passed-step" : ""}` + `${setupStep == index ? 'active-step' : ""}`}/>)}
      {/* {children.length-1 !== setupStep
      ? <button onClick={()=>setSetupStep(setupStep + 1)}>Далее</button>
      : <button>Завершить</button>
      } */}
    </div>
    <div className="unistepper-containter">
      {children?.[setupStep]}
    </div>
  </div>
  )
}