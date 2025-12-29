'use client'
import { OutlineCard } from "@/lib/types";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card as UICard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";

type Props = {
    card: OutlineCard
    isEditing: boolean
    isSelected: boolean
    editText: string
    onEditChange: (value: string) => void
    onEditBlur: () => void
    onEditKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onCardClick: () => void
    onCardDoubleClick: () => void
    onDeleteClick: () => void
    dragHandlers: {
        onDragStart: (e: React.DragEvent) => void
        onDragEnd: () => void
    }
    onDragOver: (e: React.DragEvent) => void
    dragOverStyle: React.CSSProperties
}

const Card = ({
    card,
    isEditing,
    isSelected,
    editText,
    onEditChange,
    onEditBlur,
    onEditKeyDown,
    onCardClick,
    onCardDoubleClick,
    onDeleteClick,
    dragHandlers,
    onDragOver,
    dragOverStyle
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input when editing starts
    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{ y: -4 }}
            className="relative"
        >
            <div 
                style={dragOverStyle} 
                draggable 
                {...dragHandlers}
                onDragOver={onDragOver}
                className="group"
            >
                <UICard
                    className={`
                        relative overflow-hidden transition-all duration-500 cursor-grab active:cursor-grabbing
                        rounded-[2rem] border border-white/20 dark:border-white/5 
                        ${isSelected 
                            ? 'bg-white/80 dark:bg-zinc-900/80 shadow-[0_20px_40px_rgba(0,0,0,0.1)] ring-2 ring-lavender/50' 
                            : 'bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-sm hover:shadow-xl hover:bg-white/60 dark:hover:bg-zinc-900/60'
                        }
                    `}
                    onClick={onCardClick}
                    onDoubleClick={onCardDoubleClick}
                >
                    <div className="flex items-center gap-4 p-2">
                        {/* Order Badge & Drag Icon */}
                        <div className="flex items-center gap-3">
                            <div className="hidden group-hover:flex text-muted-foreground/30 animate-in fade-in zoom-in duration-300">
                                <GripVertical className="h-4 w-4" />
                            </div>
                            <span className={`
                                flex items-center justify-center h-10 w-10 shrink-0 rounded-2xl text-xs font-black
                                transition-all duration-300
                                ${isSelected 
                                    ? 'bg-gradient-to-br from-lavender to-soft-purple text-zinc-900 shadow-md rotate-3' 
                                    : 'bg-secondary/30 text-muted-foreground'
                                }
                            `}>
                                {card.order < 10 ? `0${card.order}` : card.order}
                            </span>
                        </div>

                        {/* Content Area */}
                        <div className="flex-grow min-w-0">
                            {isEditing ? (
                                <Input 
                                    value={editText} 
                                    ref={inputRef}
                                    onChange={(e) => onEditChange(e.target.value)}
                                    onBlur={onEditBlur}
                                    onKeyDown={onEditKeyDown}
                                    className="h-auto border-none bg-transparent p-0 text-lg font-bold tracking-tight focus-visible:ring-0"
                                />
                            ) : (
                                <p className={`
                                    text-lg font-bold tracking-tight truncate transition-colors
                                    ${isSelected ? 'text-foreground' : 'text-muted-foreground/80'}
                                `}>
                                    {card.title || "Untitled Section"}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center">
                            <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteClick();
                                }}
                                className="h-10 w-10 rounded-full hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-all duration-300"
                                aria-label={`Delete Card ${card.order}`}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Subtle Bottom Accent (Selection Only) */}
                    {isSelected && (
                        <motion.div 
                            layoutId="accent-bar"
                            className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lavender via-mint to-peach"
                        />
                    )}
                </UICard>
            </div>
        </motion.div>
    )
}

export default Card;