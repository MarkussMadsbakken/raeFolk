"use client"
import { Button } from "@/components/input";
import LoggedInInfo from "@/components/LoggedInInfo";
import Quote from "@/components/quote";
import QuoteSkeleton from "@/components/quoteSkeleton";
import ThemeSwticher from "@/components/ThemeSwticher";
import { quote } from "@/types/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SingleQuotePage({ params }: { params: { quoteId: string } }) {
    const fetchQuote = async () => {
        await fetch("/api/quote/" + params.quoteId, { method: "GET" })
            .then(res => res.text())
            .then(res => JSON.parse(res)).then((res) => {
                setQuote(res.rows[0]);
                setLoading(false);
            })
    }

    const session = useSession();
    const [loading, setLoading] = useState(true);
    const [quote, setQuote] = useState<quote>();

    useEffect(() => {
        fetchQuote();
    }, [])

    return (
        <div className="flex flex-col items-center justify-center pt-4">
            <h1 className="font-semibold text-xl m-2">
                Sitat av {quote?.author}
            </h1>
            <Link href={"/?highlight=" + params.quoteId}>
                <Button variant="primary">Tilbake</Button>
            </Link>
            <div className="md:absolute md:right-24 md:top-10 mt-4 md:mt-0 flex flex-col justify-center content-center transition-all">
                <LoggedInInfo user={session.data?.user} />
                <ThemeSwticher />
            </div>

            <div className="flex justify-center pt-24 h-96 w-8/12">
                {
                    (loading || (quote === undefined))
                        ? <QuoteSkeleton />
                        : <Quote
                            author={quote.author}
                            date={quote.date}
                            context={quote.context}
                            quote={quote.quote}
                            writtenBy={quote.writtenby}
                            id={quote.id}
                        />
                }
            </div>
        </div>
    )
}

