import users from '@/models/userModel';
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/lib/mongodb'

type Data = {
  name: String,
}

export default async function addUser(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    await connectDB()
    console.log("Finding!")
    const foundUsers = await users.find({})

    res.json(foundUsers as unknown as Data)
  }
  catch(error){
    console.log(error)
    return {
      notFound: true,
    };
  }
}
