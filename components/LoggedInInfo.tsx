import { signOut } from "next-auth/react"
import { Button } from "./input"

interface LoggedInInfoProps {
    user: {
        id: string,
        name: string,
    }
}


export default function LoggedInInfo(props: Readonly<LoggedInInfoProps>) {

    if (!props.user) return null

    return (
        <div className="flex flex-row items-center justify-center">
            <div>
                {props.user.name}
            </div>

            <div className="ml-2 text-blue-700 hover:cursor-pointer">
                <button onClick={() => signOut()}>
                    Logg ut
                </button>
            </div>
        </div>
    )

}