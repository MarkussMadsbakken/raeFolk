import { Button } from "@/components/input";
import Quote from "@/components/quote";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <h1 className="font-semibold text-xl">
        Sitater
      </h1>

      <Button variant="primary" className="mt-4">
        Legg til sitat
      </Button>

      <Quote writtenBy="Sindre" date="2021-10-10" message="Dette er et sitat" author="Sindre" reactions={[]} />

    </div>
  );
}
