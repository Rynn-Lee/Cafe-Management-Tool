import axios from "axios"

const api = "/api/printers"
const printing = "/api/printingApi"

export const printersService = {
  async find(){
    const response = await axios.get(api)
    return response.data
  },
  async add(newPrinter: any, printerCategories: any){
    const response = await axios.post(api, {name: newPrinter.name, category: printerCategories, ip: newPrinter.ip})
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
  async printCheck(text: string){
    const response = await axios.post(printing, {text})
    return response.data
  }
}