import type { NextApiRequest, NextApiResponse } from 'next'
import orders from '@/models/ordersModel'

type Data = { name: String }

export default async function ordersApi(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    if(req.method == "GET"){
      const filter: any = req.query.filter;
      const query = JSON.parse(filter)
      const result = await orders.find(query)
      res.json(result as any)
    }
    if(req.method == "POST"){
      const {order} = req.body 
      res.json(await orders.create(order))
    }
    if(req.method == "DELETE"){
      const id: any = req.query.id;
      const result = await orders.deleteOne({"_id": id})
      res.json(result as any)
    }
  } catch (error) {
      console.log(error)
      res.json(error as Data)
  }
}