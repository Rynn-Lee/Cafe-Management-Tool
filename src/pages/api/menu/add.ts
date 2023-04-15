import type { NextApiRequest, NextApiResponse } from 'next'
import menu from '@/models/menuModel'

type Data = {
  name: String,
}

export default async function addUSer(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const { name, cost, category, description, filename} = req.body
    console.log(`Incoming request: Add new dish - ${name}`)
    const result = await menu.create(req.body)
    res.json(result)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}