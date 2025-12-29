'use client'

import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Loader2, RotateCcw, Sparkles, Wand2, History } from "lucide-react"
import { Input } from "@/components/ui/input"
import useCreativeAIStore from "@/store/useCreativeAIStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import CardList from "../Common/CardList"
import usePromptStore from "@/store/usePromptStore"
import RecentPrompts from "./RecentPrompts"
import { toast } from "sonner"
import { generateCreativePrompt } from "@/actions/chatgpt"
import { OutlineCard } from "@/lib/types"
import { v4 } from "uuid"
import { createProject } from "@/actions/project"
import { useSlideStore } from "@/store/useSlideStore"

type Props = {
    onBack: () => void
}

const CreativeAI = ({ onBack }: Props) => {
    const router = useRouter();
    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string | null>(null)
    const [editText, setEditText] = useState('')
    const { setProject } = useSlideStore()

    const { currentAiPrompt, setCurrentAiPrompt, outlines, resetOutlines, addOutline, addMultipleOutlines } = useCreativeAIStore()
    const [numberOfCards, setNumberOfCards] = useState(0);
    const { prompts, addPrompt } = usePromptStore();

    const handleBack = () => onBack();

    const resetCards = () => {
        setEditingCard(null);
        setSelectedCard(null);
        setEditText('');
        setCurrentAiPrompt('');
        resetOutlines();
        toast.info("Workspace Cleared");
    }

    const generateOutline = async () => {
        if (!currentAiPrompt) {
            toast.error("Input Required", { description: "Please enter a vision for the AI." });
            return;
        }
        setIsGenerating(true);
        try {
            const res = await generateCreativePrompt(currentAiPrompt);
            if (res.status === 200 && res?.data?.outlines) {
                const cardsData: OutlineCard[] = res.data.outlines.map((outline: string, index: number) => ({
                    id: v4(),
                    title: outline,
                    order: index + 1
                }));
                addMultipleOutlines(cardsData);
                setNumberOfCards(cardsData.length);
                toast.success("Intelligence Applied", { description: "Outline generated." });
            }
        } catch (error) {
            toast.error("AI Unavailable", { description: "Failed to connect to the brain." });
        } finally {
            setIsGenerating(false);
        }
    }

    const handleGenerate = async () => {
        if (outlines.length === 0) return;
        setIsGenerating(true);
        try {
            const res = await createProject(currentAiPrompt, outlines.slice(0, numberOfCards));
            if (res.status === 200 && res.data) {
                setProject(res.data);
                addPrompt({
                    id: v4(),
                    title: currentAiPrompt || outlines?.[0]?.title,
                    outlines: outlines,
                    createdAt: new Date().toISOString()
                });
                router.push(`/presentation/${res.data.id}/select-theme`);
            }
        } catch (error) {
            toast.error("Design Failed");
        } finally {
            setIsGenerating(false);
        }
    }

    useEffect(() => {
        setNumberOfCards(outlines.length);
    }, [outlines.length]);

    return (
        <div className="min-h-screen bg-background selection:bg-lavender/30 pb-40">
            <motion.div
                className="max-w-3xl mx-auto px-6 pt-12 space-y-16"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Minimal Header */}
                <nav className="flex items-center justify-between">
                    <button 
                        onClick={handleBack}
                        className="group flex items-center text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 hover:text-primary transition-all duration-500"
                    >
                        <ChevronLeft className="mr-2 h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </nav>

                <header className="space-y-4">
                    <motion.h1 
                        className="highlightedCardText text-5xl sm:text-6xl font-bold tracking-tight leading-none"
                        variants={itemVariants}
                    >
                        Think with AI.
                    </motion.h1>
                    <p className="text-lg text-muted-foreground/60 font-medium">Transform a simple spark into a complete structure.</p>
                </header>

                {/* The Focused Input Puck */}
                <motion.div
                    className="relative group border-b border-black/5 dark:border-white/5 focus-within:border-primary/40 transition-all duration-700 py-6"
                    variants={itemVariants}
                >
                    <div className="flex items-center gap-6">
                        <Input 
                            placeholder="Describe your vision..." 
                            className="text-2xl sm:text-4xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent placeholder:text-muted-foreground font-bold tracking-tight h-auto"
                            value={currentAiPrompt || ''}
                            onChange={(e) => setCurrentAiPrompt(e.target.value)}
                        />
                        
                        <div className="flex items-center gap-2">
                            {/* <Select value={numberOfCards.toString()} onValueChange={(v) => setNumberOfCards(parseInt(v))}>
                                <SelectTrigger className="h-9 w-fit bg-white/50 dark:bg-white/5 border-none text-[10px] font-black uppercase px-4 rounded-full shadow-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-2xl border-none shadow-2xl backdrop-blur-3xl">
                                    {outlines.length === 0 ? <SelectItem value="0">0 Cards</SelectItem> : 
                                        Array.from({ length: outlines.length }, (_, i) => (
                                            <SelectItem key={i+1} value={(i+1).toString()}>{i+1} Slides</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select> */}
                            <button onClick={resetCards} className="p-2 opacity-20 hover:opacity-100 transition-opacity">
                                <RotateCcw className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="pt-8 flex justify-start">
                        <Button 
                            className="rounded-full h-12 px-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all group"
                            onClick={generateOutline}
                            disabled={isGenerating}
                        >
                            {isGenerating ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            Compute Outline
                        </Button>
                    </div>
                </motion.div>

                {/* Card Flow */}
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
                        setEditText={setEditText}
                        setEditingCard={setEditingCard}
                        setSelectedCard={setSelectedCard}
                        onCardDoubleClick={(id, title) => { setEditingCard(id); setEditText(title); }}
                    />
                </div>

                {/* Historical Prompts */}
                {prompts.length > 0 && (
                    <motion.div variants={itemVariants} className="pt-10 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-2 mb-6 opacity-40">
                            <History className="h-3 w-3" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Recent Archives</span>
                        </div>
                        <RecentPrompts />
                    </motion.div>
                )}

                {/* Fixed Action Dock */}
                <AnimatePresence>
                    {outlines.length > 0 && (
                        <motion.div 
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4"
                        >
                            <Button
                                className="w-full h-14 rounded-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all group"
                                onClick={handleGenerate}
                                disabled={isGenerating}
                            >
                                {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                Finalize PPT
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default CreativeAI;