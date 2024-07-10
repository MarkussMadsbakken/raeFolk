
import { QUOTES_PER_PAGE } from "@/types/types";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { quoteId: number } }) {
    const pageOf = await sql`SELECT a.row_number / ${QUOTES_PER_PAGE} as b FROM (SELECT row_number() over (ORDER BY quotes2.id DESC), quotes2.id FROM quotes2 ORDER BY quotes2.id DESC) as a WHERE a.id = ${params.quoteId}`;
    return NextResponse.json(pageOf.rows[0]["b"]);
}

// Dummy exports for other HTTP methods
export async function POST() {
    return NextResponse.json({ message: "Denied" });
}