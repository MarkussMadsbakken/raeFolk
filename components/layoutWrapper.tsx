"use client"
import ThemeProvider from "@/util/themeProvider";
import { ToastProvider } from "@/util/toastProvider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
export default function LayoutWrapper({
    children,
    session,
}: { children: React.ReactNode, session: Session | null }) {

    return (
        <SessionProvider session={session}>
            <ToastProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </ToastProvider>
        </SessionProvider>
    )
}