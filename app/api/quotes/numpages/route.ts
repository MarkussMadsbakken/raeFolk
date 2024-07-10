import { QUOTES_PER_PAGE } from "@/types/types";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    const numPages = await sql`SELECT CASE WHEN COUNT(*) % ${QUOTES_PER_PAGE} = 0 THEN COUNT(*) / ${QUOTES_PER_PAGE} ELSE COUNT(*) / ${QUOTES_PER_PAGE} + 1 END as numPages FROM quotes2`;
    return NextResponse.json(numPages);
}

// Dummy exports for other HTTP methods
export async function POST() {
    return NextResponse.json({ message: "Denied" });
}