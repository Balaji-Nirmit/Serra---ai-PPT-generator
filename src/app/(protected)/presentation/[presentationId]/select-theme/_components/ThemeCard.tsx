import { Card, CardContent } from "@/components/ui/card"
import { Theme } from "@/lib/types"
import { motion } from "framer-motion"
import Image from "next/image"
type Props = {
    title: string
    description: string
    content: React.ReactNode
    variant: 'left' | 'main' | 'right'
    theme: Theme
    // controls: AnimationControls
    controls: any
}
const ThemeCard = ({
    title,
    description,
    content,
    variant,
    theme,
    controls
}: Props) => {
    const variants = {
        left: {
            hidden: {
                opacity: 0,
                x: '-50%',
                y: '-50%',
                scale: 0.9,
                rotate: 0
            },
            visible: {
                opacity: 1,
                x: '-15%',
                y: '-15%',
                scale: 0.95,
                rotate: -10,
                transition: {
                    type: 'spring' as const,
                    stiffness: 300,
                    damping: 30,
                    delay: 0.1
                }
            }
        },
        right: {
            hidden: {
                opacity: 0,
                x: '50%',
                y: '50%',
                scale: 0.9,
                rotate: 0
            },
            visible: {
                opacity: 1,
                x: '15%',
                y: '15%',
                scale: 0.95,
                rotate: 10,
                transition: {
                    type: 'spring' as const,
                    stiffness: 300,
                    damping: 30,
                    delay: 0.1
                }
            }
        },
        main: {
            hidden: {
                opacity: 0,
                scale: 0.9,
            },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    type: 'spring' as const,
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2
                }
            }
        }

    }
    return (
        <>
            <motion.div initial="hidden" animate={controls} variants={variants[variant]} className="absolute w-full max-w-3xl" style={{ zIndex: variant === 'main' ? 10 : 0 }}>
                <Card className="h-full shadow-2xl backdrop-blur-sm"
                    style={{
                        backgroundColor: theme.slideBackgroundColor,
                        border: `1px solid ${theme.accentColor}20`,
                        padding:'0'
                    }}
                >
                    <div className="flex flex-col md:flex-row">
                        <CardContent className="flex-1 p-8 space-y-6">
                            <div className="space-y-3">
                                <h2 className="text-3xl font-bold tracking-light" style={{ color: theme.accentColor }}>
                                    {title}
                                </h2>
                                <p className="text-lg" style={{ color: `${theme.accentColor}` }}>{description}</p>
                            </div>
                            {content}
                        </CardContent>
                        <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden rounded-r-lg">
                            <Image src="https://plus.unsplash.com/premium_photo-1729015990423-7f3b14f960eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVya3xlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000" alt="Theme preview image" layout="fill" objectFit="cover" className="transition:transform duration-500 hover:scale-110" />
                        </div>
                    </div>
                </Card>
            </motion.div>
        </>
    )
}
export default ThemeCard;