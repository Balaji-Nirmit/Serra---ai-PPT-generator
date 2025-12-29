'use client'

import { generateLayouts } from "@/actions/chatgpt";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2, Check, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
    selectedTheme: Theme
    themes: Theme[]
    onThemeSelect: (theme: Theme) => void
}

const ThemePicker = ({
    selectedTheme,
    themes,
    onThemeSelect
}: Props) => {
    const router = useRouter();
    const params = useParams();
    const { project, setSlides, currentTheme } = useSlideStore();
    const [loading, setLoading] = useState(false);

    const handleGenerateLayouts = async () => {
        setLoading(true);
        if (!selectedTheme) {
            toast.error("Selection Required", { description: "Please pick a visual identity." })
            setLoading(false);
            return;
        }
        try {
            const res = await generateLayouts(params.presentationId as string, currentTheme.name);
            if (res.status !== 200 || !res?.data) throw new Error();
            
            toast.success('Architecture Ready', { description: "Layouts synchronized successfully." });
            router.push(`/presentation/${project?.id}`);
            setSlides(res.data);
        } catch (error) {
            toast.error("Generation Failed", { description: "Please check your connection." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <aside 
            className="w-[420px] h-screen flex flex-col border-l border-white/10 backdrop-blur-3xl transition-all duration-1000 sticky top-0 right-0 overflow-hidden"
            style={{ 
                backgroundColor: `${selectedTheme.sidebarColor || selectedTheme.backgroundColor}cc`,
            }}
        >
            {/* Header: Fixed at Top */}
            <div className="p-10 pb-8 space-y-8 flex-shrink-0 z-20 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
                <div className="space-y-1">
                    <motion.span 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40"
                        style={{ color: selectedTheme.accentColor }}
                    >
                        Design System
                    </motion.span>
                    <h2 className="text-4xl font-bold tracking-tighter" style={{ color: selectedTheme.accentColor }}>
                        Gallery.
                    </h2>
                </div>

                <Button 
                    disabled={loading}
                    className="w-full h-16 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden relative"
                    style={{
                        backgroundColor: selectedTheme.accentColor,
                        color: selectedTheme.backgroundColor
                    }} 
                    onClick={handleGenerateLayouts}
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Building Narrative</span>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="ready"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                                <span>Generate Theme</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {/* Shimmer Effect */}
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%]"
                        animate={{ translateX: '200%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </Button>
            </div>

            {/* Scrollable Gallery: Now with flex-1 to fill remaining space */}
            <ScrollArea className="flex-1 w-full h-full custom-scrollbar">
                <div className="px-10 pb-32 space-y-6">
                    {themes.map((theme) => {
                        const isSelected = selectedTheme.name === theme.name;
                        return (
                            <motion.div 
                                key={theme.name}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <button 
                                    onClick={() => onThemeSelect(theme)} 
                                    className="relative flex flex-col w-full h-48 rounded-[2.5rem] overflow-hidden p-8 transition-all duration-700 text-left"
                                    style={{
                                        fontFamily: theme.fontFamily,
                                        color: theme.fontColor,
                                        background: theme.gradientBackground || theme.backgroundColor,
                                        boxShadow: isSelected ? `0 30px 60px -15px ${theme.accentColor}40` : '0 4px 20px rgba(0,0,0,0.05)',
                                        border: isSelected ? `2.5px solid ${theme.accentColor}` : `1px solid ${theme.accentColor}10`
                                    }}
                                >
                                    {/* Selected Indicator */}
                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div 
                                                initial={{ scale: 0, opacity: 0 }} 
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="absolute top-8 right-8 h-7 w-7 rounded-full flex items-center justify-center bg-white shadow-xl"
                                            >
                                                <Check className="h-4 w-4 text-black stroke-[4px]" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="h-full flex flex-col justify-between">
                                        <div className="space-y-1">
                                            <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Identity</div>
                                            <div className="text-2xl font-bold tracking-tighter leading-none">{theme.name}</div>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <div className="text-5xl font-bold leading-none tracking-tighter" style={{ color: theme.accentColor }}>
                                                Aa
                                            </div>
                                            <div className="h-1.5 w-12 rounded-full opacity-20 mb-2" style={{ backgroundColor: theme.accentColor }} />
                                        </div>
                                    </div>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </ScrollArea>

            {/* Subtle Gradient Shadow for Scrolling */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-10" />
        </aside>
    )
}

export default ThemePicker;