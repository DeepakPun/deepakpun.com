import mongoose from 'mongoose'

const connectDB = async () => {
  let conn
  try {
    if (process.env.NODE_ENV === 'production') {
      conn = await mongoose.connect(process.env.MONGODB_URI)
    } else {
      // In dev 
      conn = await mongoose.connect(process.env.DB_URI)
    }
    console.log('MongoDB connected')
    console.log(`HOST: ${conn.connection.host}`)
    console.log(`DATABASE: ${conn.connection.name}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
