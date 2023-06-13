import { getDateNow } from '@/utils/getDate'
import axios from 'axios'
const md5 = require('md5')

const api = "../../api/users"

const params = {
  "id": "?_id=",
  "full_name": "?full_name="
}

interface data{
  full_name: string,
  job: string
}

export const accountService = {
  async addUser(data: data){
    const response = await axios.post(api,{
        full_name: data.full_name,
        password: md5(`123`),
        hire_date: getDateNow(),
        email: `example@gmail.com`,
        job: data.job
      })
    const result = await response.data
    return result
  },
  async findUsers(fio: any = null, id: any = null, inputPassword: any = null, auth: boolean = false){
    let query: any
    console.log("Find users")
    fio && (query = api + params.full_name + fio)
    id && (query = api + params.id + id)
    !fio && !id && (query = api)

    const response: any = await axios.get(query)
    const result = await response.data

    if(!result && auth){throw new Error("Пользователь не найден")}

    if(auth){
      const authResult = this.auth(result, inputPassword)
      if(authResult) return result
      throw new Error("Пароль не верный")
    }
    
    return result
  },
  auth(result: any, inputPassword: string){
    if(md5(inputPassword) == result.password){
      sessionStorage.setItem("username", JSON.stringify(result))
      return true
    }
    throw new Error("Пароль неверный")
  },
  async deleteUsers(id: any = null){
    let query: any
    id && (query = api + params.id + id)
    !id && (query = api)

    const response = await axios.delete(query)
    return response.data
  },
  unauth(){
    sessionStorage.removeItem("username")
  },
  checkLogin(){
    const response: any = sessionStorage.getItem("username");
    return JSON.parse(response)
  }
}
