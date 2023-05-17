import axios from "axios"

const api = "../../api/images"

export const imagesService = {
  async add(selectedFile: any){
    const formData = new FormData()
    formData.append("image", selectedFile)
    return await axios.post(api, formData)
  },
  async delete(photos: string[]){
    const response = await axios.delete(api + "?images=" + [photos])
    const result = await response.data
    return result
  }
}