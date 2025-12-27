import { Zap, Palette, Wand2, Layout, Download, Users } from "lucide-react";
import lightningCute from "@/assets/lightning-cute.png";
import designCute from "@/assets/design-cute.png";
import magicWand from "@/assets/magic-wand.png";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate complete presentations in under 60 seconds. Just describe your topic!",
    // HSL 20 100% 90%
    color: "bg-[#ffead6]",
    image: lightningCute,
  },
  {
    icon: Palette,
    title: "Beautiful Designs",
    description: "Access hundreds of professionally crafted templates and themes.",
    // HSL 270 60% 90%
    color: "bg-[#f0e6ff]",
    image: designCute,
  },
  {
    icon: Wand2,
    title: "AI Magic",
    description: "Smart content suggestions, auto-formatting, and intelligent layouts.",
    // HSL 160 50% 88%
    color: "bg-[#d9f2e6]",
    image: magicWand,
  },
  {
    icon: Layout,
    title: "Custom Layouts",
    description: "Drag and drop elements. Full control over every slide.",
    // HSL 280 40% 85%
    color: "bg-[#ebd9f2]",
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description: "Download as PPTX, PDF, or share with a link instantly.",
    color: "bg-[#ffead6]",
  },
  {
    icon: Users,
    title: "Team Collab",
    description: "Work together in real-time with your team members.",
    color: "bg-[#f0e6ff]",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-[#fcfaf2] relative overflow-hidden font-['Quicksand']">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#f0e6ff]/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#ffead6]/20 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#d9f2e6]/50 text-[#4d2d4d] text-sm font-medium mb-4">
            ✨ Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#4d2d4d]">
            Everything You Need to
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">
              Create Amazing Slides
            </span>
          </h2>
          <p className="text-[#806680] text-lg">
            Powerful features wrapped in a delightful experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-xl bg-white/80 border border-[#fce6ed] shadow-[0_8px_30px_-10px_rgba(102,51,128,0.1)] rounded-3xl p-6 hover:shadow-[0_0_40px_rgba(236,94,138,0.2)] transition-all duration-300 hover:-translate-y-2"
            >
              {feature.image && (
                <img
                  src={feature.image.src} // Access the .src property here
                  alt=""
                  className="absolute -top-8 -right-4 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce"
                />
              )}

              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7 text-[#4d2d4d]" />
              </div>

              <h3 className="text-xl font-bold mb-2 text-[#4d2d4d]">{feature.title}</h3>
              <p className="text-[#806680]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;