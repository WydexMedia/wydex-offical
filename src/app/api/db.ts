import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (db && client) {
    return { db, client };
  }
  if (!uri) throw new Error('MONGODB_URI not set in environment');
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  return { db, client };
} 