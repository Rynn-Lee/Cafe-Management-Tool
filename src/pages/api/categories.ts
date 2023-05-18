import type { NextApiRequest, NextApiResponse } from 'next'
import category from '@/models/categoryModel'

type Data = {name: String}

export default async function categoriesApi(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    if(req.method == "POST") res.json(await category.create(req.body))
    if(req.method == "GET")  res.json(await category.find() as unknown as Data)
    if(req.method == "DELETE"){
      const id = req.query;
      id._id
        ? res.json(await category.deleteOne(id) as any)
        : res.json(await category.deleteMany({}) as any)
    }
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
