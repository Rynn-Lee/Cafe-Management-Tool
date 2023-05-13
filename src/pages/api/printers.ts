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
      if(!name || !category || !ip){
        console.log(`Недостаточно аргументов для добавления принтера - отмена | name: ${name} - categories: ${category} - ip: ${ip}`)
        res.send({response: "Недостаточно аргументов для добавления принтера - отмена"} as unknown as Data)
        return
      }
      console.log(`Добавление нового принтера: "${name}" для категории "${category}" c адресом "${ip}"`)
      const result = await printers.create(req.body)
      res.json(result as unknown as Data)
    }
    if(req.method == "DELETE"){
      const {_id} = req.body 
      let result
      if(!_id){
        console.log(`Удаление ВСЕХ принтеров`)
        result = await printers.deleteMany()
      }
      else{
        console.log(`Удаление принтера: "${_id}"`)
        result = await printers.deleteOne({_id})
      }
      res.json(result as unknown as Data)
    }
  } catch (error) {
      console.log(error)
      res.json(error as Data)
  }

  // try{
  //   const { full_name, password, hire_date, email, job} = req.body
  //   const userResult= await printers.create(req.body)
  //   res.json(userResult)
  // }
  // catch(error){
  //   console.log(error)
  //   res.json(error as Data)
  // }
}