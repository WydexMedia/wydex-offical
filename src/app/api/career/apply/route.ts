import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../db';
import path from 'path';
import fs from 'fs';

export const maxDuration = 60; // seconds
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ success: false, message: 'Invalid content type' }, { status: 400 });
  }

  const formData = await req.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');
  const jobRole = formData.get('jobRole');
  const resume = formData.get('resume');

  if (!name || !email || !resume || !jobRole) {
    return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
  }

  if (typeof resume === 'object' && 'arrayBuffer' in resume) {
    const fileBuffer = Buffer.from(await resume.arrayBuffer());
    const fileSize = fileBuffer.length;
    const fileType = resume.type;
    const fileName = resume.name;

    if (fileType !== 'application/pdf') {
      return NextResponse.json({ success: false, message: 'Resume must be a PDF' }, { status: 400 });
    }
    if (fileSize > 2 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'Resume must be less than 2MB' }, { status: 400 });
    }

    // Save file to /public/resumes/
    const resumesDir = path.join(process.cwd(), 'public', 'resumes');
    if (!fs.existsSync(resumesDir)) {
      fs.mkdirSync(resumesDir, { recursive: true });
    }
    const uniqueName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    const filePath = path.join(resumesDir, uniqueName);
    fs.writeFileSync(filePath, fileBuffer);
    const publicPath = `/resumes/${uniqueName}`;

    // Store in MongoDB
    const { db } = await connectToDatabase();
    const result = await db.collection('applications').insertOne({
      name,
      email,
      phone,
      message,
      jobRole,
      resume: publicPath,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  }

  return NextResponse.json({ success: false, message: 'Invalid file upload' }, { status: 400 });
} 