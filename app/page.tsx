"use client"
import CreateQuotePopup from "@/components/createQuotePopup";
import Quote from "@/components/quote";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import { useEffect, useState } from "react";
import LoggedInInfo from "@/components/LoggedInInfo";
import { useSession } from "next-auth/react";
import ThemeSwticher from "@/components/ThemeSwticher";
import PageSwitcher from "@/components/pageSwitcher";
import { animate } from "framer-motion"


type Quote = {
    author: string;
    date: string;
    quote: string;
    context: string;
    writtenby: string;
}

export default function Home() {

    const session = useSession();

    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [initialLoad, setInitialLoad] = useState(true);

    // Smooth scroll to top
    const scrollToTop = async () => {
        animate(0, 1, {
            ease: "easeOut",
            duration: 0.5,
            onUpdate: (val) => {
                scrollTo(0, scrollY * (1 - val))
            }
        })
    }

    async function getQuotes(page: number) {
        if (!initialLoad) scrollToTop();
        setInitialLoad(false);

        await fetch("/api/quotes/" + page, { method: "GET" })
            .then(res => res.text())
            .then(res => JSON.parse(res)).then((res) => {
                setQuotes(res.rows);
                setLoading(false);
            });
    }

    useEffect(() => {
        getQuotes(0);
    }, []);


    useEffect(() => {
        setLoading(true);
        getQuotes(page);
    }, [page])

    return (
        <div >
            <div className="absolute right-24 top-10">
                <LoggedInInfo user={session.data?.user} />
                <ThemeSwticher />
            </div>
            <div className="flex flex-col items-center justify-center pt-4">
                <h1 className="font-semibold text-xl">
                    Sitater
                </h1>

                <CreateQuotePopup createQuote={(q, a, c, w) => {
                    fetch("/api/quotes", { method: "POST", body: JSON.stringify({ author: a, quote: q, context: c, writtenBy: w }) }).then(res => getQuotes(page));
                }} />
                {
                    loading
                        ? <Loading />
                        : quotes.map((quote: Quote, i: number) => (
                            < Quote author={quote.author} date={quote.date} context={quote.context} quote={quote.quote} writtenBy={quote.writtenby} reactions={[]} key={i} />
                        ))
                }

                <div className="mb-32 mt-10">
                    <PageSwitcher page={page} onPageChange={(page) => setPage(page)} />
                </div>
            </div>
        </div>
    );
}

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center mt-4 w-full">
            <QuoteSkeleton />
            <QuoteSkeleton />
            <QuoteSkeleton />
        </div>
    );
}

function QuoteSkeleton() {
    return (
        <div className="bg-neutral-300 md:w-5/12 w-3/4 h-fit pb-2 md:pb-5 mt-2 md:mt-4 rounded-lg">
            <div className='md:mt-8 flex flex-col justify-center items-center'>
                <div className="flex flex-col md:flex-row justify-center items-center md:pl-10 w-full">
                    <Skeleton containerClassName="w-2/3 md:ml-20" count={2} className="h-8 m-2" />
                    <div className="flex items-center justify-center w-full md:w-20 md:pl-2 md:ml-4">
                        <Skeleton containerClassName="md:w-full w-1/12" />
                    </div>
                </div>
                <Skeleton className="mt-3" containerClassName="w-3/12" />
                <Skeleton className="mt-1" containerClassName="w-1/12" />
                <Skeleton className="mt-1" containerClassName="w-2/12" />
            </div>
        </div>
    );
}
