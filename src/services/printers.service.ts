import axios from "axios"

const api = "/api/printers"
const printing = "/api/printingApi"

export const printersService = {
  async find(){
    const response = await axios.get(api)
    return response.data
  },
  async add(printer: any){
    const response = await axios.post(api, {printer})
    return response.data
  },
  async delete(id: any = null){
    const response = await axios.delete(`${api}/?id=${id}`, )
    return response.data
  },
  async patch(printer: string, data: any){
    const response = await axios.patch(api, {printer, data})
    return response.data
  },
  async printCheck(info: any){
    const response = await axios.post(printing, {info})
    console.log(info)
    return response.data
  },
  async isExisting(ip: string){
    const response = await axios.get(printing + "?ip=" + ip)
    return response.data
  }
}