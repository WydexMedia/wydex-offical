import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../db';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  const { title, description } = await req.json();
  if (!title || !description) {
    return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
  }
  const { db } = await connectToDatabase();
  const result = await db.collection('jobs').insertOne({ title, description, createdAt: new Date() });
  return NextResponse.json({ success: true, id: result.insertedId });
}

export async function GET() {
  const { db } = await connectToDatabase();
  const jobs = await db.collection('jobs').find({}).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(jobs);
}

export async function PATCH(req: NextRequest) {
  const { id, title, description } = await req.json();
  if (!id || !title || !description) {
    return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
  }
  const { db } = await connectToDatabase();
  const result = await db.collection('jobs').updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, description } }
  );
  return NextResponse.json({ success: result.modifiedCount === 1 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ success: false, message: 'Missing job id' }, { status: 400 });
  }
  const { db } = await connectToDatabase();
  const result = await db.collection('jobs').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: result.deletedCount === 1 });
} 