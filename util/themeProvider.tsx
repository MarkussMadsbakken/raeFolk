"use client"

import { theme } from "@/types/types";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";

const themeContext = createContext<[theme, Dispatch<SetStateAction<theme>>]>(["light", () => { }]);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {


    const [currentTheme, setCurrentTheme] = useState<theme>("light");
    const contextValue = useMemo<[theme, Dispatch<SetStateAction<theme>>]>(() => [currentTheme, setCurrentTheme], [currentTheme, setCurrentTheme]);

    return (
        <themeContext.Provider value={contextValue}>
            {children}
        </themeContext.Provider>
    )
}

export function useTheme() {
    return useContext(themeContext);
}