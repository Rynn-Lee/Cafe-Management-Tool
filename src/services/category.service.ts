import axios from "axios"

const api = {
  add: "../../api/categories/add",
  list: "../../api/categories/list"
}

export const categoryService = {
  async add(title: string){
    console.log("services: ", title)
    const response = await axios.post(api.add, {title})
    return await response.data
  },
  async list(){
    const response = await axios.get(api.list)
    return await response.data
  }
}