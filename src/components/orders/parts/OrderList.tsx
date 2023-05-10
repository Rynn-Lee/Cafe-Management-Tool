import Image from "next/image";
import plusIco from '@icons/plus2.svg'
import minusIco from '@icons/minus2.svg'

export function OrderList ({selectedItem, removeOne, order}: any){
  return(
    <table className="additional-info-table">
      <thead>
        <tr>
          {removeOne ? <th>Убрать</th> : <th></th>}
          <th>Блюдо</th>
          <th>Количество</th>
          <th>Цена в общем</th>
          {selectedItem ? <th>Добавить</th> : <th></th>}
        </tr>
      </thead>
      <tbody>
      {order.cart.map((item: any)=>(
        <tr key={item._id}>
          {removeOne ? <td><Image src={minusIco} alt="plus" className="ico4" onClick={()=>removeOne(item._id)}/></td> : <td></td>}
          <td>{item.name}</td>
          <td>{item.amount}шт. ({item.cost}тг)</td>
          <td>{item.cost * item.amount}тг.</td>
          {selectedItem ? <td><Image src={plusIco} alt="plus" className="ico4" onClick={()=>selectedItem(item)}/></td> : <td></td>}
        </tr>
      ))}
      </tbody>
    </table>
  )
}