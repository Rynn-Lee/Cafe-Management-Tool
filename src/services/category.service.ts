import axios from "axios"

const api = "../../api/categories"

const params = {
  id: "?_id="
}

export const categoryService = {
  async add(title: string){
    const response = await axios.post(api, {title})
    return await response.data
  },
  async remove(id: string){
    // console.log(id)
    const response = await axios.delete(api + params.id + id)
    return await response.data
  },
  async list(){
    const response = await axios.get(api)
    return await response.data
  }
}