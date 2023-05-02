import type { NextApiRequest, NextApiResponse } from 'next'
import menu from '@/models/menuModel'

type Data = {
  name: String,
}

export default async function findMenu(req: NextApiRequest, res: NextApiResponse<Data>){
    if(req.method  == "GET"){
      console.log(req.method)
      const query = req.query;
      const dish = query
      let result
      
      if(dish.id){
        console.log(`Incoming request: Find one dish - ${dish.id}`)
        result = await menu.findOne({'_id': dish.id})
      }
      else{
        console.log(`Incoming request: Find ALL dishes`)
        result = await menu.find().sort({available: -1})
      }
      res.json(result as unknown as Data)
    }
    else{
      const { filter } = req.body;
      const result = menu.find({filter})
      res.json(result as unknown as Data)
    }
}
