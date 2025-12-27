"use client"
import { itemVariants, themes, timeAgo } from "@/lib/constants";
import { Projects } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ThumnailPreview from "./thumbnail-preview";
type Props = {
    projectId: Projects['id'];
    title: Projects['title'];
    src: Projects['thumbnail'];
    createdAt: Projects['createdAt'];
    slideData: Projects['slides'];
    isDeleted: Projects['isDeleted'];
    themeName: Projects['themeName'];
}
const ProjectCard = ({
    projectId,
    title,
    src,
    createdAt,
    slideData,
    isDeleted,
    themeName
}: Props) => {
    const { setSlides } = useSlideStore();
    const router = useRouter();
    const handleNavigation = () => {
        setSlides(JSON.parse(JSON.stringify(slideData)));
        router.push(`/presentation/${projectId}`);
    }
    const theme = themes.find((theme) => theme.name === themeName) || themes[0];
    return (
        <>
            <motion.div variants={itemVariants} className={`group w-full flex flex-col  gap-y-3 rounded-xl p-3 transition-colors ${!isDeleted && 'hover:bg-muted/50'}`}
            >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer" onClick={handleNavigation}>
                    <ThumnailPreview theme={theme}
                    // slide={JSON.parse(JSON.stringify(slideData))?.[0]}
                    />
                </div>
                <div className="w-full">
                    <div className="space-y-1 ">
                        <h3 className="font-semibold text-base text-primary line-clamp-1 ">{title}</h3>
                        <div className="flex w-full justify-between items-center gap-2">
                            <p className="text-sm text-muted-foreground" suppressHydrationWarning>{timeAgo(createdAt)}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
export default ProjectCard;