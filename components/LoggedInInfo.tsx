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
        <div className="flex flex-row items-center justify-center rounded border">
            <div>
                {props.user.name}
            </div>

            <div>
                <Button variant={"primary"} className={"w-8 h-6"} onClick={signOut}>Logg ut</Button>
            </div>
        </div>
    )

}