import Image from "next/image";
import editIco from "@icons/edit-white.svg"

export default function DishName({setSetupStep, setupStep, info, setInfo}:any){
  return(
    <>
    <span className="title">Как будет называться блюдо?</span>
    <center><span className="hint">* Введите отображаемое название блюда</span></center>
    
    <div>
      <Image src={editIco} alt="ico" className="ico revert"/>
      <input value={info?.name} placeholder="Введите название" onChange={(e) => setInfo({...info, name: e.target.value})}/>
    </div>

    {info?.name ? <button onClick={()=>setSetupStep(setupStep + 1)}>Продолжить</button> : ""}
  </>
  )
}