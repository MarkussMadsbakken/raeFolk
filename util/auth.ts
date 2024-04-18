import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"

import { getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { sql } from "@vercel/postgres"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "username" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                // TODO: this is just for testing purposes
                // Connect with a database.
                // Maybe also include a link to image and email? These will be included in the signup process
                const user = await sql`SELECT * FROM users WHERE username = ${credentials?.username} AND password = ${credentials?.password}`

                if (user.rows.length === 0) return null
                return { id: user.rows[0].id, name: user.rows[0].username }
            },

        })
    ],

    session: {
        strategy: "jwt"
    },

    callbacks: {
        jwt({ token, account, user }) {
            if (user?.id) token.id = user.id
            return token
        },

        session({ session, token }) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.accessToken = token.accessToken
            return session;
        }
    },

    pages: {
        signIn: "/login"
    }

} satisfies NextAuthOptions

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
}