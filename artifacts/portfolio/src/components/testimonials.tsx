import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Fitness YouTuber",
    text: "Before working together, my retention rate hovered around 30%. In just two months, we hit 55% average retention and my channel exploded. The pacing is unmatched.",
    avatar: "/images/avatar-1.png",
  },
  {
    name: "Sarah Jenkins",
    role: "Startup Founder",
    text: "I needed a commercial ad that felt premium but performed on TikTok. The final delivery was cinematic, engaging, and brought our CPA down by 40%.",
    avatar: "/images/avatar-2.png",
  },
  {
    name: "Marcus Thorne",
    role: "Performance Coach",
    text: "Best editor I've ever worked with. The attention to detail in sound design and motion graphics takes standard talking-head videos and turns them into masterclasses.",
    avatar: "/images/avatar-3.png",
  },
  {
    name: "Elena Rostova",
    role: "Lifestyle Influencer",
    text: "My Reels went from struggling to get 10K views to consistently hitting 500K+. The editing style perfectly matches my brand while maintaining algorithmic hooks.",
    avatar: "/images/avatar-4.png",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative bg-background border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4">Client Success</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Don't just take my word for it.
            </h3>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((t, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2">
                  <div className="bg-card border border-white/5 p-8 rounded-3xl h-full flex flex-col hover:border-primary/30 transition-colors">
                    <div className="flex text-primary mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg text-white/90 leading-relaxed mb-8 flex-1 font-medium">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                      />
                      <div>
                        <h5 className="text-white font-bold font-display">{t.name}</h5>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-10">
              <CarouselPrevious className="position-static transform-none static w-12 h-12 bg-white/5 hover:bg-primary border-white/10 hover:text-white" />
              <CarouselNext className="position-static transform-none static w-12 h-12 bg-white/5 hover:bg-primary border-white/10 hover:text-white" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
