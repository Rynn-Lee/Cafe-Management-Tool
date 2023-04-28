import type { NextApiRequest, NextApiResponse } from 'next'
import category from '@/models/categoryModel'

type Data = {
  name: String,
}

export default async function RemoveMenu(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
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
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
