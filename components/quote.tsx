"use client"
import ColorPicker from '@/util/colorPicker';
import { useTheme } from '@/util/themeProvider';
import { Ephesis } from 'next/font/google'
import { useEffect, useState } from 'react';

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
    const [theme, setTheme] = useTheme();

    const [color, setColor] = useState<string>(theme == "light" ? "neutral-300" : ColorPicker());
    const [color2, setColor2] = useState<string>(theme == "light" ? "neutral-300" : ColorPicker());
    const [color3, setColor3] = useState<string>(theme == "light" ? "neutral-300" : ColorPicker());
    const [bgpos, setBgpos] = useState<number>(0);
    const [bgsize, setBgsize] = useState<number>(0);

    useEffect(() => {
        changeColor();
    }, [theme])

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    async function changeColor() {
        let newcolor = theme == "light" ? "neutral-300" : ColorPicker();
        let newcolor2 = theme == "light" ? "neutral-300" : ColorPicker();
        let newcolor3 = theme == "light" ? "neutral-300" : ColorPicker();

        setColor(newcolor);

        await sleep(20);
        setColor2(newcolor2);

        await sleep(20);
        setColor3(newcolor3);
    }



    return (
        <div className={`relative grid transition-all duration-1000 mt-2 md:mt-6 md:w-5/12 w-3/4 pb-2 md:pb-5 border rounded-lg`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-${color} via-${color2} to-${color3} transition-opacity duration-1000`}></div>
            <div className='relative'>
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
            </div>
        </div>
    );
}