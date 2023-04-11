import { getDateNow } from '@/utils/getDate'
const md5 = require('md5')

const api = {
  "users": {
    "add": "../../api/users/add",
    "find": "../../api/users/find",
    "findUser": "../../api/users/findUser",
    "removeAll": "../../api/users/remove",
    "removeOne": "../../api/users/removeOne"
  }
}

const params = {
  "id": "?_id=",
  "full_name": "?full_name="
}

export const accountService = {
  async addUser(){
    const randomNum = Math.floor(Math.random()*1000)
    const res = await fetch(api.users.add,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: `Сотрудник ${randomNum}`,
        password: md5(`123456`),
        hire_date: getDateNow(),
        email: `test${randomNum}@gmail.com`,
        job: `Официант`
      }),
    })
    const data = await res.json()
    return data
  },
  async getUsers(){
    const response = await fetch(api.users.find)
    const result = await response.json()
    return result
  },
  async findUser(fio: string, inputPassword: string, callAuth: boolean){
    const response: any = await fetch(api.users.findUser + params.full_name + fio)
    const result = await response.json()
    if(callAuth && result){
      const authResult = this.auth(result, inputPassword)
      if(authResult) return result
      return false
    }
  },
  async findUserById(id: string){
    const response: any = await fetch(api.users.findUser + params.id + id)
    const result = await response.json()
    return result 
  },
  auth(result: any, inputPassword: string){
    if(md5(inputPassword) == result.password){
      sessionStorage.setItem("username", JSON.stringify(result))
      return true
    }
    return false
  },
  async deleteAllUsers(){
    const response = await fetch(api.users.removeAll,{
      method: 'DELETE'
    })
    return response.json()
  },
  async deleteUser(id: string){
    const response = await fetch(api.users.removeOne + params.id + id,{
      method: 'DELETE'
    })
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
