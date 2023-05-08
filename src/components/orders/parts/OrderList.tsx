import Image from "next/image";
import plusIco from '@icons/plus2.svg'
import minusIco from '@icons/minus2.svg'

export function OrderList ({selectedItem, removeOne, cart}: any){
  return(
    <table className="additional-info-table">
      <thead>
        <tr>
          <th>Действия</th>
          <th>Блюдо</th>
          <th>Количество</th>
          <th>Цена в общем</th>
        </tr>
      </thead>
      <tbody>
      {cart.map((item: any)=>(
        <tr key={item._id}>
          <td>
            <Image src={minusIco} alt="plus" className="ico4" onClick={()=>removeOne(item._id)}/>
            <Image src={plusIco} alt="plus" className="ico4" onClick={()=>selectedItem(item)}/>
          </td>
          <td>{item.name}</td>
          <td>x{item.amount} ({item.cost}тг)</td>
          <td>{item.cost * item.amount}тг.</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}