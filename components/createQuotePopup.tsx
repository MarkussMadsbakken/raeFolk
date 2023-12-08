"use client"

import { Button, TextInput } from "@/components/input";
import { animate, useAnimate, stagger } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CreateQuotePopup({ createQuote }: { createQuote: (quote: string, author: string, context: string, writtenBy: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [borderAnimationScope, animateBorder] = useAnimate();
    const [buttonAnimationScope, animateButton] = useAnimate();
    const [contentAnimationScope, animateContent] = useAnimate();
    let [quote, setQuote] = useState("");
    let [author, setAuthor] = useState("");
    let [context, setContext] = useState("");
    let [writtenBy, setWrittenBy] = useState("");

    useEffect(() => {
        //checks if a click is outside the dropdown box
        function checkClick(e: MouseEvent) {
            if (!borderAnimationScope.current.contains(e.target) && !buttonAnimationScope.current.contains(e.target)) {
                setIsOpen(false);
                window.removeEventListener("click", checkClick);
            }
        }

        //adds an event listener to the window to check if a click is outside the dropdown box
        if (isOpen) {
            window.addEventListener("click", checkClick);
        }

        animate(borderAnimationScope.current,
            isOpen
                ? { width: "fit-content", padding: "0.5rem" }
                : { width: 0, padding: 0 },
            {
                duration: 0.2,
                ease: "easeOut",
            },

        )

        animate(borderAnimationScope.current,
            isOpen
                ? { height: "fit-content" }
                : { height: 0 },
            {
                duration: 0.2,
                ease: "easeOut",
                delay: isOpen ? 0.2 : 0
            },
        )

        animate(borderAnimationScope.current,
            isOpen
                ? { display: "absolute" }
                : { display: "none" },
            {
                duration: 0,
                delay: isOpen ? 0.2 : 0
            },
        )

        //removes the event listener when the component is unmounted
        return () => {
            window.removeEventListener("click", checkClick);
        };



    }, [isOpen, borderAnimationScope, buttonAnimationScope]);

    const staggerItems = stagger(0.1, { startDelay: 0.2 });
    useEffect(() => {
        animate(".stagger",
            isOpen
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -20 },
            {
                duration: 0.2,
                ease: "easeOut",
                delay: isOpen ? staggerItems : 0
            },
        )
    }, [isOpen, contentAnimationScope, staggerItems]);

    return (
        <div className="flex flex-col items-center justify-center" ref={buttonAnimationScope}>
            <Button variant="primary" onClick={() => setIsOpen(!isOpen)}>
                Legg til sitat
            </Button>
            <div className="h-0 w-0 absolute top-10 rounded-lg bg-neutral-300" ref={borderAnimationScope}>
                <div ref={contentAnimationScope} className="flex flex-col items-center">
                    <div className="flex flex-col w-[30rem] space-y-4 mt-2">
                        <div className="text-lg text-center stagger">
                            Legg til sitat
                        </div>
                        <TextInput placeholder="Hvem?" className="w-full stagger h-10" onChange={e => setAuthor(e)} />
                        <TextInput placeholder="Sitat" className="w-full stagger h-10" onChange={e => setQuote(e)} />
                        <TextInput placeholder="Kontekst" className="w-full stagger h-10" onChange={e => setContext(e)} />
                        <TextInput placeholder="Forfatter" className="w-full stagger h-10" onChange={e => setWrittenBy(e)} />
                        <Button variant="primary" className="w-full stagger h-10" onClick={() => { createQuote?.(author, quote, context, writtenBy); setIsOpen(false) }}>
                            Legg til sitat
                        </Button>
                    </div>
                </div >
            </div >
        </div >
    );
}