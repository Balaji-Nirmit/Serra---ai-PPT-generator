import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out SlideAI",
    features: [
      "5 presentations per month",
      "Basic templates",
      "Export as PDF",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For professionals who need more",
    features: [
      "Unlimited presentations",
      "Premium templates",
      "Export PPTX & PDF",
      "Custom branding",
      "Priority support",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Admin dashboard",
      "Analytics & insights",
      "SSO integration",
      "Dedicated support",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden font-['Quicksand'] bg-[#fcfaf2]">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-[#ffead6]/20 blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-[#f0e6ff]/20 blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-[#ebd9f2]/50 text-[#4d2d4d] text-sm font-medium mb-4">
            💎 Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#4d2d4d]">
            Simple, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">Transparent</span> Pricing
          </h2>
          <p className="text-[#806680] text-lg">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative backdrop-blur-xl bg-white/80 border border-[#fce6ed] rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? "border-[#ec5e8a] border-2 shadow-[0_0_40px_rgba(236,94,138,0.2)]" 
                  : "shadow-[0_8px_30px_-10px_rgba(102,51,128,0.1)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ec5e8a] to-[#ebd9f2] text-white text-sm font-semibold whitespace-nowrap">
                  Most Popular ✨
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2 text-[#4d2d4d]">{plan.name}</h3>
              <p className="text-[#806680] text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#4d2d4d]">{plan.price}</span>
                {plan.period && (
                  <span className="text-[#806680]">{plan.period}</span>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#d9f2e6] flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#4d2d4d]" />
                    </div>
                    <span className="text-sm text-[#4d2d4d]">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full rounded-full ${
                  plan.popular 
                    ? "bg-[#ec5e8a] hover:bg-[#e63971] text-white" 
                    : "bg-transparent border-[#fce6ed] text-[#4d2d4d] hover:bg-[#f7f3f0]"
                }`}
                size="lg"
              >
                {plan.popular && <Sparkles className="w-4 h-4 mr-2" />}
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;