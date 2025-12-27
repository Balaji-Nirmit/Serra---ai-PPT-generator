'use client'
import { useSlideStore } from '@/store/useSlideStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MasterRecursiveComponent } from '../editor/MasterRecursiveComponent';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
type Props = {
    onClose: () => void
}
const PresentationMode = ({ onClose }: Props) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const { currentTheme, getOrderedSlides } = useSlideStore()
    const slides = getOrderedSlides()
    const isLastSlide = (currentSlideIndex - slides.length - 1) === 0
    const goToPreviousSlide = () => {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))
    }
    const goToNextSlide = () => {
        if (currentSlideIndex == slides.length - 1) {
            onClose()
        } else {
            setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))
        }
    }
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                if (currentSlideIndex === slides.length - 1) {
                    onClose()
                } else {
                    setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))
                }
            } else if (e.key === 'ArrowLeft') {
                setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))
            } else if (e.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [slides.length, onClose])
    return (
        <>
            <div className="fixed h-screen w-screen overflow-y-scroll z-50 top-0 left-0"
            style={{
                backgroundColor:currentTheme.backgroundColor
            }}
            >
                    <div className='w-screen min-h-[100vh] flex items-center justify-center'>
                        <AnimatePresence mode='wait'>
                            <motion.div key={currentSlideIndex}
                                initial={{
                                    opacity: 0, scale: 0.7
                                }}
                                animate={{
                                    opacity: 1, scale: 1
                                }}
                                exit={{
                                    opacity: 0, scale: 1.2
                                }}
                                transition={{ duration: 0.5 }}
                                className={
                                    `h-full w-full pointer-events-none ${slides[currentSlideIndex].className}`
                                }
                                style={{
                                    backgroundColor: currentTheme.slideBackgroundColor,
                                    backgroundImage: currentTheme.gradientBackground,
                                    color: currentTheme.accentColor,
                                    fontFamily: currentTheme.fontFamily
                                }}
                            >
                                <MasterRecursiveComponent
                                    content={slides[currentSlideIndex].content}
                                    onContentChange={() => { }}
                                    slideId={slides[currentSlideIndex].id}
                                    isPreview={false}
                                    isEditable={false}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <Button className='fixed top-4 right-4' variant="ghost" size="icon" onClick={onClose}>
                        <X className='h-6 w-6' />
                    </Button>
                    <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4'>
                        <Button variant="ghost" size="icon" onClick={goToPreviousSlide} disabled={currentSlideIndex === 0}><ChevronLeft className='h-4 w-4' /></Button>
                        {!isLastSlide &&
                            (<Button variant="ghost" size="icon" onClick={goToNextSlide}><ChevronRight className='h-4 w-4' /></Button>)}
                    </div>
            </div>
        </>
    )
}
export default PresentationMode;