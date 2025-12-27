import { Presentation, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-[#fce6ed]/50 font-['Quicksand'] bg-[#fcfaf2]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ec5e8a] to-[#ebd9f2] flex items-center justify-center">
                <Presentation className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[#ec5e8a] to-[#a37ae6]">
                SlideAI
              </span>
            </div>
            <p className="text-[#806680] text-sm mb-6">
              Create beautiful presentations in seconds with the power of AI.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#f7f3f0] flex items-center justify-center text-[#4d2d4d] hover:bg-[#ec5e8a] hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["Features", "Templates", "Pricing", "Examples"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Contact"],
            },
            {
              title: "Resources",
              links: ["Help Center", "Tutorials", "API Docs", "Status"],
            },
          ].map((section, i) => (
            <div key={i}>
              <h4 className="font-bold mb-4 text-[#4d2d4d]">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="text-[#806680] hover:text-[#4d2d4d] transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[#fce6ed]/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#806680]">
            © 2024 SlideAI. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[#806680]">
            <a href="#" className="hover:text-[#4d2d4d] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#4d2d4d] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#4d2d4d] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;