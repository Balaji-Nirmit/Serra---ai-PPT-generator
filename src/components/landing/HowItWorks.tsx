import { MessageSquare, Wand2, Download, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Describe Your Idea",
    description: "Tell our AI what your presentation is about. Be as detailed as you like!",
    color: "bg-[#ffead6]",
  },
  {
    number: "02",
    icon: Wand2,
    title: "AI Creates Magic",
    description: "Watch as our AI generates beautiful slides with content and design.",
    color: "bg-[#f0e6ff]",
  },
  {
    number: "03",
    icon: Download,
    title: "Customize & Export",
    description: "Fine-tune your slides and export in your preferred format.",
    color: "bg-[#d9f2e6]",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden font-['Quicksand'] bg-[#fcfaf2]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#f0e6ff]/50 text-[#4d2d4d] text-sm font-medium mb-4">
            🎯 How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#4d2d4d]">
            Three Simple Steps to
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">Perfect Presentations</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ec5e8a] via-[#ebd9f2] to-[#d9f2e6] hidden md:block" />
            
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step card */}
                <div className="flex-1 backdrop-blur-xl bg-white/80 border border-[#fce6ed] shadow-[0_8px_30px_-10px_rgba(102,51,128,0.1)] rounded-3xl p-6 hover:shadow-[0_0_40px_rgba(236,94,138,0.2)] transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center shrink-0`}>
                      <step.icon className="w-7 h-7 text-[#4d2d4d]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#ec5e8a] mb-1">Step {step.number}</div>
                      <h3 className="text-xl font-bold mb-2 text-[#4d2d4d]">{step.title}</h3>
                      <p className="text-[#806680]">{step.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Center dot */}
                <div className="hidden md:flex w-16 items-start justify-center pt-6">
                  <div className="w-4 h-4 rounded-full bg-[#ec5e8a] shadow-[0_0_20px_rgba(236,94,138,0.4)]" />
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 text-center">
          <p className="text-[#806680] mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {["Google", "Microsoft", "Apple", "Meta", "Amazon"].map((company) => (
              <div key={company} className="text-xl md:text-2xl font-bold text-[#806680]">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;