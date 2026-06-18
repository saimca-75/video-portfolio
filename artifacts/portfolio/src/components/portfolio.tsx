import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

const categories = ["All", "Short Form", "Long Form", "Commercial"];

const portfolioItems = [
  {
    id: 1,
    title: "Tech Review Masterclass",
    client: "Marques Tech",
    category: "Long Form",
    results: "1.2M Views • 15% CTR",
    image: "/images/portfolio-2.png",
  },
  {
    id: 2,
    title: "Fitness Transformation",
    client: "Iron Coaching",
    category: "Short Form",
    results: "3M+ Views • Viral Hit",
    image: "/images/portfolio-1.png",
  },
  {
    id: 3,
    title: "Founder Podcast Ep. 42",
    client: "StartUp Diaries",
    category: "Long Form",
    results: "500K Views • High Retention",
    image: "/images/portfolio-3.png",
  },
  {
    id: 4,
    title: "Lifestyle Vlog Shorts",
    client: "Emma Travels",
    category: "Short Form",
    results: "2.1M Views • +50K Subs",
    image: "/images/portfolio-4.png",
  },
  {
    id: 5,
    title: "Luxury Sports Car Ad",
    client: "Apex Motors",
    category: "Commercial",
    results: "400% ROAS on Campaign",
    image: "/images/portfolio-5.png",
  },
  {
    id: 6,
    title: "Cyberpunk City Guide",
    client: "Nomad Life",
    category: "Long Form",
    results: "800K Views • Trending",
    image: "/images/portfolio-6.png",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = portfolioItems.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );

  return (
    <section id="portfolio" className="py-24 relative bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4">Selected Work</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white">
              Proof is in the <span className="text-primary">playback.</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category
                    ? "bg-primary text-white"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-card cursor-pointer aspect-video md:aspect-[4/3]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                  <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-white">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-primary font-semibold text-sm mb-1">{item.results}</p>
                    <h4 className="text-xl font-display font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-gray-300 text-sm">{item.client} • {item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
