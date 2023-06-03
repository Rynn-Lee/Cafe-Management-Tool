import Image from "next/image";
import editIco from "@icons/edit-white.svg"

export default function DishCost({setSetupStep, setupStep, info, setInfo, setDefaultValue, defaultValue}:any){
  return(
    <>
    <span className="title">Какая стоимость у блюда &quot;{info.name}&quot;?</span>
    <center><span className="hint">* Введите стоимость за количество в тенге</span></center>
    <div>
      <Image src={editIco} alt="ico" className="ico revert"/>
      <input value={info.cost} placeholder="Введите стоимость" onChange={(e) => setInfo({...info, cost: e.target.value})}/>
    </div>

    {info.cost 
    ? <><br/><center><span className="hint">* Выберите единицу измерения</span></center>
        <div>
          <Image src={editIco} alt="ico" className="ico revert"/>
          <select className='printer-select' onChange={(e)=>{setInfo({...info, weight: {...info.weight, value: e.target.value}}); setDefaultValue(e.target.value)}} value={defaultValue}>
            <option value={"шт"}>Штуки</option>
            <option value={"гр"}>Граммы</option>
            <option value={"кг"}>Килограммы</option>
          </select>
        </div>
        <br/>
        <center><span className="hint">* Выберите вес/количество за которое указана цена</span></center>
        <div>
          <Image src={editIco} alt="ico" className="ico revert"/>
          <input value={info.weight.amount} placeholder="Введите вес/количество" onChange={(e) => setInfo({...info, weight: {...info.weight, amount: e.target.value}})}/>
        </div>
      </>
    : ""}

    {info.weight.amount && info.weight.value && info.cost ? <button onClick={()=>setSetupStep(setupStep + 1)}>Продолжить</button> : ""}
  </>
  )
}