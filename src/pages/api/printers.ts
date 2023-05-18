import type { NextApiRequest, NextApiResponse } from 'next'
import printers from '@/models/printersModel'

type Data = { name: String }

export default async function printerApi(req: NextApiRequest, res: NextApiResponse<Data>){
  try{
    
    if(req.method == "GET"){
      const result = await printers.find({})
      res.json(result as any)
    }

    if(req.method == "POST"){
      const {name, ip} = req.body 
      name || ip
        ? res.json(await printers.create(req.body))
        : res.send({response: "Недостаточно аргументов для добавления принтера - отмена"} as any)
    }

    if(req.method == "DELETE"){
      const id = req.query;
      id
        ? res.json(await printers.deleteOne({_id: id.id}) as any)
        : res.json(await printers.deleteMany() as any)
    }

    if(req.method == "PATCH"){
      const {printer, data} = req.body
      res.json(await printers.updateOne({_id: printer}, data) as any)
    }
    
  } catch (error) {
      console.log(error)
      res.json(error as Data)
  }
}