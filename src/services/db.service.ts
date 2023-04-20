import axios from "axios"

export const dbService = {
  async connect(){
    const response = await axios.get('../../api/dbconnect')
    const result = await response.data
    console.log("DB: ",result.DBresponse)
  }
}