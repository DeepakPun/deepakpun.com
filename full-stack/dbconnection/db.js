import mongoose from 'mongoose'

const connectDB = async () => {
  let conn
  try {
    let mongoUri

    if (process.env.NODE_ENV === 'production') {
      mongoUri = process.env.MONGODB_URI_FULLSTACK
      console.log('🚀 Connecting to production MongoDB (Atlas)...')
    } else {
      mongoUri = process.env.MONGODB_URI_FULLSTACK || process.env.DB_URI_DOCKER
      console.log('🔧 Connecting to development MongoDB...')
    }

    if (!mongoUri) {
      throw new Error(`MongoDB URI not found. NODE_ENV: ${process.env.NODE_ENV}`);
    }

    conn = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    const dbName = conn.connection.db.databaseName
    console.log(`✅ MongoDB connected successfully to database: ${dbName}`)
    console.log(`🌐 Environment: ${process.env.NODE_ENV}`)

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('🔍 Available environment variables:')
    console.error('  - NODE_ENV:', process.env.NODE_ENV)
    console.error('  - MONGODB_URI_FULLSTACK:', process.env.MONGODB_URI_FULLSTACK ? 'SET' : 'NOT SET');
    console.error('  - DB_URI_DOCKER:', process.env.DB_URI_DOCKER ? 'SET' : 'NOT SET')

    if (process.env.NODE_ENV !== 'production') {
      process.exit(1)
    }
    throw error
  }
}

export default connectDB
