import { QueryResultRow, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { postid: number } }) {
    if (params.postid == undefined || params.postid == null) {
        return NextResponse.json({ message: "No postid provided" });
    }

    const reactions = await sql`SELECT reactions.reaction, users.id as id, users.username AS name FROM user_reactions JOIN users ON user_reactions.user_id = users.id AND user_reactions.quote_id = ${params.postid} JOIN reactions ON user_reactions.reaction_id = reactions.id;`;
    return NextResponse.json(reactions.rows.map((row: QueryResultRow) => {
        return { reaction: row.reaction, user: { id: row.id, name: row.name } }
    }));
}

export async function POST(request: Request, { params }: { params: { postid: number } }) {
    const { reaction, userid } = await request.json();
    const reactions = await sql`SELECT reactions.reaction, users.id as id, users.username AS name FROM user_reactions JOIN users ON user_reactions.user_id = users.id AND user_reactions.quote_id = ${params.postid} JOIN reactions ON user_reactions.reaction_id = reactions.id;`;

    //TODO: replace this with a stored procedure
    const reactionId = await sql`SELECT id FROM reactions WHERE reaction = ${reaction}`;
    if (reactionId.rows?.at(0)?.id == undefined || reactionId.rows?.at(0)?.id == null || reactionId.rows.length == 0) {
        return NextResponse.json({ status: "error", message: "Invalid reaction" });
    }

    if (reactions.rows.find((row: QueryResultRow) => row.id == userid && row.reaction == reaction)) {
        await sql`DELETE FROM user_reactions WHERE user_id = ${userid} AND reaction_id = ${reactionId.rows.at(0)?.id} AND quote_id = ${params.postid}`;
        return NextResponse.json({ status: "success" });
    }

    await sql`INSERT INTO user_reactions (user_id, reaction_id, quote_id) VALUES (${userid}, ${reactionId.rows.at(0)?.id}, ${params.postid})`;
    return NextResponse.json({ status: "success" });
}