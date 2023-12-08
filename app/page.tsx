"use client"
import CreateQuotePopup from "@/components/createQuotePopup";
import Quote from "@/components/quote";

import { useEffect, useState } from "react";

type Quote = {
  author: string;
  date: string;
  quote: string;
  context: string;
  writtenBy: string;
}

export default function Home() {
  let quote1 = {
    by: "Sindre",
    date: "2021-10-10",
    quote: "Dette er et sitat",
    reactions: [],
    context: "Dette er contexten"
  }

  const [quotes, setQuotes] = useState<Quote[]>([]);

  async function getQuotes() {
    console.log("Getting quotes");
    await fetch("/api/quotes").then(res => res.text()).then(res => JSON.parse(res)).then(res => res.rows.map((quote: any) => { setQuotes(quotes => [...quotes, { author: quote.author, date: quote.date, quote: quote.quote, context: quote.context, writtenBy: quote.writtenBy }]) }));
  }

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <h1 className="font-semibold text-xl">
        Sitater
      </h1>

      <CreateQuotePopup createQuote={(q, a, c, w) => {
        fetch("/api/quotes", { method: "POST", body: JSON.stringify({ quote: q, author: a, context: c, writtenBy: w }) });
        getQuotes();
      }} />
      {
        quotes ?
          quotes.map((quote: Quote, i: number) => (
            <Quote author={quote.author} date={quote.date} context={quote.context} quote={quote.quote} writtenBy={quote.writtenBy} reactions={[]} key={i} />
          ))

          : <div className="flex flex-col items-center justify-center mt-4">
            <div className="text-lg">
              Ingen sitater enda...
            </div>
          </div>
      }
    </div>
  );
}
