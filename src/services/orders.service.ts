export const ordersService = {
  async create(order: any, printers: any){
    let newArr: any = {}
    console.log("SERVICE order: ",order)
    console.log("SERVICE printer: ",printers)

    const result = printers.map((printer: any)=>(
      printer.category.filter((printerCateg: any) => (
        order.cart.filter((dish: any)=>{
          if(printerCateg == dish.category){
            let priname = printer.name
            console.log(priname,{dish})
            !newArr[priname] ? {...newArr, priname: dish} : {...newArr[priname], dish}
          }
        })
      ))
    ))



    console.log(newArr)
  }
}