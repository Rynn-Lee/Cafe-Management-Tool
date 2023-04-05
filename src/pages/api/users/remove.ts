import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import users from '../../../models/userModel'

type Data = {
  name: String,
}

export default async function Remove(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const query = req.query;
    const name = query

    console.log("Connecting!")
    await connectDB()
    console.log("Searching for exact user!")
    const foundUser = await users.deleteMany({})

    res.json(foundUser as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
