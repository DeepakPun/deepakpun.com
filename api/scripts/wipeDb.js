import mongoose from 'mongoose'
import Project from '../models/Project.js'

const wipeData = async () => {
  try {
    // 1. Connect and WAIT for it to finish
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.DB_URI)
    console.log('Connected successfully.')

    // 2. Perform the operation
    const result = await Project.deleteMany({})
    console.log(`🗑️ Success! Deleted ${result.deletedCount} projects.`)

    // 3. Gracefully close the connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error wiping database:', error.message)
    process.exit(1);
  }
};

wipeData()
