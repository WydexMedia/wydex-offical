import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ username });
  if (!user) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    return NextResponse.json({ success: true, token: 'admin-session-token' });
  }
  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
} 