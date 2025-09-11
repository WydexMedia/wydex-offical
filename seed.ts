import { connectToDatabase } from './src/app/api/db';
import bcrypt from 'bcryptjs';

const seedUsers = [
  {
    username: 'hr@wydexmedia.com',
    password: 'Fazlah@wydex',
  },

];

async function seedDatabase() {
  const { db } = await connectToDatabase();

  for (const user of seedUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db.collection('wydexadmin').insertOne({
      username: user.username,
      password: hashedPassword,
    });
  }

  console.log('Database seeded with initial user data.');
}

seedDatabase().catch(console.error);