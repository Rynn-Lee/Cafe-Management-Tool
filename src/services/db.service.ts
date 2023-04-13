export const dbService = {
  async connect(){
    const response = await fetch('../../api/dbconnect')
    const result = await response.json()
    console.log("DB: ",result.DBresponse)
  }
}