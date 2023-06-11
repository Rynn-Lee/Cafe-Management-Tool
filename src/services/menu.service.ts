import axios from "axios"
const api = "../../api/menu"
const params = {
  "id": "?_id=",
  "name": "?name=",
  "filter": "?filter="
}

export const menuService = {
  async add(data: any){
    const ingredients = data.ingredients.replace(/\s*,\s*/g, ",").split(',')
    const filtered = ingredients.map((item: any)=>item.charAt(0).toUpperCase() + item.slice(1))
    const response = await axios.post(api,{
        name: data.name,
        cost: data.cost,
        category: data.category,
        ingredients: filtered,
        available: data.available,
        filename: data.fileName,
        weight: data.weight
    })
    const result = await response.data
    return result
  },
  async deleteAll(){
    const response = await axios.delete(api)
    return response.data
  },
  async deleteDish(id: any){
    const response = await axios.delete(api + params.id + id)
    return response.data
  },
  async findMenu(filter?: any){
    let response
    filter
    ? response = await axios.post(api, {filter})
    : response = await axios.get(api)
    return await response.data
  },
  async changeVisibility(id: string, visibility: boolean){
    const response = await axios.put(api, {id, visibility})
    return response.data
  }
}