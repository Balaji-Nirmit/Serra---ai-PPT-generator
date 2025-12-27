'use client'
import { useState } from "react";
import { Sparkles, Wand2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockSlides = [
  {
    title: "Introduction",
    content: "Welcome to your presentation",
    // Converted to hex: primary (#ec5e8a) to soft-purple (#ebd9f2)
    color: "from-[#ec5e8a] to-[#ebd9f2]",
  },
  {
    title: "Key Points",
    content: "• Main insight one\n• Important detail two\n• Critical finding three",
    // Converted to hex: coral (#f2a391) to peach (#ffead6)
    color: "from-[#f2a391] to-[#ffead6]",
  },
  {
    title: "Data & Insights",
    content: "Visual representation of your key metrics",
    hasChart: true,
    // Converted to hex: mint (#d9f2e6) to accent (#b3f0e1)
    color: "from-[#d9f2e6] to-[#b3f0e1]",
  },
  {
    title: "Conclusion",
    content: "Summary and call to action",
    color: "from-[#ebd9f2] to-[#ec5e8a]",
  },
];

const DemoSection = () => {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [slides, setSlides] = useState<typeof mockSlides | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const generateSlides = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setSlides(null);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const customSlides = mockSlides.map((slide, index) => ({
      ...slide,
      title: index === 0 ? topic : slide.title,
      content: index === 0 ? `An AI-powered presentation about ${topic}` : slide.content,
    }));
    setSlides(customSlides);
    setCurrentSlide(0);
    setIsGenerating(false);
  };

  const nextSlide = () => slides && setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => slides && setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="demo" className="py-24 relative overflow-hidden font-['Quicksand'] bg-[#fcfaf2]">
    
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-64 h-64 rounded-full bg-[#ffead6]/30 blur-3xl" />
      <div className="absolute bottom-20 right-0 w-72 h-72 rounded-full bg-[#ebd9f2]/30 blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-[#d9f2e6]/50 text-[#4d2d4d] text-sm font-medium mb-4">
            🎨 Try It Now
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#4d2d4d]">
            See the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">Magic</span> in Action
          </h2>
          <p className="text-[#806680] text-lg">
            Enter any topic and watch AI create beautiful slides instantly
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Input area */}
          <div className="backdrop-blur-xl bg-white/80 border border-[#fce6ed] shadow-[0_8px_30px_-10px_rgba(102,51,128,0.1)] rounded-3xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateSlides()}
                  placeholder="Enter your presentation topic..."
                  className="w-full h-14 px-6 rounded-2xl bg-[#f7f3f0] border-2 border-[#fce6ed] focus:border-[#ec5e8a] focus:outline-none transition-colors text-[#4d2d4d] placeholder:text-[#806680]"
                />
                <Wand2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#806680]" />
              </div>
              <Button
                onClick={generateSlides}
                disabled={isGenerating || !topic.trim()}
                className="min-w-[160px] bg-[#ec5e8a] hover:bg-[#e63971] text-white rounded-xl h-14"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-[#806680]">Try:</span>
              {["Startup Pitch", "Quarterly Report", "Product Launch", "Team Meeting"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setTopic(suggestion)}
                  className="px-3 py-1 rounded-full bg-[#ebd9f2]/50 text-[#4d2d4d] text-sm font-medium hover:bg-[#ebd9f2] transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Slide preview area */}
          <div className="backdrop-blur-xl bg-white/80 border border-[#fce6ed] shadow-[0_8px_30px_-10px_rgba(102,51,128,0.1)] rounded-3xl p-6 md:p-8 min-h-[400px] flex items-center justify-center">
            {!slides && !isGenerating && (
              <div className="text-center text-[#806680]">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[#f7f3f0] flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#ec5e8a]" />
                </div>
                <p>Your slides will appear here</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-[#ec5e8a]/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full border-4 border-[#ebd9f2]/30 animate-ping" style={{ animationDelay: '0.2s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wand2 className="w-8 h-8 text-[#ec5e8a] animate-pulse" />
                  </div>
                </div>
                <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">AI is creating your slides...</p>
              </div>
            )}

            {slides && !isGenerating && (
              <div className="w-full">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} opacity-90`} />
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center text-white">
                    <h3 className="text-2xl md:text-4xl font-bold mb-4">{slides[currentSlide].title}</h3>
                    {slides[currentSlide].hasChart ? (
                      <div className="flex items-end justify-center gap-3 h-32">
                        {[60, 80, 45, 90, 70].map((height, i) => (
                          <div
                            key={i}
                            className="w-8 md:w-12 bg-white/80 rounded-t-lg"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-lg md:text-xl opacity-90 whitespace-pre-line">{slides[currentSlide].content}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full border-[#fce6ed]">
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 rounded-full transition-all ${index === currentSlide ? "bg-[#ec5e8a] w-6" : "bg-[#f7f3f0] w-3"}`}
                      />
                    ))}
                  </div>
                  <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full border-[#fce6ed]">
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;