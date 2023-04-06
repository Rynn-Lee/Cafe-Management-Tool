import { getDateNow } from '@/utils/getDate'
const md5 = require('md5')

const api = {
  "users": {
    "add": "../api/users/add",
    "find": "../api/users/find",
    "findOne": "../api/users/findUser?full_name=",
    "delete": "../api/users/remove"
  }
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
    const response: any = await fetch(api.users.findOne + fio)
    const result = await response.json()
    callAuth && result && this.auth(result, inputPassword)
    return result 
  },
  async auth(result: any, inputPassword: string){
    if(md5(inputPassword) == result.password){
      sessionStorage.setItem("username", JSON.stringify(result))
      return true
    }
    return false
  },
  async deleteAllUser(){
    const response = await fetch(api.users.delete,{
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
