import type { NextApiRequest, NextApiResponse } from 'next'
import orders from '@/models/ordersModel'

type Data = { name: String }

export default async function printerApi(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    // if(req.method == "GET"){
    //   const result = await printers.find({})
    //   res.json(result as any)
    // }
    if(req.method == "POST"){
      const {order} = req.body 
      console.log("ORDERS: ", order)
      res.json(await orders.create(order))
    }
  } catch (error) {
      console.log(error)
      res.json(error as Data)
  }
}