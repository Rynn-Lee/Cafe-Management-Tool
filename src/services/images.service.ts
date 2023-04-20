import axios from "axios"

const api = {
  "images": {
    "delete": "../../api/images/delete"
  }
}

export const imagesService = {
  async delete(photos: string[]){
    const response = await axios.post(api.images.delete, {
        arr: photos
    })
    const result = await response.data
    return result
  }
}