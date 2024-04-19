import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { page: number } }) {
    const Quotes = await sql`SELECT users.username as writtenby, quotes2.date, quotes2.quote, quotes2.context, authors.username as author, quotes2.id as id FROM quotes2 JOIN users ON quotes2.writtenBy = users.id JOIN users AS authors ON quotes2.author = authors.id ORDER BY quotes2.id DESC LIMIT 10 OFFSET ${params.page * 10}`;
    return NextResponse.json(Quotes);
}

// Dummy exports for other HTTP methods
export async function POST() {
    return NextResponse.json({ message: "Denied" });
}