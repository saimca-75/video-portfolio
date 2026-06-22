import { motion } from "framer-motion";
import {
  Smartphone,
  MonitorPlay,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Short Form Editing",
    description:
      "High-retention Reels, TikToks, and Shorts. Fast-paced, engaging, and optimized for infinite scroll algorithms.",
    tags: ["TikTok", "Reels", "Shorts"],
    priceHint: "Starting at ₹ 1000/video",
  },
  {
    icon: MonitorPlay,
    title: "Long Form Editing",
    description:
      "Deep-dive YouTube videos, podcasts, and masterclasses. Structured pacing that builds authority and watch time.",
    tags: ["YouTube", "Podcasts", "Vlogs"],
    priceHint: "Starting at ₹ 2000 - ₹ 5000/video",
  },
  {
    icon: Sparkles,
    title: "Motion Graphics",
    description:
      "Custom titles, animated captions, lower thirds, and visual effects that elevate production value.",
    tags: ["VFX", "Captions", "Intros"],
    priceHint: "Custom Pricing",
  },
  {
    icon: ImageIcon,
    title: "Thumbnail Design",
    description:
      "High CTR custom thumbnails designed to grab attention in crowded feeds. Psychology-driven composition.",
    tags: ["High CTR", "Photoshop", "A/B Testing"],
    priceHint: "Starting at ₹ 500 - ₹ 2000/thumb",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4">
              Services
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
              Everything you need to{" "}
              <span className="text-primary">dominate</span> your niche.
            </h3>
            <p className="text-lg text-muted-foreground">
              End-to-end post-production services tailored for modern content
              platforms.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative bg-card border border-white/5 rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>

                <h4 className="text-2xl font-display font-bold text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-sm font-semibold text-white/70">
                    {service.priceHint}
                  </span>
                  <button className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Details{" "}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      &rarr;
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
