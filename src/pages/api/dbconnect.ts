import connectDB from '@/lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { DBresponse: string }

export default function dbConnection(req: NextApiRequest,res: NextApiResponse<Data>){
  connectDB()
  res.status(200).json({ DBresponse: 'Lemmi sleep! What do you want???' })
}
