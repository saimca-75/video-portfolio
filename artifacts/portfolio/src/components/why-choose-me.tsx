import { motion } from "framer-motion";
import { Zap, Infinity, PencilRuler, LineChart, Target } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Delivery",
    desc: "48-72 hour turnarounds for most projects without sacrificing quality.",
  },
  {
    icon: Infinity,
    title: "Unlimited Revisions",
    desc: "We work until it's perfect. No hidden fees for minor adjustments.",
  },
  {
    icon: PencilRuler,
    title: "Creative Storytelling",
    desc: "Every cut serves a purpose. I edit for narrative, not just flash.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Editing",
    desc: "Pacing modeled after high-performing viral videos in your specific niche.",
  },
  {
    icon: Target,
    title: "Platform Optimization",
    desc: "Exported with the exact specs, safe zones, and formats for each platform.",
  },
];

export default function WhyChooseMe() {
  return (
    <section className="py-24 relative bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4">Why Me</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white">
              An editor who understands <span className="text-primary">marketing.</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background border border-white/5 p-8 rounded-3xl hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
