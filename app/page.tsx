"use client"
import CreateQuotePopup from "@/components/createQuotePopup";
import Quote from "@/components/quote";

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

  async function getQuotes() {
    console.log("Getting quotes");
    await fetch("/api/quotes").then(res => res.text()).then(res => JSON.parse(res)).then((res) => { setQuotes(res.rows.reverse()); });
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
        quotes ?
          quotes.map((quote: Quote, i: number) => (
            < Quote author={quote.author} date={quote.date} context={quote.context} quote={quote.quote} writtenBy={quote.writtenby} reactions={[]} key={i} />
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
