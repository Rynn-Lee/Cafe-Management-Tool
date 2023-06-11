import Image from "next/image";
import editIco from "@icons/code.svg"
import checkIco from "@icons/check-green.svg"
import errorIco from "@icons/error-red.svg"
import loading from "@icons/infinity-loading.svg"
import { services } from "@/services";

export default function PrinterSysInfo({newPrinter, setNewPrinter, setSetupStep, setupStep}:any){

  const checkPrinter: any = async(ip: string) => {
    setNewPrinter({...newPrinter, info:{alive: false, message: ""}})
    setNewPrinter({...newPrinter, info: await services.printers.isExisting(ip)})
  }

  const testPrinting: any = async() => await services.printers.printCheck({ip: newPrinter.ip, test: true, method: newPrinter.method})

  return(
    <>
    <span className="title">Укажите информацию для подключения</span>
    <span className="hint">* Укажите ip адресс, он необходим для подключения к принтеру по сети</span>
    <div>
      <Image src={editIco} alt="ico" className="ico3 iconotop"/>
      <input placeholder='Введите ip адрес' value={newPrinter.ip} onChange={(e)=>setNewPrinter({...newPrinter, ip: e.target.value})}/>
      {newPrinter.ip
      ? <button onClick={()=>checkPrinter(newPrinter.ip)} className="service-buttons">Проверить</button>
      : ""
      }
    </div>
    <span className="status hint">
      {!newPrinter.info?.message && !newPrinter.info?.alive && <Image src={loading} alt="ico4" className="ico"/>}
      {newPrinter.info?.message && <><Image src={newPrinter.info?.alive ?  checkIco : errorIco} alt="ico" className="ico revert"/> {newPrinter.info?.message}</>}
    </span>
    <br />

    {newPrinter.info?.alive && newPrinter.info?.message ?
    <>
      <span className="hint">* Проверьте работу</span>
      <span className="hint">* Если принтер не печатает или не отрезает чек, попробуйте другой метод</span>
      <span className="hint">* Если принтер работает, нажмите продолжить</span>

      <div>
        <label>Метод:  </label>
        <select className="printer-select" onChange={(e)=>setNewPrinter({...newPrinter, method: e.target.value})}>
          <option>EPSON</option>
          <option>STAR</option>
        </select>
        <button onClick={testPrinting} className="service-buttons2">Тест</button>
      </div>

      <button onClick={()=>setSetupStep(setupStep + 1)}>Продолжить</button>

    </> : ""}
  </>
  )
}