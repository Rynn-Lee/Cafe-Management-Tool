import type { NextApiRequest, NextApiResponse } from 'next'
import menu from '@/models/menuModel'

type Data = {
  name: String,
}

export default async function RemoveMenu(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    console.log(`Incoming request: Remove ALL MENU`)
    const result = await menu.deleteMany({})

    res.json(result as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
