import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-[#fcfaf2] relative overflow-hidden font-['Quicksand']">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0e6ff]/30 via-transparent to-[#ffead6]/30" />
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#d9f2e6]/50 blur-2xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#ebd9f2]/50 blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center backdrop-blur-xl bg-white/80 border border-[#fce6ed] shadow-[0_8px_30px_-10px_rgba(102,51,128,0.1)] rounded-3xl p-12 md:p-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#ffead6]/50 text-sm font-medium mb-6">
            🚀 Ready to Start?
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-[#4d2d4d]">
            Create Your First 
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">
              Presentation Today
            </span>
          </h2>
          
          <p className="text-lg text-[#806680] mb-8 max-w-xl mx-auto">
            Join thousands of happy users and start creating stunning presentations in seconds. 
            No credit card required!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-[#ec5e8a] hover:bg-[#e63971] text-white rounded-full px-8 py-6" size="lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="ghost" size="lg" className="group rounded-full hover:bg-[#f0e6ff]">
              See Examples
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;