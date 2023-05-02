import axios from "axios"

const api = {
  "menu": {
    "add": "../../api/menu/add",
    "find": "../../api/menu/find",
    "remove": "../../api/menu/remove",
    "visibility": "../../api/menu/visibility",
  }
}
const params = {
  "id": "?_id=",
  "name": "?name=",
  "filter": "?filter="
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
  async findMenu(filter?: any){
    let response
    filter
    ? response = await axios.post(api.menu.find, {filter})
    : response = await axios.get(api.menu.find)
    return await response.data
  },
  async changeVisibility(id: string, visibility: boolean){
    console.log("VIS: ", visibility)
    const response = await axios.post(api.menu.visibility, {id, visibility})
    return response.data
  }
}