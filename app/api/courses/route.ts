import { NextResponse } from 'next/server';
import db from '@/db/drizzle';
import { courses } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getIsAdmin } from '@/lib/admin';

export const GET = async () => {
  if (!getIsAdmin()) {
    return new NextResponse('Unauthorized', { status: 401 });
  };
  const data = await db.query.courses.findMany();
  return NextResponse.json(data);
}