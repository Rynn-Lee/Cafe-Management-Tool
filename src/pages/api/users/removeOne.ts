import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import users from '../../../models/userModel'

type Data = {
  name: String,
}

export default async function RemoveOne(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const query = req.query;
    const id = query

    await connectDB()
    console.log("---------------------ID--------------------", id)
    const foundUser = await users.deleteOne(id)
    console.log("Removed!")

    res.json(foundUser as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
