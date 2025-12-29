'use client'
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
    onAddCard: () => void
}

const AddCardButton = ({ onAddCard }: Props) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div 
            className="relative w-full flex items-center justify-center"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ height: "0.75rem" }}
            animate={{ 
                height: isHovered ? "3.5rem" : "0.75rem",
            }}
            transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30 
            }}
        >
            {/* The Interactive Line */}
            <motion.div 
                className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"
                animate={{ 
                    opacity: isHovered ? 1 : 0.4,
                    scaleX: isHovered ? 1 : 0.8,
                    background: isHovered 
                        ? "linear-gradient(90deg, transparent 0%, var(--color-lavender) 50%, transparent 100%)"
                        : "linear-gradient(90deg, transparent 0%, var(--color-border) 50%, transparent 100%)"
                }}
            />

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        key="add-button-container"
                        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
                        className="relative z-10"
                    >
                        <Button
                            variant="outline"
                            onClick={onAddCard}
                            className="
                                group flex items-center gap-2 rounded-full 
                                h-9 px-4 border-none
                                bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md 
                                shadow-[0_8px_20px_rgba(0,0,0,0.1)] 
                                hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)]
                                hover:scale-105 active:scale-95 transition-all
                            "
                        >
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-lavender/20 text-lavender group-hover:bg-lavender group-hover:text-white transition-colors">
                                <Plus className="h-3 w-3 stroke-[3px]" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-foreground">
                                Insert Card
                            </span>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default AddCardButton;