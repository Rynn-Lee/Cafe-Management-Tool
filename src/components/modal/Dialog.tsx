import exclamIco from '@icons/triangle-excl.svg'
import Image from 'next/image'

export default function Dialog({message, confirmDialog}:any) {
  if(!message){
    return null
  }


  return (
    <div className="modal-window">
      <span className="modal-title"><Image src={exclamIco} alt="!" className='ico2'/>Подтвердите ваше действие<Image src={exclamIco} alt="!" className='ico2'/></span>
      <hr/>- {message} -<hr/>
      <div>
        <button className="accept" onClick={()=>confirmDialog(true)}>Подтвердить</button>
        <button className="decline" onClick={()=>confirmDialog(false)}>Отменить</button>
      </div>
    </div>
  )
}