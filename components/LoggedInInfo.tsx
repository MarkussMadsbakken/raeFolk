import { signIn, signOut } from "next-auth/react"
import { Button } from "./input"

interface LoggedInInfoProps {
    user: {
        id: string,
        name: string,
    }
}


export default function LoggedInInfo(props: Readonly<LoggedInInfoProps>) {

    return (
        <div className="flex flex-row items-center justify-center">
            <div>
                {props.user ? props.user.name : "Ikke logget inn"}
            </div>

            <div className="ml-2 text-blue-700 hover:cursor-pointer">
                {props.user ?
                    <button onClick={() => signOut()}>
                        Logg ut
                    </button>
                    :
                    <button onClick={() => signIn()}>
                        Logg inn
                    </button>
                }
            </div>
        </div>
    )

}