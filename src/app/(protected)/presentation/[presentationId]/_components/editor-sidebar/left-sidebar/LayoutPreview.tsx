'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSlideStore } from "@/store/useSlideStore"
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Sparkles, Plus } from "lucide-react";
import DraggableSlidePreview from "./DraggableSlidePreview";

type Props = {}

const LayoutPreview = ({}: Props) => {
    const { reorderSlides, getOrderedSlides, currentTheme } = useSlideStore();
    const slides = getOrderedSlides();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLoading(false);
        }
    }, [])

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        reorderSlides(dragIndex, hoverIndex)
    }

    return (
        <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-72 h-[calc(100vh-120px)] fixed left-6 top-28 rounded-[3rem] border-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-2xl z-40 overflow-hidden"
            style={{ 
                backgroundColor: `${currentTheme.backgroundColor}cc`,
                borderColor: `${currentTheme.accentColor}10`,
                color: currentTheme.accentColor
            }}
        >
            <ScrollArea className="h-full w-full custom-scrollbar" suppressHydrationWarning>
                {loading ? (
                    <div className="w-full p-8 flex flex-col space-y-8">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-32 w-full rounded-[2rem] opacity-20" />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 pb-32 flex flex-col">
                        {/* Soft Header */}
                        <div className="flex items-center justify-between px-2 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-2xl bg-current/5">
                                    <Layout className="w-4 h-4 opacity-70" />
                                </div>
                                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40">
                                    Storyline
                                </h2>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-current/5 text-[10px] font-black tracking-widest opacity-60">
                                {slides.length}
                            </span>
                        </div>

                        {/* Slide List */}
                        <div className="flex flex-col gap-6">
                            <AnimatePresence mode="popLayout">
                                {slides.map((slide, index) => (
                                    <motion.div
                                        key={slide.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="relative group"
                                    >
                                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                        <DraggableSlidePreview
                                            slide={slide}
                                            index={index}
                                            moveSlide={moveSlide}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Cute Action Trigger */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-8 w-full py-4 rounded-[2rem] border-2 border-dashed border-current/10 flex items-center justify-center gap-3 hover:bg-current/5 transition-all group"
                        >
                            <Plus className="w-4 h-4 opacity-40 group-hover:rotate-90 transition-transform duration-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Add Scene</span>
                        </motion.button>
                    </div>
                )}
            </ScrollArea>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
        </motion.div>
    )
}

export default LayoutPreview;