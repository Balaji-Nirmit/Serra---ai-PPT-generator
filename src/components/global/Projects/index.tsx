'use client'
import { containerVariants } from "@/lib/constants";
import { Projects } from "@/lib/types";
import { motion } from "framer-motion";
import ProjectCard from "../project-card";
type Props = {
    projects: Projects[]
}
const Project =({projects}:Props)=>{
    return (
        <>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" initial="hidden" animate="visible" variants={ containerVariants }>
            {projects.map((item,index)=><ProjectCard key={item.id} 
            projectId={item?.id}
            title={item?.title}
            src={item?.thumbnail}
            createdAt={item?.createdAt}
            slideData={item?.slides}
            isDeleted={item?.isDeleted}
            themeName={item?.themeName}
            />)}
        </motion.div>
        </>
    ) 
}
export default Project;