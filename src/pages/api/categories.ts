import type { NextApiRequest, NextApiResponse } from 'next'
import category from '@/models/categoryModel'

type Data = {
  name: String,
}

export default async function addUSer(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    if(req.method == "POST"){
      const { title } = req.body
      console.log(`Incoming request: Add new category - ${title}`)
      const result = await category.create(req.body)
      res.json(result)
    }
    if(req.method == "GET"){
      console.log(`Incoming request: List all available categories`)
      const result = await category.find()
      res.json(result as unknown as Data)
    }
    if(req.method == "DELETE"){
      const query = req.query;
      const id = query
      let result
      if(id._id){
        console.log(`Incoming request: Remove one category - ${id._id}`)
        result = await category.deleteOne(id)
      }
      else{
        console.log(`Incoming request: Remove ALL categories`)
        result = await category.deleteMany({})
      }
      res.json(result as unknown as Data)
    }
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}