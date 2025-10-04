import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../db';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { db } = await connectToDatabase();
  const applications = await db.collection('applications')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(applications);
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const { db } = await connectToDatabase();
    
    // Convert string ID to ObjectId
    const objectId = new ObjectId(id);
    const result = await db.collection('applications').deleteOne({ _id: objectId });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Application not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete application' }, { status: 500 });
  }
} 