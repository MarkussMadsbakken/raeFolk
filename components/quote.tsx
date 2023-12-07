import { Ephesis } from 'next/font/google'
const Eph = Ephesis({ subsets: ['latin'], weight: "400" });
interface QuoteProps {
    author: string;
    message: string;
    context?: string;
    writtenBy: string;
    date: string;
    reactions: string[];
}
export default function Quote(props: Readonly<QuoteProps>) {

    return (
        <div className="mt-6 w-1/3 h-36 bg-neutral-300 border rounded-lg">
            <div className='mt-8 flex flex-col justify-center items-center'>
                <div className="text-2xl">{props.message}</div>
                <div className="flex flex-row justify-between items-center mt-2 w-1/2">
                    <div className={"text-xl mt-2 " + Eph.className}>{props.author}</div>
                    <div className="">{props.date}</div>
                </div>
            </div>
            <div className="quote__context">{props.context}</div>
            <div className="quote__written-by">{props.writtenBy}</div>
            {/* TODO: add reactions */}
        </div >
    );
}