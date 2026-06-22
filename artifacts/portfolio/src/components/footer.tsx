import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center font-display font-bold text-lg text-white">
              C
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              STUDIO
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#portfolio" className="hover:text-white transition-colors">
              Portfolio
            </a>
            <a
              href="#testimonials"
              className="hover:text-white transition-colors"
            >
              Testimonials
            </a>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              href="#"
              className="hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-primary"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/chanti_editor_21?igsh=cDFja3MzOW1hbG9m"
              className="hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-primary"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@chanti_editor_21"
              className="hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-primary"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-primary"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Chanti Studio. All rights reserved.</p>
          <p>Crafted for Conversion.</p>
        </div>
      </div>
    </footer>
  );
}
