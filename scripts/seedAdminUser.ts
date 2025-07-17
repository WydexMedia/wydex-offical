import 'dotenv/config';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI as string;
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin@Wydexmedia698';

async function seed() {
  if (!uri) throw new Error('MONGODB_URI not set');
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();
  const users = db.collection('users');

  const existing = await users.findOne({ username: ADMIN_USERNAME });
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  if (existing) {
    await users.updateOne(
      { username: ADMIN_USERNAME },
      { $set: { password: hashed, role: 'admin', createdAt: new Date() } }
    );
    console.log('Admin user password updated.');
    await client.close();
    return;
  }

  await users.insertOne({ username: ADMIN_USERNAME, password: hashed, role: 'admin', createdAt: new Date() });
  console.log('Admin user seeded.');
  await client.close();
}

seed().catch(e => { console.error(e); process.exit(1); }); 