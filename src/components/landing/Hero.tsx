import { Button } from "@/components/ui/button";
import { Sparkles, Play, Star } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";
import aiAssistant from "@/assets/ai-assistant.png";
import floatingSlides from "@/assets/floating-slides.png";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#fffdfa] to-[#fff0f5] font-['Quicksand']">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[#f0e6ff]/50 blur-2xl" />
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-[#ffead6]/50 blur-3xl" />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-[#d9f2e6]/50 blur-2xl" />
      
      {/* Floating slides decoration - Using animate-bounce as a replacement for custom float */}
      <img 
        src={floatingSlides.src} 
        alt="" 
        className="absolute top-32 right-0 w-64 opacity-60 animate-bounce hidden lg:block"
        style={{ animationDuration: '6s' }}
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0e6ff]/50 border border-[#ebd9f2]/30 mb-8">
            <Sparkles className="w-4 h-4 text-[#ec5e8a]" />
            <span className="text-sm font-medium text-[#4d2d4d]">AI-Powered Presentations</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#f2a391] text-[#f2a391]" />
              ))}
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#4d2d4d]">
            Create Stunning Slides
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">in Seconds</span> ✨
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#806680] max-w-2xl mx-auto mb-10">
            Transform your ideas into beautiful presentations with the power of AI. 
            No design skills needed – just describe what you want!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href={'/dashboard'} className="flex gap-2 justify-center items-center bg-[#ec5e8a] hover:bg-[#e63971] text-white rounded-full px-8 py-6 h-auto text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Creating Free
            </Link>
            <Button className="bg-[#f0e6ff] hover:bg-[#ebd9f2] text-[#4d2d4d] rounded-full px-8 py-6 h-auto text-lg" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            {[
              { value: "10K+", label: "Happy Users" },
              { value: "500K+", label: "Slides Created" },
              { value: "4.9", label: "User Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">{stat.value}</div>
                <div className="text-sm text-[#806680]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero illustration */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_-10px_rgba(102,51,128,0.1)] border border-[#fce6ed]/50">
            <img 
              src={heroIllustration.src} 
              alt="SlideAI Preview" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Floating AI assistant */}
          <img 
            src={aiAssistant.src} 
            alt="AI Assistant" 
            className="absolute -left-8 md:-left-16 bottom-10 w-24 md:w-32 animate-bounce"
            style={{ animationDuration: '4s' }}
          />
          
          {/* Floating badge */}
          <div className="absolute -right-4 md:right-8 top-1/4 backdrop-blur-xl bg-white/80 border border-[#fce6ed] rounded-2xl p-4 shadow-lg animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#d9f2e6] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#4d2d4d]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#4d2d4d]">AI Generated</div>
                <div className="text-xs text-[#806680]">in 30 seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;