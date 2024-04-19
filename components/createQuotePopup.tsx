"use client"

import { Button, Dropdown, DropdownItem, TextInput } from "@/components/input";
import { animate, useAnimate, stagger } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { use, useEffect, useRef, useState } from "react";

export default function CreateQuotePopup({ createQuote }: { createQuote: (quote: string, author: number, context: string, writtenBy: number) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [borderAnimationScope, animateBorder] = useAnimate();
    const [buttonAnimationScope, animateButton] = useAnimate();
    const [contentAnimationScope, animateContent] = useAnimate();
    const [authors, setAuthors] = useState<{ id: number, username: string }[]>([]);
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState<number>(-1);
    const [context, setContext] = useState("");
    const session = useSession();

    const fetchUsers = async () => {
        await fetch("/api/users", { method: "GET" })
            .then(res => res.text())
            .then(res => JSON.parse(res)).then((res) => {
                setAuthors(res.rows);
            });
    }

    useEffect(() => {
        fetchUsers();
    }, [])

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
            <Button variant="primary" onClick={() => {
                if (!session.data?.user) {
                    signIn();
                    return;
                }

                setIsOpen(!isOpen)
            }}>
                Legg til sitat
            </Button>
            <div className="h-0 w-0 hidden absolute top-40 z-50 rounded-lg bg-white shadow-lg shadow-neutral-600 border-2 border-white" ref={borderAnimationScope}>
                <div ref={contentAnimationScope} className="flex flex-col items-center">
                    <div className="flex flex-col w-80 md:w-[30rem] space-y-4 mt-2">
                        <div className="text-lg text-center stagger">
                            Legg til sitat
                        </div>
                        <div className="flex w-full stagger justify-center content-center">
                            {authors.length === 0 ? <div className="w-full h-12 flex justify-center items-center">Laster inn forfattere...</div> :
                                <Dropdown open={-1} className="stagger w-full">
                                    {authors.map((author, i) => (
                                        <DropdownItem key={i} onSelect={() => setAuthor(author.id)}>
                                            {author.username}
                                        </DropdownItem>
                                    ))}
                                </Dropdown>
                            }
                        </div>
                        <TextInput placeholder="Sitat" className="w-full stagger h-12 rounded-md" onChange={e => setQuote(e)} />
                        <TextInput placeholder="Kontekst" className="w-full stagger h-12 rounded-md" onChange={e => setContext(e)} />
                        <Button variant="primary" className="w-full stagger h-12 rounded-md" onClick={() => { createQuote?.(quote, author, context, session.data?.user.id); setIsOpen(false) }}>
                            Legg til sitat
                        </Button>
                    </div>
                </div >
            </div >
        </div >
    );
}