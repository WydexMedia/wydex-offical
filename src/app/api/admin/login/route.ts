import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../db';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const { client } = await connectToDatabase();
  // Explicitly connect to the 'wydexmedia' database
  const db = client.db('wydexmedia');
  const admin = await db.collection('admin').findOne({ username });
  if (!admin) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
  // Compare plain text password
  if (password === admin.password) {
    return NextResponse.json({ success: true, token: 'admin-session-token' });
  }
  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}