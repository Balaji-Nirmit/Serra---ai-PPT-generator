"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Loader2, RotateCcw } from "lucide-react"
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
import { fi, ro } from "date-fns/locale"
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
    const handleBack = () => {
        onBack();
    }
    const resetCards = () => {
        setEditingCard(null);
        setSelectedCard(null);
        setEditText('');

        setCurrentAiPrompt('');
        resetOutlines();
    }
    const generateOutline = async () => {
        if(currentAiPrompt===""){
            toast.error("Error",{
                description:"Please enter a prompt"
            })
            return
        }
        setIsGenerating(true);
        const res =  await generateCreativePrompt(currentAiPrompt)
        if(res.status===200 && res?.data?.outlines){
            const cardsData:OutlineCard[] = []
            res.data?.outlines.map((outline:string,index:number)=>{
                const newCard = {
                    id: v4(),
                    title: outline,
                    order:index+1
                }
                cardsData.push(newCard);
            })
            addMultipleOutlines(cardsData);
            setNumberOfCards(cardsData.length);
            toast.success("Success",{
                description:"Outlines generated successfully"
            });
        }else{
            toast.error("Error",{
                description:"Failed to generate outlines. Please try again."
            });
        }
        setIsGenerating(false);
        
    }
    const handleGenerate = async () => {
        setIsGenerating(true);
        if( outlines.length===0 ){
            toast.error("Error",{
                description:"Please generate outlines before creating a presentation."
            })
            setIsGenerating(false);
            return;
        }try{
            const res = await createProject(currentAiPrompt, outlines.slice(0, numberOfCards));
            if(res.status!==200 || !res.data){
                throw new Error('Unable to create project')
            }
            router.push(`/presentation/${res.data.id}/select-theme`);
            setProject(res.data);
            addPrompt({
                id: v4(),
                title: currentAiPrompt || outlines?.[0]?.title,
                outlines:outlines,
                createdAt: new Date().toISOString()
            })
            toast.success('Success',{
                description:"Presentation created successfully."
            })
            setCurrentAiPrompt('');
            resetOutlines();
        }catch(error){
            toast.error("Error",{
                description:"Failed to create presentation. Please try again."
            })
        }finally{
            setIsGenerating(false);
        }
    }
    useEffect(()=>{
        setNumberOfCards(outlines.length);
    },[outlines.length])
    return (
        <>
            <motion.div
                className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible">
                <Button onClick={handleBack}
                    variant="outline"
                    className="mb-4">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <motion.div variants={itemVariants} className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-primary"> Create With AI</h1>
                </motion.div>
                <motion.div
                    className="bg-primary/10 p-4 rounded-xl"
                    variants={itemVariants}
                >
                    <div className="flex flex-col sm:flex-row justify-between gap-3 items-center rounded-xl">
                        <Input placeholder="enter prompt" className="text-base sm:text-xl border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent flex-grow" required
                            value={currentAiPrompt || ''}
                            onChange={(e) => setCurrentAiPrompt(e.target.value)}
                        />
                        <div className="flex items-center gap-3">
                            <Select value={numberOfCards.toString()}
                                onValueChange={(value) => setNumberOfCards(parseInt(value))}>
                                <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                                    <SelectValue placeholder="select number of cards" />
                                </SelectTrigger>
                                <SelectContent className="w-fit">
                                    {outlines.length === 0 ? (
                                        <SelectItem value="0" className="font-semibold">No Cards</SelectItem>
                                    ) : (
                                        Array.from({ length: outlines.length }, (_, index) => index + 1).map((num) => <SelectItem key={num} value={num.toString()} className="font-semibold">
                                            {num} {num === 1 ? "Card" : "Cards"}
                                        </SelectItem>)
                                    )}
                                </SelectContent>
                            </Select>
                            <Button variant="destructive" onClick={resetCards} size="icon" aria-label="Reset Cards"><RotateCcw className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </motion.div>
                <div className="w-full flex justify-center items-center">
                    <Button className="font-medium text-lg flex gap-2 items-center"
                        onClick={generateOutline}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="animate-spin mr-2" />Generating...</>
                        ) : (
                            'Generate Outlines'
                        )}
                    </Button>
                </div>
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
                    onCardDoubleClick={(id: string, title: string) => {
                        setEditingCard(id);
                        setEditText(title);

                    }}
                />
                {outlines.length > 0 && (
                    <Button
                    className="w-full"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    >{isGenerating?<>
                    <Loader2 className="animate-spin mr-2"/> Generating...
                    </>:'Generate PPT'}</Button>
                )}
                {prompts.length > 0 && <RecentPrompts/>}
            </motion.div>
        </>
    )
}
export default CreativeAI;