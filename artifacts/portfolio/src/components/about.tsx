import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import editorPhoto from "@assets/image_1781761484095.png";

function Counter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative bg-background border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden relative border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
              <img 
                src={editorPhoto} 
                alt="Video Editor" 
                className="w-full h-full object-cover object-center grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
            </div>
            
            {/* Floating Element */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-card border border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl z-20 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Currently</p>
                  <p className="text-white font-bold font-display">Taking New Clients</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4">About Me</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">
              I don't just edit videos. <br />
              <span className="text-muted-foreground">I build audiences.</span>
            </h3>
            
            <div className="space-y-6 text-lg text-muted-foreground/80 leading-relaxed mb-10">
              <p>
                What separates a good video from a viral one isn't just the transitions—it's the pacing, the storytelling, and the psychological hooks that keep viewers watching until the last second.
              </p>
              <p>
                With a deep understanding of algorithmic trends and audience behavior, I transform raw footage into highly engaging assets designed specifically to convert attention into engagement and revenue.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  <Counter end={3} suffix="+" />
                </p>
                <p className="text-sm font-medium text-muted-foreground">Years Exp.</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                  <Counter end={500} suffix="+" />
                </p>
                <p className="text-sm font-medium text-muted-foreground">Videos Edited</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  <Counter end={50} suffix="+" />
                </p>
                <p className="text-sm font-medium text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
