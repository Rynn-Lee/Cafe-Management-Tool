import Image from "next/image";

export default function OrderCard({order}: any){
  return(
    <div className="order-card">
      <div className="images">
        {order.cart.map((item: any, index: number) => index < 4 ? <Image key={index} src={`/images/${item.filename}`} className="fill-img" alt="dish" width={200} height={200}/> : "")}
      </div>
      <div className="order-card-body">
        <span>Заказ: {order.orderID}</span><br/>
        <span>{order.date}</span>
      </div>
    </div>
  )
}
