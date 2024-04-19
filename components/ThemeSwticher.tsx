import { useTheme } from "@/util/themeProvider";
import { Switch } from "./ui/switch";
import { useEffect } from "react";
import { theme } from "@/types/types";


export default function ThemeSwticher() {
    const [theme, setTheme] = useTheme();

    useEffect(() => {
        let storedTheme;
        storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme as theme);
    }, [])

    return (
        <div className="flex flex-row mt-2 w-full justify-end">
            <div>
                Colorful
            </div>

            <Switch
                onCheckedChange={(checked) => {
                    localStorage.setItem("theme", checked ? "light-colorful" : "light")
                    setTheme(checked ? "light-colorful" : "light")
                }}
                checked={theme == "light-colorful"}

                className="ml-2"
            />
        </div>
    )

}