import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function FloatingElements() {
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile CTA after scrolling down a bit, hide near bottom
      const scrollY = window.scrollY;
      const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 800;
      
      if (scrollY > 300 && !isNearBottom) {
        setShowMobileCta(true);
      } else {
        setShowMobileCta(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* WhatsApp FAB - Desktop & Mobile */}
      <a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform shadow-green-500/20 group"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-background border border-white/10 px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
          Chat with me
        </span>
      </a>

      {/* Mobile Sticky CTA */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-white/10 z-40 transition-transform duration-300 ${
          showMobileCta ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Button 
          onClick={handleScrollToContact}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl text-base shadow-lg shadow-primary/20"
        >
          Book a Call Now
        </Button>
      </div>
    </>
  );
}
