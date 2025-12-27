import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    avatar: "SC",
    content: "SlideAI saved me hours of work! I created a stunning investor deck in just 5 minutes. The AI really understands what looks good.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Startup Founder",
    avatar: "JW",
    content: "Game changer for my pitch decks. The templates are gorgeous and the AI suggestions are surprisingly accurate.",
    rating: 5,
  },
  {
    name: "Emily Park",
    role: "Teacher",
    avatar: "EP",
    content: "My students love the presentations I make now! It's so easy and fun to use. Highly recommend for educators!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#fcfaf2] relative overflow-hidden font-['Quicksand']">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#d9f2e6]/30 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#f0e6ff]/30 blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#ffead6]/50 text-[#4d2d4d] text-sm font-medium mb-4">
            💬 Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#4d2d4d]">
            Loved by <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">Thousands</span>
          </h2>
          <p className="text-[#806680] text-lg">
            See what our happy users have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/80 border border-[#fce6ed] shadow-[0_8px_30px_-10px_rgba(102,51,128,0.1)] rounded-3xl p-6 hover:shadow-[0_0_40px_rgba(236,94,138,0.2)] transition-all duration-300 hover:-translate-y-2"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f2a391] text-[#f2a391]" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-[#4d2d4d] mb-6 leading-relaxed italic">"{testimonial.content}"</p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ec5e8a] to-[#ebd9f2] flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[#4d2d4d]">{testimonial.name}</div>
                  <div className="text-sm text-[#806680]">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;