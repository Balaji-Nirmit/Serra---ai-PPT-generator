'use client'

import { useSlideStore } from "@/store/useSlideStore"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ChevronLeft, RotateCwIcon, Sparkles, Plus, Layout } from "lucide-react"
import useScratchStore from "@/store/useScratchStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import CardList from "../Common/CardList"
import { OutlineCard } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { createProject } from "@/actions/project"

type Props = {
    onBack: () => void
}

const ScratchPage = ({ onBack }: Props) => {
    const router = useRouter();
    const { outlines, resetOutlines, addOutline, addMultipleOutlines } = useScratchStore()
    const { setProject } = useSlideStore()
    
    const [editText, setEditText] = useState('')
    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null)

    const handleBack = () => {
        resetOutlines();
        onBack();
    }

    const handleAddCard = () => {
        if (!editText.trim()) return;
        const newCard: OutlineCard = {
            id: uuidv4(),
            title: editText,
            order: outlines.length + 1
        }
        setEditText('');
        addOutline(newCard);
    }

    const handleGenerate = async () => {
        if (outlines.length === 0) return toast.error("Canvas is empty");
        const res = await createProject(outlines?.[0]?.title, outlines)
        if (res.status === 200 && res.data) {
            setProject(res.data);
            resetOutlines();
            router.push(`/presentation/${res.data.id}/select-theme`);
        }
    }

    return (
        <div className="min-h-screen bg-background selection:bg-lavender/30 overflow-x-hidden pb-40">
            <motion.div 
                className="max-w-2xl mx-auto px-6 py-12 space-y-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Minimalist Top Nav */}
                <nav className="flex items-center justify-between">
                    <button 
                        onClick={handleBack}
                        className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-foreground transition-all"
                    >
                        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>
                </nav>

                {/* Refined Header */}
                <header className="space-y-3">
                    <motion.h1 
                        className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
                        variants={itemVariants}
                    >
                        Draft your <br /> <span className="text-muted-foreground/40 italic">outline.</span>
                    </motion.h1>
                    <p className="text-sm text-muted-foreground/60 font-medium">Define the core narrative for your presentation.</p>
                </header>

                {/* Lightweight Input Area */}
                <motion.div
                    className="relative border-b border-foreground/5 focus-within:border-primary/30 transition-all duration-500 py-6"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-6">
                        <Input 
                            value={editText} 
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddCard()}
                            placeholder="Type a section title..." 
                            className="text-2xl sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent placeholder:text-muted-foreground font-bold tracking-tight h-auto"
                        />
                        <div className="flex items-center gap-3">
                            {/* <Select value={outlines.length > 0 ? outlines.length.toString() : '0'}>
                                <SelectTrigger className="h-8 w-fit bg-secondary/30 border-none rounded-full px-4 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl backdrop-blur-3xl">
                                    {outlines.length === 0 ? <SelectItem value="0">0 Cards</SelectItem> : 
                                        Array.from({ length: outlines.length }, (_, i) => (
                                            <SelectItem key={i+1} value={(i+1).toString()}>{i+1} Cards</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select> */}
                            <button onClick={() => { setEditText(''); resetOutlines(); }} className="text-muted-foreground/20 hover:text-destructive transition-colors">
                                <RotateCwIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* The List: Clean Stack */}
                <div className="space-y-2">
                    <CardList
                        outlines={outlines}
                        addOutline={addOutline}
                        addMultipleOutlines={addMultipleOutlines}
                        editingCard={editingCard}
                        selectedCard={selectedCard}
                        editText={editText}
                        onEditChange={setEditText}
                        onCardSelect={setSelectedCard}
                        onCardDoubleClick={(id, title) => { setEditingCard(id); setEditText(title); }}
                        setEditText={setEditText}
                        setEditingCard={setEditingCard}
                        setSelectedCard={setSelectedCard}
                    />
                </div>

                {/* Floating Action Dock: Apple Dock Style */}
                <motion.div 
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-6 z-50"
                    variants={itemVariants}
                >
                    <div className="flex items-center justify-between p-2 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-3xl border border-white/20 dark:border-white/5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                        <Button 
                            onClick={handleAddCard}
                            variant="ghost"
                            className="flex-1 rounded-full h-11 bg-transparent hover:bg-white/20 dark:hover:bg-white/5 font-bold text-[11px] uppercase tracking-widest"
                        >
                            <Plus className="w-4 h-4 mr-2 stroke-[3px]" />
                            Add Card
                        </Button>

                        <AnimatePresence>
                            {outlines.length > 0 && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8, x: 10 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: 10 }}
                                    onClick={handleGenerate}
                                    className="h-11 px-8 rounded-full bg-foreground text-background font-black text-[11px] uppercase tracking-[0.15em] flex items-center shadow-lg hover:scale-105 active:scale-95 transition-all group overflow-hidden relative"
                                >
                                    <Sparkles className="w-3.5 h-3.5 mr-2 text-lavender fill-current" />
                                    Generate
                                    <motion.div 
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%]"
                                        animate={{ translateX: '200%' }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default ScratchPage;