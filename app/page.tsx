"use client"
import CreateQuotePopup from "@/components/createQuotePopup";
import Quote from "@/components/quote";

import { useCallback, useEffect, useState } from "react";
import LoggedInInfo from "@/components/LoggedInInfo";
import { useSession } from "next-auth/react";
import ThemeSwticher from "@/components/ThemeSwticher";
import PageSwitcher from "@/components/pageSwitcher";
import { animate } from "framer-motion"
import { quote } from "@/types/types";
import QuoteSkeleton from "@/components/quoteSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import QuotePopup from "@/components/quotePopup";
import { url } from "inspector";

export default function Home() {

    const session = useSession();

    const searchParams = useSearchParams();
    const router = useRouter();
    const highlight = useSearchParams().get("highlight");

    const [quotes, setQuotes] = useState<quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [initialLoad, setInitialLoad] = useState(true);
    const [highlightedQuote, setHighlightedQuote] = useState<quote | null>();
    const [numberOfPages, setNumberOfPages] = useState<number>(0);

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

    const getQuotes = async (page: number): Promise<quote[]> => {
        if (!initialLoad) scrollToTop();
        setInitialLoad(false);

        return await fetch("/api/quotes/" + page, { method: "GET" })
            .then(res => res.text())
            .then(res => JSON.parse(res))
            .then(res => res.rows)
    }

    const getNumberOfPages = async () => {
        await fetch("/api/quotes/numpages", { method: "GET" })
            .then(res => res.text())
            .then(res => JSON.parse(res)).then((res) => {
                setNumberOfPages(res.rows[0].numpages);
            });
    }

    const getPageOfQuote = async (quoteId: string): Promise<number> => {
        return await fetch("/api/quotes/pageof/" + quoteId, { method: "GET" })
            .then(res => res.text())
            .then(res => JSON.parse(res));
    }

    const updateHighlightQuery = (quoteId: string) => {
        router.replace("?" + new URLSearchParams({ highlight: quoteId }), { scroll: false });
    }

    const removeHighlightQuery = () => {
        router.replace("/", { scroll: false });
    }

    useEffect(() => {
        // get number of pages  
        getNumberOfPages();

        // highlight quote if needed
        if (!highlight) {
            getQuotes(0).then(quotes => {
                setQuotes(quotes);
                setLoading(false);
            });

            return;
        }

        getPageOfQuote(highlight).then(page => {
            if (Number(page) === 0) {
                getQuotes(0).then(quotes => {
                    setQuotes(quotes);
                    setLoading(false)
                });
                return;
            }
            setLoading(false);
            setPage(Number(page));
        })

    }, []);


    useEffect(() => {
        if (loading) return;

        setLoading(true);
        getQuotes(page).then(quotes => {
            setQuotes(quotes);
            setLoading(false);
        })
    }, [page])

    useEffect(() => {
        if (loading || !highlight) return

        const quote = quotes.find(quote => quote.id == highlight)

        if (!quote) {
            return;
        }
        setHighlightedQuote(quote);

    }, [quotes])

    useEffect(() => {
        if (!highlightedQuote) return;

        updateHighlightQuery(highlightedQuote.id)
    }, [highlightedQuote])

    return (
        <div >
            <div className="flex flex-col items-center justify-center pt-4">
                <h1 className="font-semibold text-xl m-2">
                    Sitater
                </h1>

                <CreateQuotePopup createQuote={(q, a, c, w) => {
                    fetch("/api/quotes", { method: "POST", body: JSON.stringify({ author: a, quote: q, context: c, writtenBy: w }) }).then(res => getQuotes(page));
                }} />

                <div className="md:absolute md:right-24 md:top-10 mt-4 md:mt-0 flex flex-col justify-center content-center transition-all">
                    <LoggedInInfo user={session.data?.user} />
                    <ThemeSwticher />
                </div>

                {
                    loading
                        ? <Loading />
                        :
                        <div className="w-3/4 md:w-5/12 ">
                            {
                                quotes.map((quote: quote, i: number) => (
                                    <Quote
                                        author={quote.author}
                                        date={quote.date}
                                        context={quote.context}
                                        quote={quote.quote}
                                        writtenBy={quote.writtenby}
                                        id={quote.id}
                                        key={i}
                                        onClick={() => setHighlightedQuote(quote)}
                                    />
                                ))
                            }
                        </div>
                }

                {highlightedQuote &&
                    <QuotePopup
                        quote={highlightedQuote}
                        onClose={() => {
                            setHighlightedQuote(null)
                            removeHighlightQuery();
                        }}
                    />
                }

                <div className="mb-32 mt-10">
                    <PageSwitcher numberOfPages={numberOfPages} page={page} onPageChange={(page) => setPage(page)} />
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
            <QuoteSkeleton />
            <QuoteSkeleton />
        </div>
    );
}