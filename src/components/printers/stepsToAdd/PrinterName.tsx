import Image from "next/image";
import editIco from "@icons/list.svg"

export default function PrinterName({newPrinter, setNewPrinter, setSetupStep, setupStep}: any){
  return(
  <>
    <span className="title">Как будет называться принтер?</span>
    <span className="hint">* По названию можно будет определить к какой кухне он относится <br />
    Не стоит использовать не подходящие по смыслу названия</span>
    <div>
      <Image src={editIco} alt="ico" className="ico3 iconotop"/>
      <input placeholder='Введите Название' value={newPrinter.name} onChange={(e)=>setNewPrinter({...newPrinter, name: e.target.value})}/>
    </div>
    {newPrinter.name
      ? <button onClick={()=>setSetupStep(setupStep + 1)}>Далее</button>
      :""
    }
  </>
  )
}