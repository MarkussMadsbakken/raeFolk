import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { quoteId: number } }) {
    const quote = await sql`SELECT users.username as writtenby, quotes2.date, quotes2.quote, quotes2.context, authors.username as author, quotes2.id as id FROM quotes2 JOIN users ON quotes2.writtenBy = users.id JOIN users AS authors ON quotes2.author = authors.id WHERE quotes2.id = ${params.quoteId}`;
    return NextResponse.json(quote);
}

// Dummy exports for other HTTP methods
export async function POST() {
    return NextResponse.json({ message: "Denied" });
}