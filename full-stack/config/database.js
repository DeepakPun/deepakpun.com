// full-stack/config/database.js
import mongoose from 'mongoose';

class DatabaseConnection {
  constructor() {
    this.connection = null;
    this.isConnected = false;
  }

  async connect() {
    try {
      // Validate environment variable
      if (!process.env.MONGODB_URI_FULLSTACK) {
        throw new Error('MONGODB_URI_FULLSTACK environment variable is not set');
      }

      console.log('🚀 Connecting to production MongoDB (Atlas)...');
      console.log('🔍 Connection string preview:', process.env.MONGODB_URI_FULLSTACK.substring(0, 30) + '...');

      // MongoDB connection options
      const options = {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4, skip trying IPv6
        retryWrites: true,
        w: 'majority',
        // Additional options for better reliability
        maxIdleTimeMS: 30000,
        // bufferMaxEntries: 0,
        connectTimeoutMS: 10000,
      };

      // Connect to MongoDB
      this.connection = await mongoose.connect(process.env.MONGODB_URI_FULLSTACK, options);

      this.isConnected = true;

      console.log('✅ MongoDB connected successfully');
      console.log('✅ Database Name:', this.connection.connection.db.databaseName);
      console.log('✅ Host:', this.connection.connection.host);
      console.log('✅ Ready State:', mongoose.connection.readyState);

      // Get collections info
      try {
        const collections = await this.connection.connection.db.listCollections().toArray();
        console.log('📋 Collections:', collections.map(c => c.name));
      } catch (collectionsError) {
        console.log('⚠️  Could not list collections:', collectionsError.message);
      }

      // Set up connection event listeners
      mongoose.connection.on('error', (error) => {
        console.error('❌ MongoDB connection error:', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('⚠️  MongoDB disconnected');
        this.isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        console.log('✅ MongoDB reconnected');
        this.isConnected = true;
      });

      return this.connection;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      console.error('🔍 Error details:', {
        name: error.name,
        code: error.code,
        codeName: error.codeName
      });

      this.isConnected = false;
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        this.isConnected = false;
        console.log('✅ MongoDB disconnected successfully');
      }
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error.message);
    }
  }

  getConnection() {
    return this.connection;
  }

  isConnectionReady() {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  getConnectionStatus() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      status: states[mongoose.connection.readyState] || 'unknown'
    };
  }
}

// Export singleton instance
export default new DatabaseConnection();
