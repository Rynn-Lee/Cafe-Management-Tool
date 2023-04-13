import { getDateNow } from '@/utils/getDate'
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
    const res = await fetch(api.users.add,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: data.full_name,
        password: md5(`123`),
        hire_date: getDateNow(),
        email: `example@gmail.com`,
        job: data.job
      }),
    })
    const response = await res.json()
    return response
  },
  async findUsers(fio: any = null, id: any = null, inputPassword: any = null){
    let query: any

    fio && (query = api.users.find + params.full_name + fio)
    id && (query = api.users.find + params.id + id)
    !fio && !id && (query = api.users.find)

    const response: any = await fetch(query)
    const result = await response.json()

    if(inputPassword && result){
      const authResult = this.auth(result, inputPassword)
      if(authResult) return result
      return false
    }
    if(!result){return[{}]}
    return result
  },
  auth(result: any, inputPassword: string){
    if(md5(inputPassword) == result.password){
      sessionStorage.setItem("username", JSON.stringify(result))
      return true
    }
    return false
  },
  async deleteUsers(id: any = null){
    let query: any
    id && (query = api.users.remove + params.id + id)
    !id && (query = api.users.remove)

    const response = await fetch(query,{method: 'DELETE'})
    return response.json()
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
