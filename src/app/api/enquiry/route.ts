import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../db';

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
  }
  const { db } = await connectToDatabase();
  const result = await db.collection('enquiries').insertOne({
    name,
    email,
    phone,
    message,
    createdAt: new Date(),
  });
  return NextResponse.json({ success: true, id: result.insertedId });
}

export async function GET() {
  const { db } = await connectToDatabase();
  const enquiries = await db.collection('enquiries').find({}).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(enquiries);
} 