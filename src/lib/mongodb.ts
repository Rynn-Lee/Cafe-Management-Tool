import mongoose from 'mongoose'

const connectDB = async() => mongoose.connect(process.env.MONGO_URI!,
  {
      maxPoolSize: 50, 
      wtimeoutMS: 2500,
      useNewUrlParser: true
  })

export default connectDB