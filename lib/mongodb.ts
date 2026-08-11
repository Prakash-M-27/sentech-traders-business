import { MongoClient, Db } from 'mongodb'

const rawUri = process.env.MONGODB_URI
if (!rawUri) {
  throw new Error('Please define the MONGODB_URI environment variable in .env')
}
const uri: string = rawUri

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri)
  const db = client.db('sen_tech')

  cachedClient = client
  cachedDb = db

  return { client, db }
}
