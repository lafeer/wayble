import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (session) {
      return NextResponse.json(session, { status: 200 });
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Interal Server Error' }, { status: 500 });
  }
}
