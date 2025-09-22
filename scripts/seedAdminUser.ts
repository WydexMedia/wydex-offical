import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const ADMIN_USERNAME = 'hr@wydexmedia.com';
const ADMIN_PASSWORD = 'Wydexmedia@2025';

async function seed() {
  if (!uri) throw new Error('MONGODB_URI not set');
  const client = new MongoClient(uri);
  await client.connect();
  // Use the 'wydexmedia' database and 'admin' collection
  const db = client.db('wydexmedia');
  const adminCollection = db.collection('admin');

  const existing = await adminCollection.findOne({ username: ADMIN_USERNAME });
  if (existing) {
    await adminCollection.updateOne(
      { username: ADMIN_USERNAME },
      { $set: { password: ADMIN_PASSWORD, role: 'admin', createdAt: new Date() } }
    );
    console.log('Admin user password updated.');
    await client.close();
    return;
  }

  await adminCollection.insertOne({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD, role: 'admin', createdAt: new Date() });
  console.log('Admin user seeded.');
  await client.close();
}

seed().catch(e => { console.error(e); process.exit(1); });