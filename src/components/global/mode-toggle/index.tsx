'use client'

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
    }, [])
    if (!mounted) {
        return null;
    }
    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="relative h-10 w-10 rounded-xl border border-zinc-200 bg-white/50 backdrop-blur-md transition-all duration-300 hover:bg-zinc-100 hover:ring-4 hover:ring-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:bg-zinc-900 dark:hover:ring-zinc-900/50"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-amber-500" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-blue-400" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </>
    )
}
export default ThemeSwitcher;