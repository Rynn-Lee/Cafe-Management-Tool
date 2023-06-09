import axios from "axios"

const api = "../../api/orders"

export const ordersService = {
  async createOrder(order: any, orderID: any){
    order.orderID = orderID
    const response = await axios.post(api, {order})
    return response.data
  },
  async getOrders(filter: any){
    console.log("Called!")
    console.log(filter)
    const response = filter
    ? await axios.get(api + "?filter=" + JSON.stringify(filter))
    : await axios.get(api)
    return response.data
  }
}