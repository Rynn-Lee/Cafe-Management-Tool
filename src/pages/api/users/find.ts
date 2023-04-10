import type { NextApiRequest, NextApiResponse } from 'next'
import users from '@/models/userModel'

type Data = {
  name: String,
}

export default async function addUser(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
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
