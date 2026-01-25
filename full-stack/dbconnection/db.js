import mongoose from 'mongoose'
import dotenvx from '@dotenvx/dotenvx'

const connectDB = async () => {
  let conn;
  try {
    if (process.env.NODE_ENV === 'production') {
      console.log('🚀 Connecting to production MongoDB (Atlas)...');
      conn = await mongoose.connect(process.env.MONGODB_URI_FULLSTACK);
    } else {
      console.log('🔧 Connecting to development MongoDB...');
      dotenvx.config({path: '.env.local'})
      conn = await mongoose.connect(process.env.MONGODB_URI_FULLSTACK_LOCAL);
    }

    const dbName = conn.connection.db.databaseName;
    console.log('✅ MongoDB connected successfully');
    console.log(`✅ Database Name: ${dbName}`);
    console.log(`✅ Host: ${conn.connection.host}`);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 Collections:');
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    console.log(`📈 Total Collections: ${collections.length}`);

    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    throw error
  }
};

export default connectDB;