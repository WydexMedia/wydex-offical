import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../db';

export const maxDuration = 60; // seconds
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { name, email, phone, message, jobRole, resume } = await req.json();
  if (!name || !email || !resume || !jobRole) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
  }
  // Store in MongoDB
  const { db } = await connectToDatabase();
  const result = await db.collection('applications').insertOne({
    name,
    email,
    phone,
    message,
    jobRole,
    resume, // S3 key
    createdAt: new Date(),
  });
  return NextResponse.json({ success: true, id: result.insertedId });
} 