import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    const users = await sql`SELECT id, username FROM users`;
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    return NextResponse.json({ message: "denied" });
}