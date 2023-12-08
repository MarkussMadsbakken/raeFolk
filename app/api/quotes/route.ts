import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
    const Quotes = await kv.hgetall("quotes")
    return NextResponse.json(Quotes);
}

export async function POST(request: Request) {
    const { author, quote, context, writtenBy } = await request.json();
    const data = {
        author: author,
        quote: quote,
        context: context,
        writtenBy: writtenBy,
        date: new Date().toLocaleString()
    }
    await kv.append("quotes", JSON.stringify(data));
    return NextResponse.redirect('/quotes');
}