import exclamIco from '@icons/triangle-excl.svg'
import Image from 'next/image'

export default function Dialog({message, confirmDialog, window}:any) {
  if(!message){
    return null
  }

  console.log("window: ", window)

  return (
    <div className="modal-window">
      <span className="modal-title">
        <Image src={exclamIco} alt="!" className='ico2'/>
        {window == "error" ? "Произошла ошибка!" : ""}
        {window == "info" ? "Информация!" : ""}
        {window == "description" ? "Описание блюда" : ""}
        {!window ? "Подтвердите ваше действие" : ""} 
        <Image src={exclamIco} alt="!" className='ico2'/>
      </span>
      {window != "description" ? 
      <><hr/>- {message} -<hr/></>
      :
      <table className='dialogTable'>
        <tbody>
          <tr>
            <td>Название</td>
            <td>{message.name}</td>
          </tr>
          <tr>
            <td>Категория</td>
            <td>{message.category}</td>
          </tr>
          <tr>
            <td>Состав</td>
            <td>{message.ingredients.map((item: any, index: number) => (
              index == message.ingredients.length-1 ? item : item + ", "
            ))}
            </td>
          </tr>
          <tr>
            <td>Стоимость за одну порцию</td>
            <td>{message.cost}тг.</td>
          </tr>
        </tbody>
      </table>
      }
      
      {window 
      ? <div><button className="accept" onClick={()=>confirmDialog(false)}>Понятно</button></div>
      :
        <div>
          <button className="accept" onClick={()=>confirmDialog(true)}>Подтвердить</button>
          <button className="decline" onClick={()=>confirmDialog(false)}>Отменить</button>
        </div>
      }
    </div>
  )
}