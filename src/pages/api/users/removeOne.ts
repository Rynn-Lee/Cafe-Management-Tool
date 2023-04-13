import type { NextApiRequest, NextApiResponse } from 'next'
import users from '@/models/userModel'

type Data = {
  name: String,
}

export default async function RemoveOne(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const query = req.query;
    const id = query
    console.log(`Incoming request: Remove one user - ${id._id}`)
    const foundUser = await users.deleteOne(id)
    res.json(foundUser as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
