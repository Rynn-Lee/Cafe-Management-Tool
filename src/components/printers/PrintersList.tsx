import billIco from '@icons/bill.svg'
import Image from 'next/image'

export function PrintersList({printers}: any){
  return(
    <div className=''>
    {
      printers.data?.map((printer: any)=>(
        <fieldset key={printer._id} className='form p-2 !w-auto'>
          <legend><Image src={billIco} alt="bill" className='ico'/>{printer.name} - {printer.ip}</legend>
          {printer.category.map((el: any)=>(
            <span key={el}>{el}<br/></span>
          ))}
        </fieldset>
      ))
    }
      </div>
    )
}
    // printers.data?.map((printer: any)=>(
    //   <fieldset key={printer._id} className='form p-2 !w-auto'>
    //     <legend><Image src={billIco} alt="bill" className='ico'/>{printer.name} - {printer.ip}</legend>
    //     {printer.category.map((el: any)=>(
    //       <span key={el}>{el}<br/></span>
    //     ))}
    //   </fieldset>
    // ))