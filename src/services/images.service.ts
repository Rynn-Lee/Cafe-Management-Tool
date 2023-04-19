const api = {
  "images": {
    "delete": "../../api/images/delete"
  }
}

export const imagesService = {
  async delete(photos: string[]){
    const result = await fetch(api.images.delete, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        arr: photos
      }),
    })
    const response = await result.json()
    return response
  }
}