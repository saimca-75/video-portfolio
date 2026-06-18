import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Send Raw Footage",
    desc: "Upload your raw files to a secure shared drive and provide any specific notes, scripts, or examples.",
  },
  {
    num: "02",
    title: "Editing & Review",
    desc: "I craft the first cut—adding pacing, graphics, and sound design. You review it via a time-stamped feedback link.",
  },
  {
    num: "03",
    title: "Final Delivery",
    desc: "After revisions, you receive the polished, high-resolution final files ready for upload.",
  },
  {
    num: "04",
    title: "Growth & Optimization",
    desc: "We review the performance data and optimize future videos based on audience retention graphs.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 relative bg-background border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4">The Process</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white">
              Seamless from <span className="text-primary">start to finish.</span>
            </h3>
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pt-8 md:pt-0"
              >
                {/* Mobile line */}
                <div className="md:hidden absolute top-0 bottom-0 left-6 w-[2px] bg-white/10 z-0" />

                <div className="bg-card border border-white/10 p-6 rounded-3xl relative z-10 group hover:border-primary/50 transition-colors h-full">
                  <div className="w-14 h-14 bg-background border border-primary/30 rounded-2xl flex items-center justify-center text-primary font-display font-black text-xl mb-6 shadow-[0_0_15px_rgba(139,92,246,0.2)] md:absolute md:-top-7 md:left-1/2 md:-translate-x-1/2 relative group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {step.num}
                  </div>
                  <div className="md:mt-8">
                    <h4 className="text-xl font-bold text-white mb-3 md:text-center">{step.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed md:text-center">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
