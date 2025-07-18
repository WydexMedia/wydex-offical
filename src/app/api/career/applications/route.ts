import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { db } = await connectToDatabase();
  const applications = await db.collection('applications')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(applications);
} 