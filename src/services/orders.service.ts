import axios from "axios"

const api = "../../api/orders"

export const ordersService = {
  async createOrder(order: any, additionalInfo: any){
    order = {...order, ...additionalInfo}
    const response = await axios.post(api, {order})
    // if(!response.data){throw new Error("No data returned!")}
    return response.data
  },
  async getOrders(filter: any){
    const response = filter
    ? await axios.get(api + "?filter=" + JSON.stringify(filter))
    : await axios.get(api)
    if(!response.data){throw new Error("No data returned!")}
    return response.data
  },
  async deleteOrder(id: string){
    console.log("DELETE", id)
    const response = await axios.delete(api + "?id=" + id)
    if(!response.data){throw new Error("No data returned!")}
    return response.data
  },
  async finishOrder(order: any){
    console.log("Finishorder", order)
    return true
  }
}