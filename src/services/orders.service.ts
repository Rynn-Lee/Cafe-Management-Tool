import axios from "axios"

const api = "../../api/orders"

export const ordersService = {
  async createOrder(order: any, additionalInfo: any){
    console.log("order: ", order)
    order.orderID = additionalInfo.orderID
    order.date = additionalInfo.date
    const response = await axios.post(api, {order})
    return response.data
  },
  async getOrders(filter: any){
    const response = filter
    ? await axios.get(api + "?filter=" + JSON.stringify(filter))
    : await axios.get(api)
    return response.data
  }
}