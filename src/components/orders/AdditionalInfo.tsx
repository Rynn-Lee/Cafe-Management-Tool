import { useEffect } from "react"
import { OrderList } from "./parts/OrderList"

export default function AdditionalInfo({selectedItem, removeOne, setStep, setOrder, order}: any) {

  const calcTotal = order.cart.reduce((acc: any, item: any)=> (item.cost * item.amount) + acc, 0)
  
  useEffect(()=>{
    setOrder({...order, totalCost: calcTotal})
    !order.cart.length && setStep(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcTotal, order.cart, setStep])

  return (
    <>
      <span className="total-cost">Общая цена: <span>{order.totalCost}</span> тг.</span>
        <div className="choose-table">
          <span>Дополнительная информация</span>
          <input placeholder="Введите номер столика" value={order.table} onChange={(e)=>setOrder({...order, table: e.target.value})} type="number"/>
        </div>
        <span>Выбранные блюда</span>
      <OrderList selectedItem={selectedItem} removeOne={removeOne} order={order}/>
    </>
  )
}