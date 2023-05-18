import type { NextApiRequest, NextApiResponse } from 'next'
import menu from '@/models/menuModel'

type Data = { name: String }

export default async function menuApi(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    if(req.method == "POST"){
      const {filter, ingredients} = req.body
      console.log(ingredients)
      filter
        ? res.json(await menu.find().where(filter) as any) 
        : res.json(await menu.create(req.body))
    }

    if(req.method == "GET"){
      const dish = req.query;
      dish.id
        ? res.json(await menu.findOne({'_id': dish.id}) as any)
        : res.json(await menu.find().sort({available: -1}) as any)
    }

    if(req.method == "DELETE"){
      const id = req.query;
      id._id
        ? res.json(await menu.deleteOne(id) as any)
        : res.json(await menu.deleteMany({}) as any)
    }
    
    if(req.method == "PUT"){
      const { id, visibility } = req.body
      res.json(await menu.updateOne(
        {'_id': id},
        {'available': visibility}) as any)
    }
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}