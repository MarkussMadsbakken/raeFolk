"use client"
import { HOSTED_URL, quote, userReaction } from "@/types/types";
import Quote from "./quote";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Close, OpenInNewWindow, Share } from "./icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useToast } from "@/util/toastProvider";

export default function QuotePopup({ quote, reactions, onClose }: { quote: quote, reactions?: userReaction[], onClose: () => void }) {

    const popupref = useRef<HTMLDivElement>(null);
    const [isOpening, setIsOpening] = useState<boolean>(true);
    const isOpeningRef = useRef(isOpening);

    useEffect(() => {

        //checks if a click is outside the dropdown box
        const checkClick = (e: MouseEvent) => {
            if (!popupref.current?.contains(e.target as Node) && !isOpeningRef.current) {
                onClose();
                window.removeEventListener("click", checkClick);
            }
        }

        //adds an event listener to the window to check if a click is outside the dropdown box
        window.addEventListener("click", checkClick);

        return () => {
            window.removeEventListener("click", checkClick);
        }
    }, [])


    useEffect(() => {
        isOpeningRef.current = isOpening;
    }, [isOpening])

    return (
        <div className="relative z-50">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center md:items-center md:p-0 pb-20">
                    <motion.div
                        className="flex flex-col justify-center bg-white rounded-lg shadow-lg md:p-2 w-11/12 md:w-2/3 max-w-4xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        ref={popupref}
                        onAnimationComplete={() => setIsOpening(false)}
                    >
                        <div className="flex justify-end pt-2 pr-2">
                            <QuotePopupCloseButton onClick={onClose} />
                        </div>
                        <div className="w-full md:h-80 h-60 flex flex-row justify-center md:mb-4">
                            <Quote
                                author={quote.author}
                                context={quote.context}
                                date={quote.date}
                                id={quote.id}
                                quote={quote.quote}
                                writtenBy={quote.writtenby}
                            />
                        </div>
                        <div>
                            <QuotePopupActionButtons quoteId={quote.id} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
};

function QuotePopupCloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button className="w-6 h-6" onClick={onClick}>
            <Close />
        </button>
    )
}

function QuotePopupActionButtons({ quoteId }: { quoteId: string }) {
    const pathname = usePathname();
    const queryParams = useSearchParams();
    const toast = useToast();
    return (
        <div className="flex space-x-4 p-4 justify-center">
            <button className="w-5 h-5" onClick={() => {
                navigator.clipboard.writeText(HOSTED_URL + "?highlight=" + quoteId);
                toast.enqueue({ title: "Kopiert", fade: 1000 })
            }}>
                <Share />
            </button>
            <Link className="w-5 h-5" href={"/quote/" + quoteId} target={"_blank"}>
                <OpenInNewWindow />
            </Link>
        </div >
    )
}