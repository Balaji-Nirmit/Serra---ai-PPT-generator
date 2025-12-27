'use client'
import { useState, useEffect } from "react";
import { Sparkles, Presentation, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#how-it-works", label: "How it Works" },
  { href: "#pricing", label: "Pricing" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-['Quicksand'] ${
      isScrolled 
        ? "backdrop-blur-lg bg-white/90 border-b border-[#fce6ed]/50 shadow-[0_4px_20px_-5px_rgba(236,94,138,0.15)]" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a 
          href="#" 
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ec5e8a] to-[#ebd9f2] flex items-center justify-center">
            <Presentation className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">SlideAI</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`relative font-medium transition-colors py-1 ${
                activeSection === link.href.substring(1)
                  ? "text-[#ec5e8a]"
                  : "text-[#806680] hover:text-[#4d2d4d]"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#ec5e8a] rounded-full transition-all duration-300 ${
                  activeSection === link.href.substring(1) ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-[#4d2d4d] hover:bg-[#f7f3f0]">
            Log in
          </Button>
          <Button size="sm" className="bg-[#ec5e8a] hover:bg-[#e63971] text-white rounded-full gap-1">
            <Sparkles className="w-4 h-4" />
            Get Started
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-[#4d2d4d]">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-white/95 backdrop-blur-xl border-l border-[#fce6ed]/50 p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#fce6ed]/50">
                <a 
                  href="#" 
                  onClick={scrollToTop}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ec5e8a] to-[#ebd9f2] flex items-center justify-center">
                    <Presentation className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ec5e8a] to-[#a37ae6]">SlideAI</span>
                </a>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-[#4d2d4d]">
                    <X className="w-4 h-4" />
                  </Button>
                </SheetClose>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6 px-4">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        activeSection === link.href.substring(1)
                          ? "bg-[#ec5e8a]/10 text-[#ec5e8a]"
                          : "text-[#806680] hover:bg-[#f7f3f0]/50 hover:text-[#4d2d4d]"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="p-4 border-t border-[#fce6ed]/50 space-y-3">
                <Button variant="ghost" className="w-full justify-center text-[#4d2d4d]">
                  Log in
                </Button>
                <Button className="w-full bg-[#ec5e8a] hover:bg-[#e63971] text-white rounded-full justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;