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
        <div className="mt-2 md:mt-6 md:w-5/12 w-3/4 h-fit pb-2 md:pb-5 bg-neutral-300 border rounded-lg">
            <div className='mt-3 md:mt-8 flex flex-col justify-center items-center'>
                <div className="flex flex-col md:flex-row justify-center items-center text-center w-full">
                    <div className="md:text-2xl text-lg w-2/3 md:ml-auto ">{props.quote}</div>
                    <div className="flex items-center justify-center select-none justify-self-end">
                        <div className={"text-2xl md:pl-2 text-center md:pr-4 " + Eph.className}>{"- " + props.author}</div>
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