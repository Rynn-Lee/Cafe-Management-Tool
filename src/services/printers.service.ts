import axios from "axios"

const api = "/api/printers"
const printing = "/api/printingApi"

export const printersService = {
  async find(){
    const response = await axios.get(api)
    return response.data
  },
  async add(printer: any){
    const response = await axios.post(api, {printer})
    return response.data
  },
  async delete(id: any = null){
    const response = await axios.delete(`${api}/?id=${id}`, )
    return response.data
  },
  async patch(printer: string, data: any){
    const response = await axios.patch(api, {printer, data})
    return response.data
  },
  async printCheck(data: any){
    const response = await axios.post(printing, {data})
    return response.data
  },
  async isExisting(ip: string){
    const response = await axios.get(printing + "?ip=" + ip)
    return response.data
  },
  async createOrder(order: any, printers: any, orderID: string){
    let newArr: any = {}
    printers.map((printer: any)=>(
      printer.category.filter((printerCateg: any) => (
        order.cart.filter((dish: any)=>{
          if(printerCateg == dish.category){
            newArr[printer.name] 
              ? newArr[printer.name] = {...newArr[printer.name], order:[...newArr[printer.name].order, dish]}
              : newArr[printer.name] = {info: [printer][0], order:[dish], totalCost: order.totalCost, table: order.table}
          }
        })
      ))
    ))
    newArr.orderID = orderID
    const result = await this.printCheck(newArr)
    return result
  }
}