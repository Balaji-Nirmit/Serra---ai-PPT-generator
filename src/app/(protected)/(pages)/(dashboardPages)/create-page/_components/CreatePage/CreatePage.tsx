'use client'
import { Button } from "@/components/ui/button";
import { containerVariants, CreatePageCard, itemVariants } from "@/lib/constants";
import { motion } from "framer-motion";
import RecentPrompts from "../GenerateAI/RecentPrompts";
import usePromptStore from "@/store/usePromptStore";
import { useEffect } from "react";
type Props = {
    onSelectOption: (option: string) => void
}
const CreatePage = ({ onSelectOption }: Props) => {
    const {prompts,setPage} = usePromptStore()
    useEffect(()=>{
        setPage("create")
    },[])
    return (
        <motion.div initial="hidden"
            variants={containerVariants}
            animate="visible"
            className="space-y-8"
        >
            <motion.div variants={itemVariants} className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-primary">How would you like to get started?</h1>
                <p className="text-secondary">Choose one of the options below</p>
            </motion.div>
            <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
                {CreatePageCard.map((item, index) => (
                    <motion.div key={item.type} variants={itemVariants}
                        whileHover={{
                            scale: 1.05,
                            rotate: 1,
                            transition: { duration: 0.1 },
                        }} className={`${item.highlight ? 'bg-vivid-gradient' : 'hover: bg-vivid-gradient border'} rounded-xl p-[1px] transition-all duration-300 ease-in-out`}>
                        <motion.div
                            className="w-full p-4 flex flex-col gap-y-6 items-start bg-white dark:bg-black rounded-xl"
                            whileHover={{ transition: { duration: 0.1 } }}
                        >
                            <div className="flex flex-col items-start w-full gap-y-3">
                                <div>
                                    <p className="text-primary text-lg font-semibold">{item.title}</p>
                                    <p className={`${item.highlight ? 'text-vivid' : 'text-primary'} text-4xl font-bold`}>{item.highlightedText}</p>
                                </div>
                                <p className="text-secondary text-sm font-normal">{item.description}</p>
                            </div>
                            <motion.div
                            className="self-end"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant={item.highlight ? 'default' : 'outline'}
                                className="w-fit rounded-xl font-bold"
                                size={'sm'}
                                onClick={() => onSelectOption(item.type)}
                            >{item.highlight ? 'Generate' : 'Continue'}</Button>
                        </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
            {prompts.length>0 && < RecentPrompts/>}
        </motion.div>
    )
}
export default CreatePage;