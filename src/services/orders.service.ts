import {services} from "./index"

export const ordersService = {
  async create(order: any, printers: any){
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
    const result = await services.printers.printCheck(newArr)
    console.log("COMPLETE: ", newArr)
    return result
  }
}