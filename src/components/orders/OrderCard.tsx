import Image from "next/image";
import calendarIco from '@icons/calendar.svg'
import userIco from '@icons/user-white.svg'
import listIco from '@icons/list-white.svg'
import tableIco from '@icons/table.svg'
import coinIco from '@icons/coin.svg'

export default function OrderCard({order}: any){
  return(
    <div className="order-card">
      <div className={`images ${order.cart.length == 1 ? "onepic" : ""}`}>
        {order.cart.map((item: any, index: number) => index < 4 ? <Image key={index} src={`/images/${item.filename}`} className="fill-img" alt="dish" width={200} height={200}/> : "")}
      </div>
      <div className="order-card-body">
        <table>
          <tbody>
            <tr>
              <td><Image src={calendarIco} alt="calendar" width={20} height={20}/></td>
              <td>{order.date}</td>
            </tr>
            <tr>
              <td><Image src={coinIco} alt="calendar" width={20} height={20}/></td>
              <td>{order.totalCost}тг.</td>
            </tr>
            <tr>
              <td><Image src={tableIco} alt="user" width={20} height={20}/></td>
              <td>№{order.table}</td>
            </tr>
            <tr>
              <td><Image src={userIco} alt="user" width={20} height={20}/></td>
              <td>{order.waiter.full_name}</td>
            </tr>
            <tr>
              <td><Image src={listIco} alt="user" width={20} height={20}/></td>
              <td>{order.orderID}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
