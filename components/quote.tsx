import { Ephesis } from 'next/font/google'
const Eph = Ephesis({ subsets: ['latin'], weight: "400" });
interface QuoteProps {
    author: string;
    quote: string;
    context?: string;
    writtenBy: string;
    date: string;
    reactions: string[];
}
export default function Quote(props: Readonly<QuoteProps>) {
    return (
        <div className="mt-6 w-5/12 h-fit pb-5 bg-neutral-300 border rounded-lg">
            <div className='mt-8 flex flex-col justify-center items-center'>
                <div className="flex flex-row justify-center pl-10 text-center w-full">
                    <div className="text-2xl w-2/3 pl-10">{'"' + props.quote + '"'}</div>
                    <div className="flex items-center justify-center select-none ">
                        <div className={"text-2xl pl-2 text-center " + Eph.className}>{"- " + props.author}</div>
                    </div>
                </div>
                <div className="p-2 font-extralight text-xs text-center">{props.context}</div>
                <div className="mt-1 font-extralight text-xs">{props.date}</div>
                <div className="mt-2 font-extralight text-xs">{"Skrevet av: " + props.writtenBy}</div>
            </div>
            {/* TODO: add reactions */}
        </div >
    );
}