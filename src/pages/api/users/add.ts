import type { NextApiRequest, NextApiResponse } from 'next'
import users from '@/models/userModel'

type Data = {
  name: String,
}

export default async function addUSer(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    const { full_name, password, hire_date, email, job} = req.body
    console.log(`Incoming request: Add new user - ${full_name}`)
    const userResult= await users.create(req.body)
    res.json(userResult)
  }
  catch(error){
    console.log(error)
    res.json(error as Data)
  }
}
