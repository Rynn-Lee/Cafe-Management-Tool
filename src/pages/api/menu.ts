import type { NextApiRequest, NextApiResponse } from 'next'
import menu from '@/models/menuModel'

type Data = {
  name: String,
}

export default async function addUSer(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    if(req.method == "POST"){
      const {name, available, filter} = req.body
      if(filter){
        console.log("Incoming request: Find dishes with filter", filter)
        const result = await menu.find().where(filter)
        res.json(result as unknown as Data)
      }
      else{
        console.log(`Incoming request: Add new dish - ${name} - AVA: ${available}`)
        const result = await menu.create(req.body)
        res.json(result)
      }
    }

    if(req.method == "GET"){
      const query = req.query;
      const dish: any = query.dish
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

    if(req.method == "DELETE"){
      const query = req.query;
      const id = query
      let result
      if(id._id){
        console.log(`Incoming request: Remove one dish - ${id._id}`)
        result = await menu.deleteOne(id)
      }
      else{
        console.log(`Incoming request: Remove ALL dishes`)
        result = await menu.deleteMany({})
      }
      res.json(result as unknown as Data)
    }
    
    if(req.method == "PUT"){
      const { id, visibility } = req.body
      console.log(`Incoming request: Update visibility - ${id}`)
      const result = await menu.updateOne({'_id': id}, {'available': visibility})
      res.json(result as unknown as Data)
    }
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}