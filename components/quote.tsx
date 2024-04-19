"use client"
import { reaction, reactionMap, userReaction } from '@/types/types';
import ColorPicker from '@/util/colorPicker';
import { useTheme } from '@/util/themeProvider';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { Ephesis } from 'next/font/google'
import { useEffect, useRef, useState } from 'react';
import Reaction from './reaction';
import { useAnimate } from 'framer-motion';
import NewReactionPicker from './newReactionPicker';

const Eph = Ephesis({ subsets: ['latin'], weight: "400" });
interface QuoteProps {
    author: string;
    quote: string;
    context?: string;
    writtenBy: string;
    date: string;
    id: string;
}


export default function Quote(props: Readonly<QuoteProps>) {
    const [theme, setTheme] = useTheme();

    const [color, setColor] = useState<string>(theme == "light" ? "neutral-300" : ColorPicker());
    const [color2, setColor2] = useState<string>(theme == "light" ? "neutral-300" : ColorPicker());
    const [color3, setColor3] = useState<string>(theme == "light" ? "neutral-300" : ColorPicker());
    const [bgpos, setBgpos] = useState<number>(0);
    const [bgsize, setBgsize] = useState<number>(0);

    const [addReactionScope, animateAddReaction] = useAnimate();
    const addReactionButtonRef = useRef<HTMLButtonElement>(null);

    const [reactions, setReactions] = useState<userReaction[]>([])
    const [newReactionPickerOpen, setNewReactionPickerOpen] = useState<boolean>(false);

    const session = useSession();

    useEffect(() => {
        fetchReactions();
    }, []);

    const fetchReactions = async () => {
        await fetch("/api/reactions/" + props.id, { method: "GET" })
            .then(res => res.text())
            .then(res => JSON.parse(res)).then((res) => {
                setReactions(res);
            });
    }

    useEffect(() => {
        changeColor();
    }, [theme])

    function changeColor() {
        let newcolor = theme == "light" ? "neutral-300" : ColorPicker();
        let newcolor2 = theme == "light" ? "neutral-300" : ColorPicker();
        let newcolor3 = theme == "light" ? "neutral-300" : ColorPicker();

        setColor(newcolor);
        setColor2(newcolor2);
        setColor3(newcolor3);
    }

    const groupedReactions = reactions?.reduce((acc: { [key: string]: [{ name: string, id: string }] }, reaction: userReaction) => {
        if (!acc[reaction.reaction]) {
            acc[reaction.reaction] = [{ name: reaction.user.name, id: reaction.user.id }]
            return acc;
        }

        acc[reaction.reaction].push(reaction.user);
        return acc;
    }, {})


    const addReaction = async (reaction: reaction) => {
        if (!session.data) {
            return
        }

        if (reactions.find((r) => r.reaction === reaction && r.user.id === session.data.user.id)) {
            setReactions(reactions.filter((r) => r.reaction !== reaction || r.user.id !== session.data.user.id))
        } else {
            setReactions([...reactions, { reaction: reaction, user: { name: session.data.user.name, id: session.data.user.id } }])
        }

        await fetch("/api/reactions/" + props.id, { method: "POST", body: JSON.stringify({ reaction: reaction, userid: session.data.user.id }) })
            .then(res => res.text())
            .then(res => JSON.parse(res)).then((res) => {
                fetchReactions();
            });
    }

    useEffect(() => {

        //adds an event listener to the window to check if a click is outside the dropdown box
        if (newReactionPickerOpen) {
            window.addEventListener("click", checkClick);
        }

        //checks if a click is outside the dropdown box
        function checkClick(e: MouseEvent) {
            if (!addReactionScope.current?.contains(e.target) && !addReactionButtonRef.current?.contains(e.target as Node)) {
                setNewReactionPickerOpen(false);
                window.removeEventListener("click", checkClick);
            }
        }

        //removes the event listener when the component is unmounted
        return () => {
            window.removeEventListener("click", checkClick);
        };
    }, [newReactionPickerOpen]);

    return (
        <div className={`relative grid mt-4 md:mt-6 md:w-5/12 w-3/4 pb-2 md:pb-5 border rounded-lg transition-all duration-500`}>
            <div className={`absolute ease-in-out inset-0 bg-gradient-to-br from-${color} via-${color2} to-${color3} transition-transform bg-size-200 ${theme === "light" ? "opacity-0 bg-pos-0" : "opacity-100 bg-pos-100"} duration-1000`}></div>
            <div className={`absolute inset-0 bg-gradient-to-br from-${color} via-${color2} to-${color3} ${theme === "light" ? "opacity-100 " : "opacity-0"} duration-1000`}></div>
            <div className='relative transition-all duration-1000'>
                <div className='mt-3 md:mt-8 flex flex-col justify-center items-center'>
                    <div className="flex flex-col md:relative justify-center items-center text-center w-full">
                        <div className="md:text-2xl text-lg w-7/12">{props.quote}</div>
                        <div className="flex md:absolute md:right-0 items-center justify-center select-none justify-self-end">
                            <div className={"text-2xl md:pl-2 text-center md:pr-4 " + Eph.className}>{"- " + props.author}</div>
                        </div>
                    </div>
                    <div className="p-2 font-extralight text-xs text-center">{props.context}</div>
                    <div className="mt-1 font-extralight text-xs">{props.date}</div>
                    <div className="mt-2 mb-4 font-extralight text-xs">{"Skrevet av: " + props.writtenBy}</div>
                </div>
            </div>

            <div className='flex z-10 align-middle justify-center flex-row text-xs md:right-1 md:bottom-1 md:absolute md:text-base'>
                <div className="flex flex-row space-x-2 justify-center">
                    {groupedReactions && Object.keys(groupedReactions).map((key: string, i: number) => {
                        return (
                            <div key={i + key} className="">
                                <Reaction reaction={key as reaction} users={groupedReactions[key]} addReaction={() => {
                                    addReaction(key as reaction)
                                }} />
                            </div>
                        )
                    })}

                    <button onClick={() => { setNewReactionPickerOpen(true) }} ref={addReactionButtonRef}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                    {newReactionPickerOpen &&
                        <div ref={addReactionScope} className="absolute md:right-0 md:bottom-0 z-50 bg-neutral-700 p-2 rounded-md text-white shadow">
                            <NewReactionPicker addReaction={(reaction) => {
                                addReaction(reaction);
                                setNewReactionPickerOpen(false);
                            }} />
                        </div>}
                </div>
            </div>
        </div>
    );
}