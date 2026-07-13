import mongoose from 'mongoose'

let connected = false

/**
 * Connect to MongoDB if a URI is configured. Returns whether a live DB is
 * available; the API degrades gracefully (file fallback) when it isn't.
 */
export async function connectDb() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.warn('[db] MONGODB_URI not set — running in file-fallback mode (server/data/contacts.json).')
    return false
  }
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
    connected = true
    console.log('[db] Connected to MongoDB.')
    return true
  } catch (err) {
    console.error('[db] MongoDB connection failed — falling back to file store:', err.message)
    return false
  }
}

export const isDbConnected = () => connected && mongoose.connection.readyState === 1
