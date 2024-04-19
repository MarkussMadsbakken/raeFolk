import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function GET() {
    const Quotes = await sql`SELECT quotes2.id as id, users.username as writtenby, quotes2.date, quotes2.quote, quotes2.context, authors.username as author FROM quotes2 JOIN users ON quotes2.writtenBy = users.id JOIN users AS authors ON quotes2.author = authors.id ORDER BY quotes2.id DESC LIMIT 10 OFFSET 0`;
    return NextResponse.json(Quotes);
}

export async function POST(request: Request) {
    const { quote, author, context, writtenBy } = await request.json();
    await sql`INSERT INTO quotes2 (author, quote, context, writtenBy, date) VALUES (${author}, ${quote}, ${context}, ${writtenBy},${"" + new Date().getFullYear() + "-" + new Date().getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + "-" + new Date().getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })})`;
    return NextResponse.json({ status: "success" })
}