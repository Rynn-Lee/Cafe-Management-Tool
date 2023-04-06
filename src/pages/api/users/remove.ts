import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'
import users from '../../../models/userModel'

type Data = {
  name: String,
}

export default async function Remove(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    await connectDB()
    console.log("Removed!")
    const foundUser = await users.deleteMany({})

    res.json(foundUser as unknown as Data)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
