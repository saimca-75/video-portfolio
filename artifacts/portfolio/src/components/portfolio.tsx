import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, VolumeX } from "lucide-react";

const categories = ["All", "Short Form", "Long Form", "Commercial"];

type PortfolioItem = {
  id: number;
  title: string;
  client: string;
  category: string;
  results: string;
  image?: string;
  video?: string;
  tag?: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Instagram Reel",
    client: "Real Client Work",
    category: "Short Form",
    results: "Viral Instagram Reel",
    video: "/videos/chanti-reel-new.mp4",
    tag: "Reel",
  },
  {
    id: 2,
    title: "Before & After",
    client: "Real Client Work",
    category: "Short Form",
    results: "Cinematic B&A Edit",
    video: "/videos/chanti-ba2.mp4",
    tag: "Before & After",
  },
  {
    id: 3,
    title: "Chanti Cover Song",
    client: "Real Client Work",
    category: "Long Form",
    results: "Full Length Edit",
    video: "https://nkb-backend-ccbp-media-static.s3-ap-south-1.amazonaws.com/ccbp_gamma/media/content_loading/uploads/0b4e3479-de6b-4381-9e19-70e96f5d5605_chanti%20cover%20song%20(long%20video).mp4",
    tag: "Long Form",
  },
];

function VideoCard({ item, onClick }: { item: PortfolioItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleMouseEnter() {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }

  function handleMouseLeave() {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-purple-500/30 bg-card cursor-pointer aspect-video md:aspect-[4/3]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-testid={`card-portfolio-${item.id}`}
    >
      {item.tag && (
        <div className="absolute top-3 left-3 z-20 bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {item.tag}
        </div>
      )}
      <div className="absolute top-3 right-3 z-20 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
        Real Work
      </div>

      <video
        ref={videoRef}
        src={item.video}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
        <div className="w-16 h-16 rounded-full bg-purple-600/90 backdrop-blur-sm flex items-center justify-center text-white shadow-lg shadow-purple-900/50">
          <Play className="w-6 h-6 ml-1" />
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-purple-400 font-semibold text-sm mb-1">{item.results}</p>
          <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
          <p className="text-gray-300 text-sm">{item.client} · {item.category}</p>
        </div>
      </div>
    </div>
  );
}

function ImageCard({ item }: { item: PortfolioItem }) {
  return (
    <div
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-card cursor-pointer aspect-video md:aspect-[4/3]"
      data-testid={`card-portfolio-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
        <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-white">
          <Play className="w-6 h-6 ml-1" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-primary font-semibold text-sm mb-1">{item.results}</p>
          <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
          <p className="text-gray-300 text-sm">{item.client} · {item.category}</p>
        </div>
      </div>
    </div>
  );
}

function VideoModal({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function toggleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      data-testid="modal-video"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-[#0a0a0f] border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={item.video}
          className="w-full aspect-video"
          autoPlay
          loop
          playsInline
          controls={false}
        />

        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            data-testid="button-toggle-mute"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            data-testid="button-close-modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <p className="text-purple-400 font-semibold text-sm mb-1">{item.results}</p>
          <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
          <p className="text-gray-400 text-sm">{item.client} · {item.category}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All");
  const [modalItem, setModalItem] = useState<PortfolioItem | null>(null);

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
                data-testid={`button-filter-${category}`}
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
              >
                {item.video ? (
                  <VideoCard item={item} onClick={() => setModalItem(item)} />
                ) : (
                  <ImageCard item={item} />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {modalItem && (
          <VideoModal item={modalItem} onClose={() => setModalItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
