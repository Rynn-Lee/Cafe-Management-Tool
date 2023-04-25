import type { NextApiRequest, NextApiResponse } from 'next'
import menu from '@/models/menuModel'

type Data = {
  name: String,
}

export default async function findMenu(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const { id, visibility } = req.body
    
    console.log(`Incoming request: Update visibility - ${id}`)
    const result = await menu.updateOne({'_id': id}, {'available': visibility})

    res.json(result as unknown as Data)
  }
  catch(error){
    console.log(error)
    return {
      notFound: true,
    };
  }
}
