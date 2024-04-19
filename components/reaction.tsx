import { reaction, reactionDescription, reactionMap } from "@/types/types"
import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

interface ReactionProps {
    users: [
        { name: string, id: string }
    ],
    reaction: reaction,
    addReaction: () => void
}


export default function Reaction(props: Readonly<ReactionProps>) {

    const [hover, setHover] = useState(false);
    const [fadeIn, animateFadeIn] = useAnimate();
    let timeout: NodeJS.Timeout | undefined = undefined;

    useEffect(() => {
        const startAnimateFadeIn = async () => {
            fadeIn.current.style.display = "block"
            animateFadeIn(fadeIn.current, { opacity: 1 }, { duration: 0.2 })
        }

        const startAnimateFadeOut = async () => {
            animateFadeIn(fadeIn.current, { opacity: 0 }, { duration: 0.2 })
            if (!fadeIn.current) { return }
            fadeIn.current.style.display = "none"
        }

        if (!fadeIn.current) {
            return
        }

        if (hover) {
            startAnimateFadeIn()
            return
        }

        startAnimateFadeOut()

    }, [hover]);


    const onMouseEnter = () => {
        timeout = setTimeout(() => {
            setHover(true)
        }, 500);
    }

    const onMouseLeave = () => {
        clearTimeout(timeout)
        setHover(false)

    }

    const usersString = props.users.map((user) => user.name).map((name, index) => {
        if (index === 0) {
            return name
        }
        if (index === 1) {
            return ` og ${name}`
        }
        return `, ${name}`
    })

    usersString.push(" " + reactionDescription[props.reaction as keyof typeof reactionDescription])

    return (
        <>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="grid grid-cols-2 justify-center content-center cursor-pointer select-none" onClick={props.addReaction}>
                <div className="h-fit text-center">
                    {props.users.length}
                </div>
                <div className="h-fit text-center">{reactionMap[props.reaction as keyof typeof reactionMap]}
                </div>
            </div>
            <div className="absolute z-50 opacity-0 text-center -translate-x-16 w-48 text-sm mt-1 bg-neutral-700 p-2 rounded-md text-white shadow" ref={fadeIn}>
                {usersString}
            </div>
        </>
    )
}