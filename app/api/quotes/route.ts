import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function GET() {
    const Quotes = await sql`SELECT * FROM quotes`;
    return NextResponse.json(Quotes);
}

export async function POST(request: Request) {
    const { author, quote, context, writtenBy } = await request.json();
    console.log(author, quote, context, writtenBy)
    const data = {
        author: author,
        quote: quote,
        context: context,
        writtenBy: writtenBy,
        date: new Date().toLocaleString()
    }
    await sql`INSERT INTO quotes (author, quote, context, writtenBy, date) VALUES (${data.author}, ${data.quote}, ${data.context}, ${data.writtenBy}, ${data.date})`;
}