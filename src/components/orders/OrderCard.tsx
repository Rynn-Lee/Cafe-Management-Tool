import Image from "next/image";

export default function OrderCard({order}: any){
  return(
    <div className="order-card">
      <div className="images">
        <Image src={`/images/${order.cart[0]?.filename}`} className="fill-img" alt="dish" width={200} height={200}/>
      </div>
      <div className="order-card-body">
        <span>Заказ: {order.orderID}</span><br/>
        <span>{order.date}</span>
      </div>
    </div>
  )
}
