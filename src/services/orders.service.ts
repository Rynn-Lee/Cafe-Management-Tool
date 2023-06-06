import axios from "axios"

const api = "../../api/orders"

export const ordersService = {
  async createOrder(order: any){
    const response = await axios.post(api, {order})
    return response.data
  }
}