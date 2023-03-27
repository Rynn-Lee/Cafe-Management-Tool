import mongoose from "mongoose"

const api = {
  "users": {
    "add": "api/users/add",
    "find": "api/users/find",
    "findOne": "api/users/findOne?full_name="
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
        full_name: `emplyee${randomNum}`,
        password: `123${randomNum}`,
        hire_date:`12.12.${randomNum}`,
        email: `test${randomNum}@gmail.com`,
        job: `waiter`
      }),
    })
    const data = await res.json()
    return data
  },
  async getUsers(){
    const response = await fetch(api.users.find)
    const fetchedData = await response.json()
    console.log("From services: ", fetchedData)
    return fetchedData
  },
  async findUser(fio: string, password: string){
    console.log("Service called!")
    const response = await fetch(api.users.findOne + fio)
    console.log("USER INFO", await response.json())
  },
  checkLogin(){
    const response: any = sessionStorage.getItem("user");
    const result = JSON.parse(response)
    return result
  }
}