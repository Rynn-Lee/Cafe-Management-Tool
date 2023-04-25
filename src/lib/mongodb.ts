import mongoose from 'mongoose'

const connectDB = async() => mongoose.connect(process.env.MONGO_URI!,
  {
      maxPoolSize: 50, 
      wtimeoutMS: 2500,
      socketTimeoutMS: 360000,
      connectTimeoutMS: 360000,
      keepAlive: true
  })

export default connectDB