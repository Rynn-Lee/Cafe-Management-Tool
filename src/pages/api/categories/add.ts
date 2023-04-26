import type { NextApiRequest, NextApiResponse } from 'next'
import category from '@/models/categoryModel'

type Data = {
  name: String,
}

export default async function addUSer(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const { title } = req.body
    console.log(`Incoming request: Add new category - ${title}`)
    const result = await category.create(req.body)
    res.json(result)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}