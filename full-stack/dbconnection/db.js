import mongoose from 'mongoose'

const connectDB = async () => {
  let conn
  try {
    if (process.env.NODE_ENV === 'production') {
      conn = await mongoose.connect(process.env.MONGODB_URI_FULLSTACK)
      console.log('🚀 Connecting to production MongoDB (Atlas)...')
    } else {
      conn = await mongoose.connect(process.env.DB_URI_DOCKER)
      console.log('🔧 Connecting to development MongoDB...')
    }

    const dbName = conn.connection.db.databaseName
    console.log('MongoDB connected')
    console.log('📊 Database Name:', dbName)
    console.log(`HOST: ${conn.connection.host}`)
    console.log(`DATABASE: ${conn.connection.name}`)

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 Collections:');
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });

    // Print collection count
    console.log(`📈 Total Collections: ${collections.length}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
