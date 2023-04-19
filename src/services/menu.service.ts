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
    const res = await fetch(api.menu.add,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        cost: data.cost,
        category: data.category,
        description: data.description,
        available: data.available,
        filename: data.fileName
      }),
    })
    const response = await res.json()
    return response
  },
  async deleteAll(){
    const response = await fetch(api.menu.remove,{method: 'DELETE'})
    return response.json()
  },
  async deleteDish(id: any){
    const response = await fetch(api.menu.remove + params.id + id,{method: 'DELETE'})
    return response.json()
  },
  async findMenu(){
    const response = await fetch(api.menu.find,{method: 'GET'})
    return response.json()
  }
}