import { getDateNow } from '@/utils/getDate'
import axios from 'axios'
const md5 = require('md5')

const api = {
  "users": {
    "add": "../../api/users/add",
    "find": "../../api/users/find",
    "remove": "../../api/users/remove"
  }
}

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
    const response = await axios.post(api.users.add,{
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

    fio && (query = api.users.find + params.full_name + fio)
    id && (query = api.users.find + params.id + id)
    !fio && !id && (query = api.users.find)

    const response: any = await axios.get(query)
    const result = await response.data

    if(auth){
      const authResult = this.auth(result, inputPassword)
      if(authResult) return result
      throw new Error("Пароль не верный")
    }
    if(!result && auth){return[{}]}
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
    id && (query = api.users.remove + params.id + id)
    !id && (query = api.users.remove)

    const response = await axios.delete(query)
    return response.data
  },
  unauth(){
    sessionStorage.removeItem("username")
    console.log("Logged out!")
  },
  checkLogin(){
    const response: any = sessionStorage.getItem("username");
    return JSON.parse(response)
  }
}
