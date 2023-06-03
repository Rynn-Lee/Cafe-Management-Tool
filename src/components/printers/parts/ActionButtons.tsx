import Image from "next/image";
import billIco from '@icons/bill.svg'
import arrowR from '@icons/arrow-r.svg'
import arrowL from '@icons/arrow-l.svg'
import check from '@icons/check-green.svg'
import deleteIco from '@icons/trash-red.svg'
import reset from '@icons/reset.svg'

export function ActionButtons({prevPage, nextPage, page, ask, removePrinter, printers, printer, edited, resetEdit, editPrinterInfo}: any){
  return(
    <legend>

      <button onClick={prevPage}>
        <Image src={arrowL} alt="left" className='ico3 revert'/>
      </button>

      <span>
        <Image src={billIco} alt="bill" className='ico'/>{page+1}/{printers.data?.length} | {printer?.name}
      </span>
      <div>
      {edited ? <>
        <button className='save' onClick={()=>ask(`Сохранить изменения для принтера "${printer?.name}"?`, ()=>editPrinterInfo(printer, {name: printer.name, ip: printer.ip, method: printer.method}))}>
          <Image src={check} alt="edit" className='ico3 revert' />
        </button>
        <button className='reset' onClick={()=>ask(`Восстановить предыдущие настройки?`, resetEdit)}>
          <Image src={reset} alt="reset" className='ico4'/>
        </button>
      </>: ""}

      <button className='remove' onClick={()=>ask(`Удалить принтер "${printer?.name}"? \n Занятые им категории будут освобождены`, ()=>removePrinter(printer._id))}>
        <Image src={deleteIco} alt="right" className='ico3 revert'/>
      </button>

      <button onClick={nextPage}>
        <Image src={arrowR} alt="right" className='ico3 revert'/>
      </button>
      </div>
    </legend>
  )
}