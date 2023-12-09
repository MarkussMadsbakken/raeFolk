"use client"
import CreateQuotePopup from "@/components/createQuotePopup";
import Quote from "@/components/quote";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import { useEffect, useState } from "react";

type Quote = {
  author: string;
  date: string;
  quote: string;
  context: string;
  writtenby: string;
}

export default function Home() {

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  async function getQuotes() {
    console.log("Getting quotes");
    await fetch("/api/quotes").then(res => res.text()).then(res => JSON.parse(res)).then((res) => { setQuotes(res.rows.reverse()); setLoading(false); });
  }
  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <h1 className="font-semibold text-xl">
        Sitater
      </h1>

      <CreateQuotePopup createQuote={(a, q, c, w) => {
        console.log("author: " + a + " quote: " + q + " context: " + c + " writtenBy: " + w)
        fetch("/api/quotes", { method: "POST", body: JSON.stringify({ author: a, quote: q, context: c, writtenBy: w }) }).then(res => getQuotes());
      }} />

      {
        loading
          ? <Loading />
          : quotes.map((quote: Quote, i: number) => (
            < Quote author={quote.author} date={quote.date} context={quote.context} quote={quote.quote} writtenBy={quote.writtenby} reactions={[]} key={i} />
          ))
      }
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
    <div className="bg-neutral-300 w-5/12 h-fit pb-5 mt-4 rounded-lg">
      <div className='mt-8 flex flex-col justify-center items-center'>
        <div className="flex flex-row justify-center pl-10 text-center w-full">
          <Skeleton containerClassName="w-2/3 ml-20" count={2} className="h-8 m-2" />
          <div className="flex items-center justify-center w-20 pl-2 ml-4">
            <Skeleton containerClassName="w-full" />
          </div>
        </div>
        <Skeleton className="m-1 mt-3" containerClassName="w-3/12" />
        <Skeleton className="m-1" containerClassName="w-1/12" />
        <Skeleton className="m-1" containerClassName="w-1/12" />
      </div>
    </div>
  );
}
