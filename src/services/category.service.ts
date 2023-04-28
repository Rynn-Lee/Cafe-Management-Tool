import axios from "axios"

const api = {
  add: "../../api/categories/add",
  remove: "../../api/categories/remove",
  list: "../../api/categories/list"
}

const params = {
  id: "?_id="
}

export const categoryService = {
  async add(title: string){
    const response = await axios.post(api.add, {title})
    return await response.data
  },
  async remove(id: string){
    // console.log(id)
    const response = await axios.delete(api.remove + params.id + id)
    return await response.data
  },
  async list(){
    const response = await axios.get(api.list)
    return await response.data
  }
}