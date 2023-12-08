import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function GET() {
    const Quotes = await sql`SELECT * FROM quotes`;
    return NextResponse.json(Quotes);
}

export async function POST(request: Request) {
    const { author, quote, context, writtenBy } = await request.json();
    console.log("authot" + author, "quote" + quote, "context" + context, "written" + writtenBy)
    await sql`INSERT INTO quotes (author, quote, context, writtenBy, date) VALUES (${author}, ${quote}, ${context}, ${writtenBy}, ${new Date().getFullYear()}-${new Date().getMonth().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${new Date().getDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })})`;
}