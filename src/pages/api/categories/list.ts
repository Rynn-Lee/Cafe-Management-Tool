import type { NextApiRequest, NextApiResponse } from 'next'
import category from '@/models/categoryModel'

type Data = {
  name: String,
}

export default async function addUSer(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    console.log(`Incoming request: List all available categories`)
    const result = await category.find()
    res.json(result as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}