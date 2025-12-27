'use client'
import { Button } from "@/components/ui/button";
import { motion , AnimatePresence} from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
type Props={
    onAddCard: ()=>void
}
const AddCardButton=({onAddCard}:Props)=>{
    const [showGap,setShowGap] = useState(false);
    return (
        <>
        <motion.div className="w-full relative overflow-hidden"
        initial={{height:'0.5rem'}}
        animate={{
            height: showGap ? '2rem' : '0.5rem',
            transition: { duration: 0.3 ,ease: 'easeInOut' },
        }}
        onHoverStart={()=>setShowGap(true)}
        onHoverEnd={()=>setShowGap(false)}
        >
            <AnimatePresence>
                {showGap && (
                    <motion.button
                        key="add-card-button"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2,delay:0.1 }}
                        className="absolute inset flex items-center justify-center"
                    >
                        <div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full h-8 w-8 p-0 bg-primary hover:bg-primary"
                                aria-label="Add new card"
                                onClick={onAddCard}>
                                <PlusCircle className="w-4 h-4 text-black"/>
                            </Button>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
        </>
    )
}
export default AddCardButton;