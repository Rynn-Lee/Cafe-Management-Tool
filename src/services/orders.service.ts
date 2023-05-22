export const ordersService = {
  async create(order: any, printers: any){
    let newArr: any = {}

    printers.map((printer: any)=>(
      printer.category.filter((printerCateg: any) => (
        order.cart.filter((dish: any)=>{
          if(printerCateg == dish.category){
            newArr[printer.name] 
              ? newArr[printer.name] = {...newArr[printer.name], order:[dish]}
              : newArr[printer.name] = {info: [printer][0], order:[dish]}
          }
        })
      ))
    ))
    console.log(newArr)
  }
}


// if(printerCateg == dish.category){
//   newArr[printer.name] 
//     ? newArr = {...newArr, [printer.name]: [...newArr[printer.name], dish]}
//     : newArr = {...newArr, [printer.name]: [dish]} 
// }