import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Services from "@/components/services";
import Portfolio from "@/components/portfolio";
import Results from "@/components/results";
import Testimonials from "@/components/testimonials";
import WhyChooseMe from "@/components/why-choose-me";
import Process from "@/components/process";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import FloatingElements from "@/components/floating-elements";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Results />
        <Testimonials />
        <WhyChooseMe />
        <Process />
        <Contact />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}
