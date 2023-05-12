import axios from "axios"

const api = "/api/printers"

export const printersService = {
  async find(){
    const response = await axios.get(api)
    return response.data
  },
  async add(name: string, category: string[], ip: string){
    console.log(name, category, ip)
  },
}