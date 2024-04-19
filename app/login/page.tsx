"use client"
import { Button, TextInput } from "@/components/input"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/util/toastProvider"

export default function Login() {
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [wrongPasswordMessage, setWrongPasswordMessage] = useState("")
    const [wrongCredentials, setWrongCredentials] = useState(false)

    const passordWrongMessages = [
        "Straight up feil passord eller brukernavn!",
        "Passordet eller brukernavnet var ikke riktig no cap!",
    ]

    const router = useRouter()
    const toast = useToast()

    function logIn(username: String, password: String) {

        signIn("credentials", {
            username: username,
            password: password,
            redirect: false
        }).then((res) => {
            if (res?.error) {
                if (res.error === "CredentialsSignin") {
                    setWrongCredentials(true)
                    setWrongPasswordMessage(passordWrongMessages[Math.floor(Math.random() * passordWrongMessages.length)])
                    return;
                }

                toast.enqueue({ title: "Error", text: res.error, variant: "error" })
            } else {
                router.push("/")
            }
        });
    }

    return (
        <div className="flex flex-col items-center justify-center max-h-screen">
            <TextInput placeholder="Username" className="md:w-1/3 w-2/3 h-14 mt-40" onChange={(s) => setUsername(s)} />
            <TextInput placeholder="Password" className="md:w-1/3 w-2/3 h-14 mt-4" onChange={(s) => setPassword(s)} onSubmit={() => logIn(username, password)} onEnterClear={true} type="password" />
            <Button variant="primary" className="md:w-1/3 w-2/3 h-14 mt-4" onClick={() => {
                logIn(username, password);
            }}>Login</Button>
            {wrongCredentials && <div className="text-red-500 mt-2">{wrongPasswordMessage}</div>}
        </div>
    )
}



