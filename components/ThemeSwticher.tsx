import { useTheme } from "@/util/themeProvider";
import { Switch } from "./ui/switch";


export default function ThemeSwticher() {
    const [theme, setTheme] = useTheme();

    return (
        <div className="flex flex-row mt-2">
            <div>
                Colorful
            </div>

            <Switch
                onCheckedChange={(checked) => {
                    setTheme(checked ? "light-colorful" : "light")
                }}
                checked={theme == "light-colorful"}

                className="ml-2"
            />
        </div>
    )

}