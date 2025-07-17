import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../db';
import { ObjectId } from 'mongodb';

export async function GET() {
  const { db } = await connectToDatabase();
  const blogs = await db.collection('blogs').find({}).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  const { title, description, content, image } = await req.json();
  if (!title || !description || !content) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
  }
  const { db } = await connectToDatabase();
  const result = await db.collection('blogs').insertOne({
    title,
    description,
    content,
    image: image || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return NextResponse.json({ success: true, id: result.insertedId });
}

export async function PATCH(req: NextRequest) {
  const { id, title, description, content, image } = await req.json();
  if (!id || !title || !description || !content) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
  }
  const { db } = await connectToDatabase();
  const result = await db.collection('blogs').updateOne(
    { _id: new ObjectId(id) },
    { $set: { title, description, content, image: image || '', updatedAt: new Date() } }
  );
  return NextResponse.json({ success: result.modifiedCount === 1 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ success: false, message: 'Missing blog id' }, { status: 400 });
  }
  const { db } = await connectToDatabase();
  const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: result.deletedCount === 1 });
} 