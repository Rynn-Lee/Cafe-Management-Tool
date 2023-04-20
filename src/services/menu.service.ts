import axios from "axios"

const api = {
  "menu": {
    "add": "../../api/menu/add",
    "find": "../../api/menu/find",
    "remove": "../../api/menu/remove",
  }
}
const params = {
  "id": "?_id=",
  "name": "?name="
}
export const menuService = {
  async add(data: any){
    const response = await axios.post(api.menu.add,{
        name: data.name,
        cost: data.cost,
        category: data.category,
        description: data.description,
        available: data.available,
        filename: data.fileName
    })
    const result = await response.data
    return result
  },
  async deleteAll(){
    const response = await axios.delete(api.menu.remove)
    return response.data
  },
  async deleteDish(id: any){
    const response = await axios.delete(api.menu.remove + params.id + id)
    return response.data
  },
  async findMenu(){
    const response = await axios.get(api.menu.find)
    return response.data
  }
}