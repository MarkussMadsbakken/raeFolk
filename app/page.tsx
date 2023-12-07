"use client"
import { Button } from "@/components/input";
import Quote from "@/components/quote";

import { useState } from "react";

type quoteProp = {
  by: string;
  date: string;
  quote: string;
  reactions: string[];
  context: string;
}

export default function Home() {
  let quote1 = {
    by: "Sindre",
    date: "2021-10-10",
    quote: "Dette er et sitat",
    reactions: [],
    context: "Dette er contexten"
  }
  const [quotes, setQuotes] = useState();


  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <h1 className="font-semibold text-xl">
        Sitater
      </h1>

      <Button variant="primary" className="mt-4">
        Legg til sitat
      </Button>

      <Quote writtenBy="Sindre" date="2021-10-10" message="Dette er et sitat" author="Sindre" reactions={[]} context="Dette er konteksten" />
      <Quote writtenBy="Sindre" date="2021-10-10" message="Dette er et veldig langt sitat! Huffa meg så langt!" author="Sindre" reactions={[]} context="Dette er konteksten som er veldig lang! Fyfean noen skriver veldig lang kontekst askdfsdkjhfbasdkjhfj kahsdfhksdgfgas djkhfgaksjhdfgkjsdagfkja sgdfhgasdf kajsdfg aksjdf kajshdgf kjashdg fkjhasd gf" />
    </div>
  );
}
