import { useEffect, useState } from "react"
import { OrderList } from "./parts/OrderList"

export default function AdditionalInfo({cart, selectedItem, removeOne, setStep}: any) {
  const [total, setTotal] = useState(0)

  const calcTotal = cart.reduce((acc: any, item: any)=> (item.cost * item.amount) + acc, 0)
  
  useEffect(()=>{
    setTotal(calcTotal)
    !cart.length && setStep(0)
  }, [calcTotal, cart, setStep])



  return (
    <>
      <span className="total-cost">Общая цена: <span>{total}</span> тг.</span>
    
      <OrderList selectedItem={selectedItem} removeOne={removeOne} cart={cart}/>
    </>
  )
}