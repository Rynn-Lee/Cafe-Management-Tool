import { MongoClient } from 'mongodb'

const uri = 'mongodb://localhost:27017/mydb' // Replace with your MongoDB URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let client
let clientPromise

if (!clientPromise) {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise