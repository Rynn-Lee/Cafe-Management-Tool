import type { NextApiRequest, NextApiResponse } from 'next'
import printers from '@/models/printersModel'

type Data = {
  name: String,
}

export default async function printerApi(req: NextApiRequest, res: NextApiResponse<Data>){
  try{

    if(req.method == "GET"){
      const result = await printers.find({})
      console.log(`Получение всех принтеров`)
      res.json(result as unknown as Data)
    }

    if(req.method == "POST"){
      const {name, category, ip} = req.body 
      if(!name || !ip){
        console.log(`Недостаточно аргументов для добавления принтера - отмена | name: ${name} - categories: ${category} - ip: ${ip}`)
        res.send({response: "Недостаточно аргументов для добавления принтера - отмена"} as unknown as Data)
        return
      }
      console.log(`Добавление нового принтера: "${name}" для категории "${category}" c адресом "${ip}"`)
      const result = await printers.create(req.body)
      res.json(result as unknown as Data)
    }

    if(req.method == "DELETE"){
      const query = req.query;
      const id = query
      let result
      if(!id){
        console.log(`Удаление ВСЕХ принтеров`)
        result = await printers.deleteMany()
      }
      else{
        console.log(`Удаление принтера: "${id.id}"`)
        result = await printers.deleteOne({_id: id.id})
      }
      res.json(result as unknown as Data)
    }
    if(req.method == "PATCH"){
      const {printer, data} = req.body
      console.log(`Обновление принтера ${printer} - `, data)
      const result = await printers.updateOne({_id: printer}, data)
      res.json(result as unknown as Data)
    }
    
  } catch (error) {
      console.log(error)
      res.json(error as Data)
  }
}