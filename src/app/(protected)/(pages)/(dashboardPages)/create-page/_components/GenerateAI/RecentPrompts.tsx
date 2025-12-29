'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { containerVariants, itemVariants, timeAgo } from "@/lib/constants";
import useCreativeAIStore from "@/store/useCreativeAIStore";
import usePromptStore from "@/store/usePromptStore";
import {motion} from "framer-motion";
import { toast } from "sonner";
const RecentPrompts = () =>{
    const {prompts,setPage} = usePromptStore();
    const {addMultipleOutlines, setCurrentAiPrompt} = useCreativeAIStore()
    const handleEdit =(id:string)=>{
        const prompt = prompts.find((item)=>item.id === id); 
        if(prompt){
            setPage("creative-ai");
            addMultipleOutlines(prompt?.outlines);
            setCurrentAiPrompt(prompt?.title);
        }else{
            toast.error("Error",{
                description:"Prompt not found"
            })
        }
    }
    return (
        <>
        <motion.div variants={containerVariants}
        className="space-y-4 !mt-20 "
        >
            <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-center">
                Your Recent Prompts
            </motion.h2>
        </motion.div>
        <motion.div variants={containerVariants}
        className="space-y-2 w-full lg:max-w-[80%] mx-auto"
        >
            {prompts.map((item,index)=>(
                <motion.div key={index} variants={itemVariants}>
                    <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300">
                    <div className="max-w-[70%] ">
                        <h3 className="font-semibold text-xl line-clamp-1">{item.title}</h3>
                        <p className="font-semibold text-sm text-muted-foreground">{timeAgo(item?.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-highlightedCardText">Creative AI</span>
                        <Button className="rounded-xl bg-primary-20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary"
                        variant="default"
                        size="sm"
                        onClick={()=>handleEdit(item?.id)}
                        >Edit</Button> 
                    </div>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
        </> 
    )
}
export default RecentPrompts;